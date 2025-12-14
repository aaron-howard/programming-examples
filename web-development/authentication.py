"""
Authentication - Python

Authentication flows and patterns:
- OAuth 2.0
- JWT (JSON Web Tokens)
- Session-based authentication
"""

import base64
import json
import hmac
import hashlib
import secrets
from typing import Dict, Optional
from datetime import datetime, timedelta
from urllib.parse import urlencode


# JWT Implementation (simplified)
class JWT:
    @staticmethod
    def encode(payload: Dict, secret: str) -> str:
        header = {'alg': 'HS256', 'typ': 'JWT'}
        encoded_header = (
            base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
        )
        encoded_payload = (
            base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
        )

        signature_input = f'{encoded_header}.{encoded_payload}'
        signature = hmac.new(
            secret.encode(), signature_input.encode(), hashlib.sha256
        ).digest()
        encoded_signature = base64.urlsafe_b64encode(signature).decode().rstrip('=')

        return f'{encoded_header}.{encoded_payload}.{encoded_signature}'

    @staticmethod
    def decode(token: str, secret: str) -> Dict:
        parts = token.split('.')
        if len(parts) != 3:
            raise ValueError('Invalid token')

        header, payload, signature = parts
        signature_input = f'{header}.{payload}'

        expected_signature = (
            base64.urlsafe_b64encode(
                hmac.new(
                    secret.encode(), signature_input.encode(), hashlib.sha256
                ).digest()
            )
            .decode()
            .rstrip('=')
        )

        if signature != expected_signature:
            raise ValueError('Invalid signature')

        # Add padding if needed
        payload += '=' * (4 - len(payload) % 4)
        return json.loads(base64.urlsafe_b64decode(payload))


# OAuth 2.0 Flow
class OAuth2Provider:
    def __init__(self, client_id: str, client_secret: str, redirect_uri: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri
        self.authorization_codes: Dict[str, Dict] = {}
        self.access_tokens: Dict[str, Dict] = {}
        self.refresh_tokens: Dict[str, Dict] = {}

    # Step 1: Authorization Request
    def get_authorization_url(self, state: str) -> str:
        params = {
            'client_id': self.client_id,
            'redirect_uri': self.redirect_uri,
            'response_type': 'code',
            'scope': 'read write',
            'state': state,
        }
        return f'https://oauth.example.com/authorize?{urlencode(params)}'

    # Step 2: Exchange code for token
    def exchange_code_for_token(self, code: str) -> Dict:
        auth_code = self.authorization_codes.get(code)
        if not auth_code or auth_code['expires'] < datetime.now().timestamp():
            raise ValueError('Invalid or expired authorization code')

        access_token = self.generate_access_token(auth_code['user_id'])
        del self.authorization_codes[code]
        return {
            'access_token': access_token,
            'token_type': 'Bearer',
            'expires_in': 3600,
            'refresh_token': self.generate_refresh_token(auth_code['user_id']),
        }

    def generate_access_token(self, user_id: int) -> str:
        token = f'access_{secrets.token_urlsafe(32)}'
        self.access_tokens[token] = {
            'user_id': user_id,
            'expires': datetime.now().timestamp() + 3600,
        }
        return token

    def generate_refresh_token(self, user_id: int) -> str:
        token = f'refresh_{secrets.token_urlsafe(48)}'
        self.refresh_tokens[token] = {
            'user_id': user_id,
            'expires': datetime.now().timestamp() + 30 * 24 * 3600,
        }
        return token

    def validate_token(self, token: str) -> Dict:
        token_data = self.access_tokens.get(token)
        if not token_data or token_data['expires'] < datetime.now().timestamp():
            raise ValueError('Invalid or expired token')
        return token_data


# Session-based Authentication
class SessionManager:
    def __init__(self):
        self.sessions: Dict[str, Dict] = {}

    def create_session(self, user_id: int) -> str:
        session_id = f'session_{int(datetime.now().timestamp())}_{user_id}'
        self.sessions[session_id] = {
            'user_id': user_id,
            'created_at': datetime.now(),
            'expires_at': datetime.now() + timedelta(minutes=30),
        }
        return session_id

    def get_session(self, session_id: str) -> Optional[Dict]:
        session = self.sessions.get(session_id)
        if not session or session['expires_at'] < datetime.now():
            return None
        return session

    def destroy_session(self, session_id: str):
        self.sessions.pop(session_id, None)


# Authentication Service
class AuthService:
    def __init__(self):
        self.users = [
            {
                'id': 1,
                'username': 'john',
                'password': 'password123',
                'email': 'john@example.com',
            },
            {
                'id': 2,
                'username': 'jane',
                'password': 'password456',
                'email': 'jane@example.com',
            },
        ]
        self.jwt_secret = 'my-secret-key'
        self.session_manager = SessionManager()

    def login(self, username: str, password: str) -> Dict:
        user = next(
            (
                u
                for u in self.users
                if u['username'] == username and u['password'] == password
            ),
            None,
        )
        if not user:
            raise ValueError('Invalid credentials')

        # JWT approach
        jwt_token = JWT.encode(
            {'user_id': user['id'], 'username': user['username']}, self.jwt_secret
        )

        # Session approach
        session_id = self.session_manager.create_session(user['id'])

        return {
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
            },
            'jwt': jwt_token,
            'session_id': session_id,
        }

    def verify_jwt(self, token: str) -> Dict:
        try:
            return JWT.decode(token, self.jwt_secret)
        except Exception as e:
            raise ValueError('Invalid token') from e

    def verify_session(self, session_id: str) -> Dict:
        session = self.session_manager.get_session(session_id)
        if not session:
            raise ValueError('Invalid or expired session')
        return session


# Example usage
if __name__ == '__main__':
    print('=== Authentication ===\n')

    auth_service = AuthService()

    # Login
    print('Login:')
    login_result = auth_service.login('john', 'password123')
    print('User:', login_result['user'])
    print('JWT Token:', login_result['jwt'][:50] + '...')
    print('Session ID:', login_result['session_id'])

    # Verify JWT
    print('\nVerify JWT:')
    jwt_payload = auth_service.verify_jwt(login_result['jwt'])
    print('JWT Payload:', jwt_payload)

    # Verify Session
    print('\nVerify Session:')
    session = auth_service.verify_session(login_result['session_id'])
    print('Session:', session)

    # OAuth 2.0
    print('\nOAuth 2.0:')
    oauth = OAuth2Provider('client123', 'secret456', 'http://localhost/callback')
    print('Authorization URL:', oauth.get_authorization_url('state123'))
