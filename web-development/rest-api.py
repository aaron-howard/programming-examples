"""
REST API - Python

Representational State Transfer API using HTTP methods:
- GET: Retrieve resources
- POST: Create resources
- PUT: Update resources
- DELETE: Remove resources
"""

from typing import Dict, List, Optional, Any
import json


# Simple REST API Server
class RESTAPI:
    def __init__(self):
        self.routes = {
            'GET': {},
            'POST': {},
            'PUT': {},
            'DELETE': {}
        }
        self.data = {
            'users': [
                {'id': 1, 'name': 'John Doe', 'email': 'john@example.com'},
                {'id': 2, 'name': 'Jane Smith', 'email': 'jane@example.com'}
            ],
            'posts': [
                {'id': 1, 'title': 'First Post', 'content': 'Hello World', 'userId': 1},
                {'id': 2, 'title': 'Second Post', 'content': 'REST API Example', 'userId': 1}
            ]
        }
        self.next_user_id = 3
        self.next_post_id = 3
    
    # Register routes
    def get(self, path: str, handler: callable):
        self.routes['GET'][path] = handler
    
    def post(self, path: str, handler: callable):
        self.routes['POST'][path] = handler
    
    def put(self, path: str, handler: callable):
        self.routes['PUT'][path] = handler
    
    def delete(self, path: str, handler: callable):
        self.routes['DELETE'][path] = handler
    
    # Handle request
    def handle_request(self, method: str, path: str, body: Optional[Dict] = None) -> Dict:
        handler = self.routes.get(method, {}).get(path)
        if not handler:
            return {'status': 404, 'data': {'error': 'Not found'}}
        return handler({'body': body or {}, 'params': self.extract_params(path)})
    
    def extract_params(self, path: str) -> Dict:
        # Simple parameter extraction
        params = {}
        path_parts = path.split('/')
        if len(path_parts) > 2 and path_parts[2]:
            try:
                params['id'] = int(path_parts[2])
            except ValueError:
                pass
        return params


# API Handlers
def setup_api(api: RESTAPI):
    # GET /users - List all users
    api.get('/users', lambda req: {'status': 200, 'data': api.data['users']})
    
    # GET /users/:id - Get user by ID
    def get_user(req):
        user = next((u for u in api.data['users'] if u['id'] == req['params'].get('id')), None)
        if not user:
            return {'status': 404, 'data': {'error': 'User not found'}}
        return {'status': 200, 'data': user}
    api.get('/users/:id', get_user)
    
    # POST /users - Create new user
    def create_user(req):
        body = req['body']
        if not body.get('name') or not body.get('email'):
            return {'status': 400, 'data': {'error': 'Name and email required'}}
        new_user = {
            'id': api.next_user_id,
            'name': body['name'],
            'email': body['email']
        }
        api.next_user_id += 1
        api.data['users'].append(new_user)
        return {'status': 201, 'data': new_user}
    api.post('/users', create_user)
    
    # PUT /users/:id - Update user
    def update_user(req):
        user_id = req['params'].get('id')
        user_index = next((i for i, u in enumerate(api.data['users']) if u['id'] == user_id), -1)
        if user_index == -1:
            return {'status': 404, 'data': {'error': 'User not found'}}
        api.data['users'][user_index].update(req['body'])
        return {'status': 200, 'data': api.data['users'][user_index]}
    api.put('/users/:id', update_user)
    
    # DELETE /users/:id - Delete user
    def delete_user(req):
        user_id = req['params'].get('id')
        user_index = next((i for i, u in enumerate(api.data['users']) if u['id'] == user_id), -1)
        if user_index == -1:
            return {'status': 404, 'data': {'error': 'User not found'}}
        api.data['users'].pop(user_index)
        return {'status': 204, 'data': None}
    api.delete('/users/:id', delete_user)
    
    # GET /posts - List all posts
    api.get('/posts', lambda req: {'status': 200, 'data': api.data['posts']})
    
    # GET /posts/:id - Get post by ID
    def get_post(req):
        post = next((p for p in api.data['posts'] if p['id'] == req['params'].get('id')), None)
        if not post:
            return {'status': 404, 'data': {'error': 'Post not found'}}
        return {'status': 200, 'data': post}
    api.get('/posts/:id', get_post)


# Example usage
if __name__ == "__main__":
    print("=== REST API ===\n")
    
    api = RESTAPI()
    setup_api(api)
    
    # GET requests
    print("GET /users:")
    print(json.dumps(api.handle_request('GET', '/users'), indent=2))
    
    print("\nGET /users/1:")
    print(json.dumps(api.handle_request('GET', '/users/1'), indent=2))
    
    # POST request
    print("\nPOST /users:")
    print(json.dumps(api.handle_request('POST', '/users', {
        'name': 'Bob Johnson',
        'email': 'bob@example.com'
    }), indent=2))
    
    # PUT request
    print("\nPUT /users/1:")
    print(json.dumps(api.handle_request('PUT', '/users/1', {
        'email': 'john.updated@example.com'
    }), indent=2))
    
    # GET posts
    print("\nGET /posts:")
    print(json.dumps(api.handle_request('GET', '/posts'), indent=2))

