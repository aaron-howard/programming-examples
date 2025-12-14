/**
 * Prototype Pattern - JavaScript
 * 
 * Creates objects by cloning existing instances (prototypes) rather than
 * creating new instances from scratch.
 * 
 * Use cases:
 * - When object creation is expensive
 * - When you want to avoid subclassing
 * - When you need to create objects at runtime
 */

// Prototype interface
class Shape {
    clone() {
        throw new Error('Method must be implemented');
    }
    
    draw() {
        throw new Error('Method must be implemented');
    }
}

// Concrete prototypes
class Circle extends Shape {
    constructor(radius, color) {
        super();
        this.radius = radius;
        this.color = color;
    }
    
    clone() {
        return new Circle(this.radius, this.color);
    }
    
    draw() {
        return `Drawing a ${this.color} circle with radius ${this.radius}`;
    }
}

class Rectangle extends Shape {
    constructor(width, height, color) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
    }
    
    clone() {
        return new Rectangle(this.width, this.height, this.color);
    }
    
    draw() {
        return `Drawing a ${this.color} rectangle ${this.width}x${this.height}`;
    }
}

// Prototype registry
class ShapeRegistry {
    constructor() {
        this.prototypes = {};
    }
    
    register(key, prototype) {
        this.prototypes[key] = prototype;
    }
    
    create(key) {
        const prototype = this.prototypes[key];
        if (!prototype) {
            throw new Error(`Prototype ${key} not found`);
        }
        return prototype.clone();
    }
}

// Example usage
console.log('=== Prototype Pattern ===\n');

// Create original shapes
const originalCircle = new Circle(10, 'red');
const originalRectangle = new Rectangle(20, 30, 'blue');

console.log('Original shapes:');
console.log(originalCircle.draw());
console.log(originalRectangle.draw());

console.log();

// Clone shapes
const clonedCircle = originalCircle.clone();
const clonedRectangle = originalRectangle.clone();

console.log('Cloned shapes:');
console.log(clonedCircle.draw());
console.log(clonedRectangle.draw());

console.log();
console.log('Are they different objects?', originalCircle !== clonedCircle); // true

// Using registry
const registry = new ShapeRegistry();
registry.register('red-circle', originalCircle);
registry.register('blue-rectangle', originalRectangle);

const newCircle = registry.create('red-circle');
newCircle.radius = 15; // Modify cloned object
console.log('Modified clone:', newCircle.draw());
console.log('Original unchanged:', originalCircle.draw());

module.exports = { Shape, Circle, Rectangle, ShapeRegistry };

