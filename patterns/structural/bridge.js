/**
 * Bridge Pattern - JavaScript
 * 
 * Separates abstraction from implementation so both can vary independently.
 * Uses composition instead of inheritance.
 * 
 * Use cases:
 * - When you want to avoid permanent binding between abstraction and implementation
 * - When both abstractions and implementations should be extensible
 * - When changes in implementation should not affect clients
 */

// Implementation interface
class Renderer {
    renderCircle(radius) {
        throw new Error('Method must be implemented');
    }
    
    renderSquare(side) {
        throw new Error('Method must be implemented');
    }
}

// Concrete implementations
class VectorRenderer extends Renderer {
    renderCircle(radius) {
        return `Drawing a circle of radius ${radius} as vector graphics`;
    }
    
    renderSquare(side) {
        return `Drawing a square of side ${side} as vector graphics`;
    }
}

class RasterRenderer extends Renderer {
    renderCircle(radius) {
        return `Drawing a circle of radius ${radius} as pixels`;
    }
    
    renderSquare(side) {
        return `Drawing a square of side ${side} as pixels`;
    }
}

// Abstraction
class Shape {
    constructor(renderer) {
        this.renderer = renderer;
    }
    
    draw() {
        throw new Error('Method must be implemented');
    }
}

// Refined abstractions
class Circle extends Shape {
    constructor(renderer, radius) {
        super(renderer);
        this.radius = radius;
    }
    
    draw() {
        return this.renderer.renderCircle(this.radius);
    }
}

class Square extends Shape {
    constructor(renderer, side) {
        super(renderer);
        this.side = side;
    }
    
    draw() {
        return this.renderer.renderSquare(this.side);
    }
}

// Example usage
console.log('=== Bridge Pattern ===\n');

const vectorRenderer = new VectorRenderer();
const rasterRenderer = new RasterRenderer();

const vectorCircle = new Circle(vectorRenderer, 5);
const rasterCircle = new Circle(rasterRenderer, 5);

console.log('Vector Circle:');
console.log(vectorCircle.draw());

console.log('\nRaster Circle:');
console.log(rasterCircle.draw());

const vectorSquare = new Square(vectorRenderer, 10);
const rasterSquare = new Square(rasterRenderer, 10);

console.log('\nVector Square:');
console.log(vectorSquare.draw());

console.log('\nRaster Square:');
console.log(rasterSquare.draw());

module.exports = { Renderer, VectorRenderer, RasterRenderer, Shape, Circle, Square };

