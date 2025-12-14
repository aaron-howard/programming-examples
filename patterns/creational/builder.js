/**
 * Builder Pattern - JavaScript
 * 
 * Constructs complex objects step by step. Allows you to produce different types
 * and representations of an object using the same construction code.
 * 
 * Use cases:
 * - When construction of an object is complex
 * - When you want to construct objects step by step
 * - When you need different representations of the same object
 */

class Pizza {
    constructor() {
        this.size = null;
        this.crust = null;
        this.cheese = null;
        this.pepperoni = false;
        this.bacon = false;
        this.mushrooms = false;
        this.onions = false;
    }
    
    describe() {
        const toppings = [];
        if (this.pepperoni) toppings.push('pepperoni');
        if (this.bacon) toppings.push('bacon');
        if (this.mushrooms) toppings.push('mushrooms');
        if (this.onions) toppings.push('onions');
        
        return `Pizza: ${this.size} size, ${this.crust} crust, ${this.cheese} cheese` +
               (toppings.length > 0 ? `, toppings: ${toppings.join(', ')}` : '');
    }
}

class PizzaBuilder {
    constructor() {
        this.pizza = new Pizza();
    }
    
    setSize(size) {
        this.pizza.size = size;
        return this;
    }
    
    setCrust(crust) {
        this.pizza.crust = crust;
        return this;
    }
    
    setCheese(cheese) {
        this.pizza.cheese = cheese;
        return this;
    }
    
    addPepperoni() {
        this.pizza.pepperoni = true;
        return this;
    }
    
    addBacon() {
        this.pizza.bacon = true;
        return this;
    }
    
    addMushrooms() {
        this.pizza.mushrooms = true;
        return this;
    }
    
    addOnions() {
        this.pizza.onions = true;
        return this;
    }
    
    build() {
        return this.pizza;
    }
}

// Director (optional) - provides common build configurations
class PizzaDirector {
    static buildMargherita() {
        return new PizzaBuilder()
            .setSize('Large')
            .setCrust('Thin')
            .setCheese('Mozzarella')
            .build();
    }
    
    static buildMeatLovers() {
        return new PizzaBuilder()
            .setSize('Extra Large')
            .setCrust('Thick')
            .setCheese('Cheddar')
            .addPepperoni()
            .addBacon()
            .build();
    }
}

// Example usage
console.log('=== Builder Pattern ===\n');

// Custom pizza
const customPizza = new PizzaBuilder()
    .setSize('Medium')
    .setCrust('Thin')
    .setCheese('Mozzarella')
    .addPepperoni()
    .addMushrooms()
    .addOnions()
    .build();

console.log('Custom Pizza:');
console.log(customPizza.describe());

console.log();

// Using director for predefined pizzas
const margherita = PizzaDirector.buildMargherita();
console.log('Margherita:');
console.log(margherita.describe());

console.log();

const meatLovers = PizzaDirector.buildMeatLovers();
console.log('Meat Lovers:');
console.log(meatLovers.describe());

module.exports = { PizzaBuilder, PizzaDirector };

