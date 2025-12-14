/**
 * Physics Engine - JavaScript
 * 
 * Physics simulation for games:
 * - Collision detection
 * - Gravity simulation
 * - Velocity and acceleration
 */

// Vector2D
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    add(other) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }
    
    subtract(other) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }
    
    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }
    
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) return new Vector2D(0, 0);
        return new Vector2D(this.x / mag, this.y / mag);
    }
}

// Physics Body
class PhysicsBody {
    constructor(position, mass = 1) {
        this.position = position;
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0, 0);
        this.mass = mass;
        this.restitution = 0.8; // Bounciness
    }
    
    applyForce(force) {
        // F = ma, so a = F/m
        this.acceleration = this.acceleration.add(force.multiply(1 / this.mass));
    }
    
    update(deltaTime) {
        // Update velocity
        this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));
        
        // Update position
        this.position = this.position.add(this.velocity.multiply(deltaTime));
        
        // Reset acceleration
        this.acceleration = new Vector2D(0, 0);
    }
}

// Collision Detection
class CollisionDetector {
    // AABB (Axis-Aligned Bounding Box) collision
    static checkAABBCollision(body1, body2, size1, size2) {
        return (
            body1.position.x < body2.position.x + size2.x &&
            body1.position.x + size1.x > body2.position.x &&
            body1.position.y < body2.position.y + size2.y &&
            body1.position.y + size1.y > body2.position.y
        );
    }
    
    // Circle collision
    static checkCircleCollision(body1, body2, radius1, radius2) {
        const distance = body1.position.subtract(body2.position).magnitude();
        return distance < (radius1 + radius2);
    }
}

// Physics World
class PhysicsWorld {
    constructor() {
        this.bodies = [];
        this.gravity = new Vector2D(0, 9.8);
        this.bounds = { minX: 0, maxX: 800, minY: 0, maxY: 600 };
    }
    
    addBody(body) {
        this.bodies.push(body);
    }
    
    update(deltaTime) {
        // Apply gravity
        for (const body of this.bodies) {
            body.applyForce(this.gravity.multiply(body.mass));
            body.update(deltaTime);
            
            // Boundary collision
            this.handleBoundaryCollision(body);
        }
        
        // Check collisions between bodies
        this.checkCollisions();
    }
    
    handleBoundaryCollision(body) {
        const size = 20; // Simplified size
        
        if (body.position.x < this.bounds.minX) {
            body.position.x = this.bounds.minX;
            body.velocity.x *= -body.restitution;
        } else if (body.position.x + size > this.bounds.maxX) {
            body.position.x = this.bounds.maxX - size;
            body.velocity.x *= -body.restitution;
        }
        
        if (body.position.y < this.bounds.minY) {
            body.position.y = this.bounds.minY;
            body.velocity.y *= -body.restitution;
        } else if (body.position.y + size > this.bounds.maxY) {
            body.position.y = this.bounds.maxY - size;
            body.velocity.y *= -body.restitution;
        }
    }
    
    checkCollisions() {
        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                const body1 = this.bodies[i];
                const body2 = this.bodies[j];
                
                if (CollisionDetector.checkCircleCollision(body1, body2, 20, 20)) {
                    this.resolveCollision(body1, body2);
                }
            }
        }
    }
    
    resolveCollision(body1, body2) {
        // Simple collision response
        const normal = body1.position.subtract(body2.position).normalize();
        const relativeVelocity = body1.velocity.subtract(body2.velocity);
        const velocityAlongNormal = relativeVelocity.x * normal.x + relativeVelocity.y * normal.y;
        
        if (velocityAlongNormal > 0) return; // Already separating
        
        const restitution = Math.min(body1.restitution, body2.restitution);
        const impulse = -(1 + restitution) * velocityAlongNormal / (body1.mass + body2.mass);
        
        const impulseVector = normal.multiply(impulse);
        body1.velocity = body1.velocity.add(impulseVector.multiply(1 / body1.mass));
        body2.velocity = body2.velocity.subtract(impulseVector.multiply(1 / body2.mass));
    }
}

// Example usage
console.log('=== Physics Engine ===\n');

const world = new PhysicsWorld();

const body1 = new PhysicsBody(new Vector2D(100, 100), 1);
body1.velocity = new Vector2D(50, -30);
world.addBody(body1);

const body2 = new PhysicsBody(new Vector2D(200, 100), 2);
body2.velocity = new Vector2D(-30, 20);
world.addBody(body2);

console.log('Initial positions:');
console.log(`Body1: (${body1.position.x}, ${body1.position.y})`);
console.log(`Body2: (${body2.position.x}, ${body2.position.y})`);

// Simulate physics
for (let i = 0; i < 5; i++) {
    world.update(0.016); // ~60 FPS
    console.log(`\nAfter ${i + 1} frames:`);
    console.log(`Body1: (${body1.position.x.toFixed(1)}, ${body1.position.y.toFixed(1)})`);
    console.log(`Body2: (${body2.position.x.toFixed(1)}, ${body2.position.y.toFixed(1)})`);
}

module.exports = { Vector2D, PhysicsBody, CollisionDetector, PhysicsWorld };

