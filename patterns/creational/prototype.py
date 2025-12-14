"""
Prototype Pattern - Python

Creates objects by cloning existing instances (prototypes) rather than
creating new instances from scratch.

Use cases:
- When object creation is expensive
- When you want to avoid subclassing
- When you need to create objects at runtime
"""

import copy
from abc import ABC, abstractmethod


# Prototype interface
class Shape(ABC):
    @abstractmethod
    def clone(self):
        pass
    
    @abstractmethod
    def draw(self):
        pass


# Concrete prototypes
class Circle(Shape):
    def __init__(self, radius, color):
        self.radius = radius
        self.color = color
    
    def clone(self):
        return copy.deepcopy(self)
    
    def draw(self):
        return f"Drawing a {self.color} circle with radius {self.radius}"


class Rectangle(Shape):
    def __init__(self, width, height, color):
        self.width = width
        self.height = height
        self.color = color
    
    def clone(self):
        return copy.deepcopy(self)
    
    def draw(self):
        return f"Drawing a {self.color} rectangle {self.width}x{self.height}"


# Prototype registry
class ShapeRegistry:
    def __init__(self):
        self.prototypes = {}
    
    def register(self, key, prototype):
        self.prototypes[key] = prototype
    
    def create(self, key):
        prototype = self.prototypes.get(key)
        if not prototype:
            raise ValueError(f"Prototype {key} not found")
        return prototype.clone()


# Example usage
if __name__ == "__main__":
    print("=== Prototype Pattern ===\n")
    
    # Create original shapes
    original_circle = Circle(10, 'red')
    original_rectangle = Rectangle(20, 30, 'blue')
    
    print("Original shapes:")
    print(original_circle.draw())
    print(original_rectangle.draw())
    
    print()
    
    # Clone shapes
    cloned_circle = original_circle.clone()
    cloned_rectangle = original_rectangle.clone()
    
    print("Cloned shapes:")
    print(cloned_circle.draw())
    print(cloned_rectangle.draw())
    
    print()
    print("Are they different objects?", original_circle is not cloned_circle)  # True
    
    # Using registry
    registry = ShapeRegistry()
    registry.register('red-circle', original_circle)
    registry.register('blue-rectangle', original_rectangle)
    
    new_circle = registry.create('red-circle')
    new_circle.radius = 15  # Modify cloned object
    print("Modified clone:", new_circle.draw())
    print("Original unchanged:", original_circle.draw())

