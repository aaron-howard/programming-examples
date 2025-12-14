"""
Backend Frameworks - Python

Examples of Express.js, Django, and Laravel patterns:
- Routing
- Middleware
- Request/Response handling
"""

from typing import Dict, List, Callable, Any, Optional
import json


# Django-like Framework
class DjangoView:
    def __init__(self):
        self.middleware = []
    
    def add_middleware(self, middleware: Callable):
        self.middleware.append(middleware)
    
    def dispatch(self, request: Dict) -> Dict:
        # Run middleware
        for mw in self.middleware:
            response = mw(request)
            if response:
                return response
        
        # Handle request
        return self.handle(request)
    
    def handle(self, request: Dict) -> Dict:
        raise NotImplementedError("Handle method must be implemented")


class UserListView(DjangoView):
    def handle(self, request: Dict) -> Dict:
        users = [
            {'id': 1, 'name': 'John Doe'},
            {'id': 2, 'name': 'Jane Smith'}
        ]
        return {'status': 200, 'data': users}


class UserDetailView(DjangoView):
    def handle(self, request: Dict) -> Dict:
        user_id = request.get('params', {}).get('id')
        users = [
            {'id': 1, 'name': 'John Doe'},
            {'id': 2, 'name': 'Jane Smith'}
        ]
        user = next((u for u in users if u['id'] == int(user_id)), None)
        if not user:
            return {'status': 404, 'data': {'error': 'Not found'}}
        return {'status': 200, 'data': user}


# Middleware examples
def logger_middleware(request: Dict) -> Optional[Dict]:
    print(f"{request.get('method')} {request.get('path')}")
    return None


def auth_middleware(request: Dict) -> Optional[Dict]:
    token = request.get('headers', {}).get('authorization')
    if not token:
        return {'status': 401, 'data': {'error': 'Unauthorized'}}
    request['user'] = {'id': 1, 'name': 'User'}
    return None


# Laravel-like Router
class LaravelRouter:
    def __init__(self):
        self.routes: List[Dict] = []
        self.middleware: List[Callable] = []
    
    def middleware(self, *middlewares: Callable):
        for mw in middlewares:
            self.middleware.append(mw)
        return self
    
    def get(self, path: str, handler: Callable):
        self.routes.append({'method': 'GET', 'path': path, 'handler': handler})
    
    def post(self, path: str, handler: Callable):
        self.routes.append({'method': 'POST', 'path': path, 'handler': handler})
    
    def handle(self, method: str, path: str, request: Dict = None) -> Dict:
        request = request or {}
        
        # Run middleware
        for mw in self.middleware:
            response = mw(request)
            if response:
                return response
        
        # Find route
        route = next((r for r in self.routes if r['method'] == method and r['path'] == path), None)
        if not route:
            return {'status': 404, 'data': {'error': 'Not found'}}
        
        return route['handler'](request)


# Example usage
if __name__ == "__main__":
    print("=== Backend Frameworks ===\n")
    
    # Django-like
    print("Django-like Views:")
    user_list = UserListView()
    user_list.add_middleware(logger_middleware)
    print(user_list.dispatch({'method': 'GET', 'path': '/users'}))
    
    user_detail = UserDetailView()
    user_detail.add_middleware(logger_middleware)
    print(user_detail.dispatch({'method': 'GET', 'path': '/users/1', 'params': {'id': '1'}}))
    
    # Laravel-like
    print("\nLaravel-like Router:")
    router = LaravelRouter()
    router.middleware(logger_middleware)
    
    router.get('/api/users', lambda req: {'status': 200, 'data': [
        {'id': 1, 'name': 'John Doe'},
        {'id': 2, 'name': 'Jane Smith'}
    ]})
    
    router.post('/api/users', lambda req: {
        'status': 201,
        'data': {'id': int(__import__('time').time()), **req.get('body', {})}
    })
    
    print(router.handle('GET', '/api/users'))
    print(router.handle('POST', '/api/users', {'body': {'name': 'Bob'}}))

