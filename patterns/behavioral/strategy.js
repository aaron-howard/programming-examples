/**
 * Strategy Pattern - JavaScript
 * 
 * Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 * Lets the algorithm vary independently from clients that use it.
 * 
 * Use cases:
 * - When you have multiple ways to perform a task
 * - When you want to avoid conditional statements for algorithm selection
 * - Runtime algorithm selection
 */

// Strategy interface
class PaymentStrategy {
    pay(amount) {
        throw new Error('Method must be implemented');
    }
}

// Concrete strategies
class CreditCardPayment extends PaymentStrategy {
    constructor(cardNumber, cvv) {
        super();
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }
    
    pay(amount) {
        return `Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`;
    }
}

class PayPalPayment extends PaymentStrategy {
    constructor(email) {
        super();
        this.email = email;
    }
    
    pay(amount) {
        return `Paid $${amount} using PayPal account ${this.email}`;
    }
}

class BitcoinPayment extends PaymentStrategy {
    constructor(walletAddress) {
        super();
        this.walletAddress = walletAddress;
    }
    
    pay(amount) {
        return `Paid $${amount} using Bitcoin wallet ${this.walletAddress.slice(0, 8)}...`;
    }
}

// Context
class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        return this.strategy.pay(amount);
    }
}

// Example usage
console.log('=== Strategy Pattern ===\n');

const processor = new PaymentProcessor(new CreditCardPayment('1234567890123456', '123'));
console.log(processor.processPayment(100));

processor.setStrategy(new PayPalPayment('user@example.com'));
console.log(processor.processPayment(50));

processor.setStrategy(new BitcoinPayment('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'));
console.log(processor.processPayment(200));

module.exports = { PaymentStrategy, CreditCardPayment, PayPalPayment, BitcoinPayment, PaymentProcessor };

