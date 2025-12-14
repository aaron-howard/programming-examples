"""
Decorator Pattern - Python

Attaches additional responsibilities to objects dynamically.
Provides a flexible alternative to subclassing for extending functionality.

Use cases:
- Adding features to objects without modifying their structure
- When subclassing would result in an explosion of subclasses
- Runtime behavior modification
"""

from abc import ABC, abstractmethod


# Component interface
class Coffee(ABC):
    @abstractmethod
    def get_cost(self):
        pass
    
    @abstractmethod
    def get_description(self):
        pass


# Concrete component
class SimpleCoffee(Coffee):
    def get_cost(self):
        return 5
    
    def get_description(self):
        return "Simple coffee"


# Base decorator
class CoffeeDecorator(Coffee):
    def __init__(self, coffee):
        self.coffee = coffee
    
    def get_cost(self):
        return self.coffee.get_cost()
    
    def get_description(self):
        return self.coffee.get_description()


# Concrete decorators
class MilkDecorator(CoffeeDecorator):
    def get_cost(self):
        return self.coffee.get_cost() + 2
    
    def get_description(self):
        return self.coffee.get_description() + ", milk"


class SugarDecorator(CoffeeDecorator):
    def get_cost(self):
        return self.coffee.get_cost() + 1
    
    def get_description(self):
        return self.coffee.get_description() + ", sugar"


class WhipDecorator(CoffeeDecorator):
    def get_cost(self):
        return self.coffee.get_cost() + 3
    
    def get_description(self):
        return self.coffee.get_description() + ", whip"


# Example usage
if __name__ == "__main__":
    print("=== Decorator Pattern ===\n")
    
    coffee = SimpleCoffee()
    print(f"{coffee.get_description()} - ${coffee.get_cost()}")
    
    coffee = MilkDecorator(coffee)
    print(f"{coffee.get_description()} - ${coffee.get_cost()}")
    
    coffee = SugarDecorator(coffee)
    print(f"{coffee.get_description()} - ${coffee.get_cost()}")
    
    coffee = WhipDecorator(coffee)
    print(f"{coffee.get_description()} - ${coffee.get_cost()}")

