/**
 * Authentication - JavaScript
 *
 * Authentication flows and patterns:
 * - OAuth 2.0
 * - JWT (JSON Web Tokens)
 * - Session-based authentication
 */

const crypto = require('crypto');

// JWT Implementation (simplified)
class JWT {
    static encode(payload, secret) {
        const header = { alg: 'HS256', typ: 'JWT' };
        const encodedHeader = btoa(JSON.stringify(header));
        const encodedPayload = btoa(JSON.stringify(payload));
        const signature = this.sign(`${encodedHeader}.${encodedPayload}`, secret);
        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }

    static decode(token, secret) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token');
        }

        const [header, payload, signature] = parts;
        const expectedSignature = this.sign(`${header}.${payload}`, secret);

        if (signature !== expectedSignature) {
            throw new Error('Invalid signature');
        }

        return JSON.parse(atob(payload));
    }

    static sign(data, secret) {
        // Simplified signing - in production, use proper HMAC
        return btoa(data + secret).slice(0, 43);
    }
}

// OAuth 2.0 Flow
class OAuth2Provider {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.authorizationCodes = new Map();
        this.accessTokens = new Map();
        this.refreshTokens = new Map();
    }

    // Step 1: Authorization Request
    getAuthorizationUrl(state) {
        const params = new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: 'read write',
            state: state,
        });
        return `https://oauth.example.com/authorize?${params}`;
    }

    // Step 2: Exchange code for token
    exchangeCodeForToken(code) {
        const authCode = this.authorizationCodes.get(code);
        if (!authCode || authCode.expires < Date.now()) {
            throw new Error('Invalid or expired authorization code');
        }

        const accessToken = this.generateAccessToken(authCode.userId);
        this.authorizationCodes.delete(code);
        return {
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: 3600,
            refresh_token: this.generateRefreshToken(authCode.userId),
        };
    }

    generateAccessToken(userId) {
        const token = `access_${crypto.randomBytes(32).toString('base64url')}`;
        this.accessTokens.set(token, {
            userId,
            expires: Date.now() + 3600000,
        });
        return token;
    }

    generateRefreshToken(userId) {
        const token = `refresh_${crypto.randomBytes(48).toString('base64url')}`;
        this.refreshTokens.set(token, {
            userId,
            expires: Date.now() + 30 * 24 * 3600000,
        });
        return token;
    }

    validateToken(token) {
        const tokenData = this.accessTokens.get(token);
        if (!tokenData || tokenData.expires < Date.now()) {
            throw new Error('Invalid or expired token');
        }
        return tokenData;
    }
}

// Session-based Authentication
class SessionManager {
    constructor() {
        this.sessions = new Map();
    }

    createSession(userId) {
        const sessionId = `session_${Date.now()}_${userId}`;
        this.sessions.set(sessionId, {
            userId,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 1800000), // 30 minutes
        });
        return sessionId;
    }

    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session || session.expiresAt < new Date()) {
            return null;
        }
        return session;
    }

    destroySession(sessionId) {
        this.sessions.delete(sessionId);
    }
}

// Authentication Service
class AuthService {
    constructor() {
        this.users = [
            { id: 1, username: 'john', password: 'password123', email: 'john@example.com' },
            { id: 2, username: 'jane', password: 'password456', email: 'jane@example.com' },
        ];
        this.jwtSecret = 'my-secret-key';
        this.sessionManager = new SessionManager();
    }

    login(username, password) {
        const user = this.users.find((u) => u.username === username && u.password === password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // JWT approach
        const jwtToken = JWT.encode({ userId: user.id, username: user.username }, this.jwtSecret);

        // Session approach
        const sessionId = this.sessionManager.createSession(user.id);

        return {
            user: { id: user.id, username: user.username, email: user.email },
            jwt: jwtToken,
            sessionId: sessionId,
        };
    }

    verifyJWT(token) {
        try {
            return JWT.decode(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    verifySession(sessionId) {
        const session = this.sessionManager.getSession(sessionId);
        if (!session) {
            throw new Error('Invalid or expired session');
        }
        return session;
    }
}

// Example usage
console.log('=== Authentication ===\n');

const authService = new AuthService();

// Login
console.log('Login:');
const loginResult = authService.login('john', 'password123');
console.log('User:', loginResult.user);
console.log('JWT Token:', loginResult.jwt.substring(0, 50) + '...');
console.log('Session ID:', loginResult.sessionId);

// Verify JWT
console.log('\nVerify JWT:');
const jwtPayload = authService.verifyJWT(loginResult.jwt);
console.log('JWT Payload:', jwtPayload);

// Verify Session
console.log('\nVerify Session:');
const session = authService.verifySession(loginResult.sessionId);
console.log('Session:', session);

// OAuth 2.0
console.log('\nOAuth 2.0:');
const oauth = new OAuth2Provider('client123', 'secret456', 'http://localhost/callback');
console.log('Authorization URL:', oauth.getAuthorizationUrl('state123'));

module.exports = { JWT, OAuth2Provider, SessionManager, AuthService };
