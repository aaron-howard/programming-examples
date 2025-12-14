"""
Mediator Pattern - Python

Defines how a set of objects interact. Promotes loose coupling by keeping
objects from referring to each other explicitly, and lets you vary their
interaction independently.

Use cases:
- Chat systems
- Air traffic control
- UI component communication
- Event buses
"""

from abc import ABC, abstractmethod


# Mediator interface
class Mediator(ABC):
    @abstractmethod
    def notify(self, sender, event):
        pass


# Concrete mediator
class ChatMediator(Mediator):
    def __init__(self):
        self.users = []
    
    def add_user(self, user):
        self.users.append(user)
    
    def notify(self, sender, event):
        for user in self.users:
            if user != sender:
                user.receive(event)


# Colleague interface
class User:
    def __init__(self, name, mediator):
        self.name = name
        self.mediator = mediator
    
    def send(self, message):
        print(f"{self.name} sends: {message}")
        self.mediator.notify(self, {'from': self.name, 'message': message})
    
    def receive(self, event):
        print(f"{self.name} receives from {event['from']}: {event['message']}")


# Example usage
if __name__ == "__main__":
    print("=== Mediator Pattern ===\n")
    
    chat_mediator = ChatMediator()
    
    user1 = User('Alice', chat_mediator)
    user2 = User('Bob', chat_mediator)
    user3 = User('Charlie', chat_mediator)
    
    chat_mediator.add_user(user1)
    chat_mediator.add_user(user2)
    chat_mediator.add_user(user3)
    
    user1.send('Hello everyone!')
    print()
    user2.send('Hi Alice!')
    print()
    user3.send('Hey guys!')

