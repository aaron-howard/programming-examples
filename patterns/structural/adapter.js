/**
 * Adapter Pattern - JavaScript
 * 
 * Allows objects with incompatible interfaces to collaborate.
 * Acts as a bridge between two incompatible interfaces.
 * 
 * Use cases:
 * - Integrating third-party libraries
 * - Legacy code integration
 * - Interface compatibility
 */

// Target interface (what client expects)
class PaymentProcessor {
    processPayment(amount) {
        throw new Error('Method must be implemented');
    }
}

// Adaptee (existing incompatible interface)
class LegacyPaymentSystem {
    makePayment(dollars, cents) {
        return `Legacy payment: $${dollars}.${cents.toString().padStart(2, '0')}`;
    }
}

// Adapter
class LegacyPaymentAdapter extends PaymentProcessor {
    constructor(legacySystem) {
        super();
        this.legacySystem = legacySystem;
    }
    
    processPayment(amount) {
        // Convert amount to dollars and cents
        const dollars = Math.floor(amount);
        const cents = Math.round((amount - dollars) * 100);
        return this.legacySystem.makePayment(dollars, cents);
    }
}

// Another adaptee
class ThirdPartyPaymentAPI {
    pay(amountInCents) {
        return `Third-party payment: ${amountInCents} cents`;
    }
}

// Another adapter
class ThirdPartyPaymentAdapter extends PaymentProcessor {
    constructor(thirdPartyAPI) {
        super();
        this.api = thirdPartyAPI;
    }
    
    processPayment(amount) {
        const amountInCents = Math.round(amount * 100);
        return this.api.pay(amountInCents);
    }
}

// Client code
class PaymentService {
    constructor(processor) {
        this.processor = processor;
    }
    
    handlePayment(amount) {
        return this.processor.processPayment(amount);
    }
}

// Example usage
console.log('=== Adapter Pattern ===\n');

const legacySystem = new LegacyPaymentSystem();
const legacyAdapter = new LegacyPaymentAdapter(legacySystem);
const paymentService1 = new PaymentService(legacyAdapter);
console.log(paymentService1.handlePayment(99.99));

const thirdPartyAPI = new ThirdPartyPaymentAPI();
const thirdPartyAdapter = new ThirdPartyPaymentAdapter(thirdPartyAPI);
const paymentService2 = new PaymentService(thirdPartyAdapter);
console.log(paymentService2.handlePayment(99.99));

module.exports = { PaymentProcessor, LegacyPaymentAdapter, ThirdPartyPaymentAdapter, PaymentService };

