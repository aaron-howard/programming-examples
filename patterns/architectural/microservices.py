"""
Microservices Pattern - Python

Architecture where applications are built as a collection of small,
independent services that communicate over well-defined APIs.
"""


# Service 1: User Service
class UserService:
    def __init__(self):
        self.users = []
    
    def create_user(self, user_data):
        import time
        user = {
            'id': int(time.time()),
            **user_data,
            'created_at': time.time()
        }
        self.users.append(user)
        return user
    
    def get_user(self, id):
        return next((u for u in self.users if u['id'] == id), None)


# Service 2: Order Service
class OrderService:
    def __init__(self, user_service):
        self.user_service = user_service
        self.orders = []
    
    def create_order(self, user_id, items):
        user = self.user_service.get_user(user_id)
        if not user:
            raise ValueError("User not found")
        
        import time
        order = {
            'id': int(time.time()),
            'user_id': user_id,
            'items': items,
            'total': sum(item['price'] for item in items),
            'created_at': time.time()
        }
        self.orders.append(order)
        return order
    
    def get_order(self, id):
        return next((o for o in self.orders if o['id'] == id), None)


# API Gateway (simplified)
class APIGateway:
    def __init__(self, user_service, order_service):
        self.user_service = user_service
        self.order_service = order_service
    
    def handle_request(self, method, path, data=None):
        if path.startswith('/users'):
            return self.handle_user_request(method, path, data)
        elif path.startswith('/orders'):
            return self.handle_order_request(method, path, data)
        return {'error': 'Not found'}
    
    def handle_user_request(self, method, path, data):
        if method == 'POST' and path == '/users':
            return self.user_service.create_user(data)
        elif method == 'GET' and path.startswith('/users/'):
            id = int(path.split('/')[2])
            return self.user_service.get_user(id)
        return {'error': 'Not found'}
    
    def handle_order_request(self, method, path, data):
        if method == 'POST' and path == '/orders':
            return self.order_service.create_order(data['user_id'], data['items'])
        elif method == 'GET' and path.startswith('/orders/'):
            id = int(path.split('/')[2])
            return self.order_service.get_order(id)
        return {'error': 'Not found'}


# Example usage
if __name__ == "__main__":
    print("=== Microservices Pattern ===\n")
    
    user_service = UserService()
    order_service = OrderService(user_service)
    gateway = APIGateway(user_service, order_service)
    
    # Create user via gateway
    user = gateway.handle_request('POST', '/users', {
        'name': 'John Doe',
        'email': 'john@example.com'
    })
    print("Created user:", user)
    
    # Create order via gateway
    order = gateway.handle_request('POST', '/orders', {
        'user_id': user['id'],
        'items': [
            {'name': 'Product 1', 'price': 10},
            {'name': 'Product 2', 'price': 20}
        ]
    })
    print("Created order:", order)

