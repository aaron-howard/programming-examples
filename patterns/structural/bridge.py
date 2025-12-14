"""
Bridge Pattern - Python

Separates abstraction from implementation so both can vary independently.
Uses composition instead of inheritance.

Use cases:
- When you want to avoid permanent binding between abstraction and implementation
- When both abstractions and implementations should be extensible
- When changes in implementation should not affect clients
"""

from abc import ABC, abstractmethod


# Implementation interface
class Renderer(ABC):
    @abstractmethod
    def render_circle(self, radius):
        pass
    
    @abstractmethod
    def render_square(self, side):
        pass


# Concrete implementations
class VectorRenderer(Renderer):
    def render_circle(self, radius):
        return f"Drawing a circle of radius {radius} as vector graphics"
    
    def render_square(self, side):
        return f"Drawing a square of side {side} as vector graphics"


class RasterRenderer(Renderer):
    def render_circle(self, radius):
        return f"Drawing a circle of radius {radius} as pixels"
    
    def render_square(self, side):
        return f"Drawing a square of side {side} as pixels"


# Abstraction
class Shape(ABC):
    def __init__(self, renderer):
        self.renderer = renderer
    
    @abstractmethod
    def draw(self):
        pass


# Refined abstractions
class Circle(Shape):
    def __init__(self, renderer, radius):
        super().__init__(renderer)
        self.radius = radius
    
    def draw(self):
        return self.renderer.render_circle(self.radius)


class Square(Shape):
    def __init__(self, renderer, side):
        super().__init__(renderer)
        self.side = side
    
    def draw(self):
        return self.renderer.render_square(self.side)


# Example usage
if __name__ == "__main__":
    print("=== Bridge Pattern ===\n")
    
    vector_renderer = VectorRenderer()
    raster_renderer = RasterRenderer()
    
    vector_circle = Circle(vector_renderer, 5)
    raster_circle = Circle(raster_renderer, 5)
    
    print("Vector Circle:")
    print(vector_circle.draw())
    
    print("\nRaster Circle:")
    print(raster_circle.draw())
    
    vector_square = Square(vector_renderer, 10)
    raster_square = Square(raster_renderer, 10)
    
    print("\nVector Square:")
    print(vector_square.draw())
    
    print("\nRaster Square:")
    print(raster_square.draw())

