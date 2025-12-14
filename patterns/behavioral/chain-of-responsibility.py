"""
Chain of Responsibility Pattern - Python

Passes requests along a chain of handlers. Each handler decides either to
process the request or pass it to the next handler in the chain.

Use cases:
- Request processing pipelines
- Event handling
- Middleware
- Validation chains
"""

from abc import ABC, abstractmethod


# Handler interface
class Handler(ABC):
    def __init__(self):
        self.next = None
    
    def set_next(self, handler):
        self.next = handler
        return handler
    
    @abstractmethod
    def handle(self, request):
        if self.next:
            return self.next.handle(request)
        return None


# Concrete handlers
class AuthenticationHandler(Handler):
    def handle(self, request):
        if request.get('user') and request['user'].get('authenticated'):
            print("Authentication: OK")
            return super().handle(request)
        print("Authentication: FAILED")
        return "Authentication failed"


class AuthorizationHandler(Handler):
    def handle(self, request):
        if request.get('user') and request['user'].get('role') == 'admin':
            print("Authorization: OK")
            return super().handle(request)
        print("Authorization: FAILED")
        return "Authorization failed"


class ValidationHandler(Handler):
    def handle(self, request):
        if request.get('data') and len(request['data']) > 0:
            print("Validation: OK")
            return super().handle(request)
        print("Validation: FAILED")
        return "Validation failed"


class RequestProcessor(Handler):
    def handle(self, request):
        print(f"Processing request: {request}")
        return "Request processed successfully"


# Example usage
if __name__ == "__main__":
    print("=== Chain of Responsibility Pattern ===\n")
    
    # Build chain
    auth = AuthenticationHandler()
    authz = AuthorizationHandler()
    validation = ValidationHandler()
    processor = RequestProcessor()
    
    auth.set_next(authz).set_next(validation).set_next(processor)
    
    # Test requests
    print("Request 1 (authenticated, admin, valid data):")
    request1 = {
        'user': {'authenticated': True, 'role': 'admin'},
        'data': 'some data'
    }
    print("Result:", auth.handle(request1))
    
    print("\nRequest 2 (not authenticated):")
    request2 = {
        'user': {'authenticated': False},
        'data': 'some data'
    }
    print("Result:", auth.handle(request2))
    
    print("\nRequest 3 (authenticated, but not admin):")
    request3 = {
        'user': {'authenticated': True, 'role': 'user'},
        'data': 'some data'
    }
    print("Result:", auth.handle(request3))

