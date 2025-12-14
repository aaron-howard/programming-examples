"""
Layered Architecture Pattern - Python

Organizes code into horizontal layers, each with specific responsibilities:
- Presentation Layer: UI
- Business Layer: Business logic
- Data Access Layer: Database operations
"""


# Data Access Layer
class UserDAO:
    def __init__(self):
        self.users = []
    
    def save(self, user):
        self.users.append(user)
        return user
    
    def find_by_id(self, id):
        return next((u for u in self.users if u['id'] == id), None)
    
    def find_all(self):
        return self.users


# Business Layer
class UserService:
    def __init__(self, user_dao):
        self.user_dao = user_dao
    
    def create_user(self, name, email):
        # Business logic
        if not self.is_valid_email(email):
            raise ValueError("Invalid email")
        
        import time
        user = {
            'id': int(time.time()),
            'name': name,
            'email': email,
            'created_at': time.time()
        }
        
        return self.user_dao.save(user)
    
    def get_user(self, id):
        return self.user_dao.find_by_id(id)
    
    def get_all_users(self):
        return self.user_dao.find_all()
    
    def is_valid_email(self, email):
        return '@' in email


# Presentation Layer
class UserController:
    def __init__(self, user_service):
        self.user_service = user_service
    
    def create_user(self, req):
        try:
            user = self.user_service.create_user(req['name'], req['email'])
            return {'status': 200, 'data': user}
        except ValueError as error:
            return {'status': 400, 'error': str(error)}
    
    def get_user(self, id):
        user = self.user_service.get_user(id)
        return {'status': 200, 'data': user} if user else {'status': 404, 'error': 'User not found'}


# Example usage
if __name__ == "__main__":
    print("=== Layered Architecture Pattern ===\n")
    
    dao = UserDAO()
    service = UserService(dao)
    controller = UserController(service)
    
    result = controller.create_user({'name': 'John Doe', 'email': 'john@example.com'})
    print("Create user:", result)
    
    user = controller.get_user(result['data']['id'])
    print("Get user:", user)

