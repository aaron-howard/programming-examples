/**
 * Decorator Pattern - JavaScript
 * 
 * Attaches additional responsibilities to objects dynamically.
 * Provides a flexible alternative to subclassing for extending functionality.
 * 
 * Use cases:
 * - Adding features to objects without modifying their structure
 * - When subclassing would result in an explosion of subclasses
 * - Runtime behavior modification
 */

// Component interface
class Coffee {
    getCost() {
        throw new Error('Method must be implemented');
    }
    
    getDescription() {
        throw new Error('Method must be implemented');
    }
}

// Concrete component
class SimpleCoffee extends Coffee {
    getCost() {
        return 5;
    }
    
    getDescription() {
        return 'Simple coffee';
    }
}

// Base decorator
class CoffeeDecorator extends Coffee {
    constructor(coffee) {
        super();
        this.coffee = coffee;
    }
    
    getCost() {
        return this.coffee.getCost();
    }
    
    getDescription() {
        return this.coffee.getDescription();
    }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    getCost() {
        return this.coffee.getCost() + 2;
    }
    
    getDescription() {
        return this.coffee.getDescription() + ', milk';
    }
}

class SugarDecorator extends CoffeeDecorator {
    getCost() {
        return this.coffee.getCost() + 1;
    }
    
    getDescription() {
        return this.coffee.getDescription() + ', sugar';
    }
}

class WhipDecorator extends CoffeeDecorator {
    getCost() {
        return this.coffee.getCost() + 3;
    }
    
    getDescription() {
        return this.coffee.getDescription() + ', whip';
    }
}

// Example usage
console.log('=== Decorator Pattern ===\n');

let coffee = new SimpleCoffee();
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new MilkDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new SugarDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new WhipDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

module.exports = { Coffee, SimpleCoffee, CoffeeDecorator, MilkDecorator, SugarDecorator, WhipDecorator };

