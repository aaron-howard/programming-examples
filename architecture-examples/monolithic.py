"""
Monolithic Architecture - Python

Single, unified application where all components are tightly coupled
and deployed together as one unit.
"""


# Monolithic Application Structure
class MonolithicApp:
    def __init__(self):
        self.user_service = UserService()
        self.order_service = OrderService()
        self.payment_service = PaymentService()
        self.database = Database()
    
    # All services share the same database connection
    def initialize(self):
        self.database.connect()
        print("Monolithic app initialized")
    
    def handle_request(self, endpoint, data):
        if endpoint == '/users':
            return self.user_service.handle(data)
        elif endpoint == '/orders':
            return self.order_service.handle(data)
        elif endpoint == '/payments':
            return self.payment_service.handle(data)
        else:
            return {'error': 'Not found'}


class UserService:
    def __init__(self):
        self.db = None  # Shared database
    
    def set_database(self, db):
        self.db = db
    
    def handle(self, data):
        if data.get('action') == 'create':
            return self.create_user(data.get('user'))
        return {'error': 'Invalid action'}
    
    def create_user(self, user):
        # Direct database access
        import time
        return {'id': int(time.time()), **user, 'created': time.time()}


class OrderService:
    def __init__(self):
        self.db = None
    
    def set_database(self, db):
        self.db = db
    
    def handle(self, data):
        if data.get('action') == 'create':
            return self.create_order(data.get('order'))
        return {'error': 'Invalid action'}
    
    def create_order(self, order):
        import time
        return {'id': int(time.time()), **order, 'status': 'pending'}


class PaymentService:
    def handle(self, data):
        if data.get('action') == 'process':
            return self.process_payment(data.get('payment'))
        return {'error': 'Invalid action'}
    
    def process_payment(self, payment):
        import time
        return {'id': int(time.time()), **payment, 'status': 'completed'}


class Database:
    def connect(self):
        print("Database connected (shared connection)")


# Example usage
if __name__ == "__main__":
    print("=== Monolithic Architecture ===\n")
    
    app = MonolithicApp()
    app.initialize()
    
    print("\nHandling requests:")
    print(app.handle_request('/users', {'action': 'create', 'user': {'name': 'John'}}))
    print(app.handle_request('/orders', {'action': 'create', 'order': {'item': 'Book'}}))
    print(app.handle_request('/payments', {'action': 'process', 'payment': {'amount': 100}}))

