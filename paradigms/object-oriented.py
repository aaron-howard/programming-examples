"""
Object-Oriented Programming - Python

Programming paradigm based on classes, objects, inheritance, polymorphism, and encapsulation.
"""

from abc import ABC, abstractmethod


# Class definition
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
    
    def speak(self):
        return f"{self.name} makes a sound"
    
    def get_info(self):
        return f"{self.name} is a {self.species}"


# Inheritance
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, 'Dog')
        self.breed = breed
    
    # Method overriding (polymorphism)
    def speak(self):
        return f"{self.name} barks: Woof!"
    
    # Additional method
    def fetch(self):
        return f"{self.name} fetches the ball"


class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, 'Cat')
        self.color = color
    
    def speak(self):
        return f"{self.name} meows: Meow!"
    
    def purr(self):
        return f"{self.name} purrs contentedly"


# Encapsulation with private attributes
class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self._balance = 0  # Protected attribute
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return f"Deposited ${amount}. New balance: ${self._balance}"
        return "Invalid deposit amount"
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self._balance:
            self._balance -= amount
            return f"Withdrew ${amount}. New balance: ${self._balance}"
        return "Insufficient funds or invalid amount"
    
    def get_balance(self):
        return self._balance


# Abstraction - Abstract base class
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius


# Example usage
if __name__ == "__main__":
    print("=== Object-Oriented Programming ===\n")
    
    # Inheritance and Polymorphism
    dog = Dog('Buddy', 'Golden Retriever')
    cat = Cat('Whiskers', 'Orange')
    
    print("Inheritance & Polymorphism:")
    print(dog.get_info())
    print(dog.speak())
    print(cat.get_info())
    print(cat.speak())
    
    print("\nEncapsulation:")
    account = BankAccount('John Doe')
    print(account.deposit(100))
    print(account.deposit(50))
    print(account.withdraw(30))
    print(f"Balance: ${account.get_balance()}")
    
    print("\nAbstraction:")
    rectangle = Rectangle(5, 10)
    circle = Circle(5)
    print(f"Rectangle area: {rectangle.area()}, perimeter: {rectangle.perimeter()}")
    print(f"Circle area: {circle.area():.2f}, perimeter: {circle.perimeter():.2f}")

