"""
Clean Architecture Pattern - Python

Separates software into layers with clear dependencies:
- Entities: Business objects
- Use Cases: Application-specific business rules
- Interface Adapters: Controllers, presenters, gateways
- Frameworks & Drivers: External tools and frameworks
"""


# Entities (Domain Layer)
class User:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email


# Use Cases (Application Layer)
class CreateUserUseCase:
    def __init__(self, user_repository):
        self.user_repository = user_repository
    
    def execute(self, name, email):
        if not name or not email:
            raise ValueError("Name and email are required")
        
        user = User(int(__import__('time').time()), name, email)
        return self.user_repository.save(user)


# Interface Adapters (Interface Layer)
class UserRepository:
    def __init__(self):
        self.users = []
    
    def save(self, user):
        self.users.append(user)
        return user
    
    def find_by_id(self, id):
        return next((u for u in self.users if u.id == id), None)


class UserController:
    def __init__(self, create_user_use_case):
        self.create_user_use_case = create_user_use_case
    
    def create_user(self, request):
        try:
            user = self.create_user_use_case.execute(request['name'], request['email'])
            return {'success': True, 'user': user}
        except ValueError as error:
            return {'success': False, 'error': str(error)}


# Example usage
if __name__ == "__main__":
    print("=== Clean Architecture Pattern ===\n")
    
    repository = UserRepository()
    create_user_use_case = CreateUserUseCase(repository)
    controller = UserController(create_user_use_case)
    
    result = controller.create_user({
        'name': 'John Doe',
        'email': 'john@example.com'
    })
    
    print("Result:", result)

