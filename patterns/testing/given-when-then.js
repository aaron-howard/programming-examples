/**
 * Given-When-Then Pattern - JavaScript
 * 
 * BDD (Behavior-Driven Development) test structure:
 * - Given: Initial context/preconditions
 * - When: Action/event that triggers behavior
 * - Then: Expected outcome/assertion
 */

// BDD-style test framework
class BDDTestFramework {
    constructor() {
        this.tests = [];
    }
    
    given(description, setup) {
        return {
            when: (actionDesc, action) => ({
                then: (expectedDesc, assertion) => {
                    this.tests.push({
                        given: description,
                        when: actionDesc,
                        then: expectedDesc,
                        setup,
                        action,
                        assertion
                    });
                }
            })
        };
    }
    
    async run() {
        for (const test of this.tests) {
            try {
                const context = await test.setup();
                const result = await test.action(context);
                await test.assertion(context, result);
                console.log(`✓ Given ${test.given}, when ${test.when}, then ${test.then}`);
            } catch (error) {
                console.log(`✗ Given ${test.given}, when ${test.when}, then ${test.then}: ${error.message}`);
            }
        }
    }
}

// Example: Shopping Cart
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    
    addItem(item) {
        this.items.push(item);
    }
    
    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }
    
    getItemCount() {
        return this.items.length;
    }
}

// Example usage
console.log('=== Given-When-Then Pattern ===\n');

const bdd = new BDDTestFramework();

bdd.given('an empty shopping cart', () => {
    return { cart: new ShoppingCart() };
})
.when('I add an item costing $10', (context) => {
    context.cart.addItem({ name: 'Product', price: 10 });
    return context;
})
.then('the cart total should be $10', (context, result) => {
    if (context.cart.getTotal() !== 10) {
        throw new Error(`Expected $10, got $${context.cart.getTotal()}`);
    }
});

bdd.given('a shopping cart with one item', () => {
    const cart = new ShoppingCart();
    cart.addItem({ name: 'Product 1', price: 15 });
    return { cart };
})
.when('I add another item costing $20', (context) => {
    context.cart.addItem({ name: 'Product 2', price: 20 });
    return context;
})
.then('the cart should have 2 items and total $35', (context, result) => {
    if (context.cart.getItemCount() !== 2) {
        throw new Error(`Expected 2 items, got ${context.cart.getItemCount()}`);
    }
    if (context.cart.getTotal() !== 35) {
        throw new Error(`Expected $35, got $${context.cart.getTotal()}`);
    }
});

bdd.run();

module.exports = { BDDTestFramework, ShoppingCart };

