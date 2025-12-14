"""
Physics Engine - Python

Physics simulation for games:
- Collision detection
- Gravity simulation
- Velocity and acceleration
"""

import math
from typing import Tuple


# Vector2D
class Vector2D:
    def __init__(self, x: float = 0, y: float = 0):
        self.x = x
        self.y = y
    
    def add(self, other: 'Vector2D') -> 'Vector2D':
        return Vector2D(self.x + other.x, self.y + other.y)
    
    def subtract(self, other: 'Vector2D') -> 'Vector2D':
        return Vector2D(self.x - other.x, self.y - other.y)
    
    def multiply(self, scalar: float) -> 'Vector2D':
        return Vector2D(self.x * scalar, self.y * scalar)
    
    def magnitude(self) -> float:
        return math.sqrt(self.x * self.x + self.y * self.y)
    
    def normalize(self) -> 'Vector2D':
        mag = self.magnitude()
        if mag == 0:
            return Vector2D(0, 0)
        return Vector2D(self.x / mag, self.y / mag)


# Physics Body
class PhysicsBody:
    def __init__(self, position: Vector2D, mass: float = 1):
        self.position = position
        self.velocity = Vector2D(0, 0)
        self.acceleration = Vector2D(0, 0)
        self.mass = mass
        self.restitution = 0.8  # Bounciness
    
    def apply_force(self, force: Vector2D):
        # F = ma, so a = F/m
        self.acceleration = self.acceleration.add(force.multiply(1 / self.mass))
    
    def update(self, delta_time: float):
        # Update velocity
        self.velocity = self.velocity.add(self.acceleration.multiply(delta_time))
        
        # Update position
        self.position = self.position.add(self.velocity.multiply(delta_time))
        
        # Reset acceleration
        self.acceleration = Vector2D(0, 0)


# Collision Detection
class CollisionDetector:
    @staticmethod
    def check_circle_collision(body1: PhysicsBody, body2: PhysicsBody, 
                               radius1: float, radius2: float) -> bool:
        distance = body1.position.subtract(body2.position).magnitude()
        return distance < (radius1 + radius2)


# Physics World
class PhysicsWorld:
    def __init__(self):
        self.bodies = []
        self.gravity = Vector2D(0, 9.8)
        self.bounds = {'min_x': 0, 'max_x': 800, 'min_y': 0, 'max_y': 600}
    
    def add_body(self, body: PhysicsBody):
        self.bodies.append(body)
    
    def update(self, delta_time: float):
        # Apply gravity
        for body in self.bodies:
            body.apply_force(self.gravity.multiply(body.mass))
            body.update(delta_time)
            
            # Boundary collision
            self.handle_boundary_collision(body)
        
        # Check collisions between bodies
        self.check_collisions()
    
    def handle_boundary_collision(self, body: PhysicsBody):
        size = 20  # Simplified size
        
        if body.position.x < self.bounds['min_x']:
            body.position.x = self.bounds['min_x']
            body.velocity.x *= -body.restitution
        elif body.position.x + size > self.bounds['max_x']:
            body.position.x = self.bounds['max_x'] - size
            body.velocity.x *= -body.restitution
        
        if body.position.y < self.bounds['min_y']:
            body.position.y = self.bounds['min_y']
            body.velocity.y *= -body.restitution
        elif body.position.y + size > self.bounds['max_y']:
            body.position.y = self.bounds['max_y'] - size
            body.velocity.y *= -body.restitution
    
    def check_collisions(self):
        for i in range(len(self.bodies)):
            for j in range(i + 1, len(self.bodies)):
                body1 = self.bodies[i]
                body2 = self.bodies[j]
                
                if CollisionDetector.check_circle_collision(body1, body2, 20, 20):
                    self.resolve_collision(body1, body2)
    
    def resolve_collision(self, body1: PhysicsBody, body2: PhysicsBody):
        # Simple collision response
        normal = body1.position.subtract(body2.position).normalize()
        relative_velocity = body1.velocity.subtract(body2.velocity)
        velocity_along_normal = relative_velocity.x * normal.x + relative_velocity.y * normal.y
        
        if velocity_along_normal > 0:
            return  # Already separating
        
        restitution = min(body1.restitution, body2.restitution)
        impulse = -(1 + restitution) * velocity_along_normal / (body1.mass + body2.mass)
        
        impulse_vector = normal.multiply(impulse)
        body1.velocity = body1.velocity.add(impulse_vector.multiply(1 / body1.mass))
        body2.velocity = body2.velocity.subtract(impulse_vector.multiply(1 / body2.mass))


# Example usage
if __name__ == "__main__":
    print("=== Physics Engine ===\n")
    
    world = PhysicsWorld()
    
    body1 = PhysicsBody(Vector2D(100, 100), 1)
    body1.velocity = Vector2D(50, -30)
    world.add_body(body1)
    
    body2 = PhysicsBody(Vector2D(200, 100), 2)
    body2.velocity = Vector2D(-30, 20)
    world.add_body(body2)
    
    print("Initial positions:")
    print(f"Body1: ({body1.position.x}, {body1.position.y})")
    print(f"Body2: ({body2.position.x}, {body2.position.y})")
    
    # Simulate physics
    for i in range(5):
        world.update(0.016)  # ~60 FPS
        print(f"\nAfter {i + 1} frames:")
        print(f"Body1: ({body1.position.x:.1f}, {body1.position.y:.1f})")
        print(f"Body2: ({body2.position.x:.1f}, {body2.position.y:.1f})")

