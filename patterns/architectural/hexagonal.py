"""
Hexagonal Architecture (Ports & Adapters) Pattern - Python

Separates core business logic from external concerns:
- Ports: Interfaces for external interactions
- Adapters: Implementations of ports
- Core: Business logic (independent of external frameworks)
"""

from abc import ABC, abstractmethod


# Core Domain (Business Logic)
class User:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email
    
    def is_valid(self):
        return self.name and self.email and '@' in self.email


# Port (Interface)
class UserRepositoryPort(ABC):
    @abstractmethod
    def save(self, user):
        pass
    
    @abstractmethod
    def find_by_id(self, id):
        pass


# Port (Interface)
class EmailServicePort(ABC):
    @abstractmethod
    def send(self, email, message):
        pass


# Adapter (In-Memory Implementation)
class InMemoryUserRepository(UserRepositoryPort):
    def __init__(self):
        self.users = []
    
    def save(self, user):
        self.users.append(user)
        return user
    
    def find_by_id(self, id):
        return next((u for u in self.users if u.id == id), None)


# Adapter (Console Email Service)
class ConsoleEmailService(EmailServicePort):
    def send(self, email, message):
        print(f"Email to {email}: {message}")


# Application Service (Use Case)
class CreateUserUseCase:
    def __init__(self, user_repository, email_service):
        self.user_repository = user_repository
        self.email_service = email_service
    
    def execute(self, name, email):
        import time
        user = User(int(time.time()), name, email)
        
        if not user.is_valid():
            raise ValueError("Invalid user data")
        
        saved_user = self.user_repository.save(user)
        self.email_service.send(email, f"Welcome {name}!")
        
        return saved_user


# Example usage
if __name__ == "__main__":
    print("=== Hexagonal Architecture Pattern ===\n")
    
    user_repository = InMemoryUserRepository()
    email_service = ConsoleEmailService()
    create_user_use_case = CreateUserUseCase(user_repository, email_service)
    
    user = create_user_use_case.execute('John Doe', 'john@example.com')
    print("Created user:", user.__dict__)

