/**
 * Test Doubles Pattern - JavaScript
 * 
 * Replace dependencies with test doubles (mocks, stubs, fakes):
 * - Mock: Records interactions and verifies behavior
 * - Stub: Returns predefined responses
 * - Fake: Working implementation with shortcuts
 */

// System under test
class PaymentService {
    constructor(paymentGateway) {
        this.paymentGateway = paymentGateway;
    }
    
    async processPayment(amount, cardNumber) {
        if (amount <= 0) {
            throw new Error('Invalid amount');
        }
        
        const result = await this.paymentGateway.charge(cardNumber, amount);
        return result;
    }
}

// Mock
class MockPaymentGateway {
    constructor() {
        this.calls = [];
        this.shouldSucceed = true;
    }
    
    async charge(cardNumber, amount) {
        this.calls.push({ cardNumber, amount });
        
        if (this.shouldSucceed) {
            return { success: true, transactionId: '12345' };
        } else {
            throw new Error('Payment failed');
        }
    }
    
    getCalls() {
        return this.calls;
    }
    
    setShouldSucceed(value) {
        this.shouldSucceed = value;
    }
}

// Stub
class StubPaymentGateway {
    async charge(cardNumber, amount) {
        // Always returns success
        return { success: true, transactionId: 'stub-123' };
    }
}

// Fake
class FakePaymentGateway {
    constructor() {
        this.transactions = [];
    }
    
    async charge(cardNumber, amount) {
        // Fake implementation - stores in memory instead of real payment
        const transaction = {
            id: Date.now().toString(),
            cardNumber: cardNumber.slice(-4),
            amount,
            status: 'completed'
        };
        this.transactions.push(transaction);
        return { success: true, transactionId: transaction.id };
    }
    
    getTransactions() {
        return this.transactions;
    }
}

// Example usage
console.log('=== Test Doubles Pattern ===\n');

// Using Mock
const mockGateway = new MockPaymentGateway();
const paymentService1 = new PaymentService(mockGateway);

(async () => {
    await paymentService1.processPayment(100, '1234567890123456');
    console.log('Mock calls:', mockGateway.getCalls());
    
    // Using Stub
    const stubGateway = new StubPaymentGateway();
    const paymentService2 = new PaymentService(stubGateway);
    const result = await paymentService2.processPayment(50, '1234567890123456');
    console.log('Stub result:', result);
    
    // Using Fake
    const fakeGateway = new FakePaymentGateway();
    const paymentService3 = new PaymentService(fakeGateway);
    await paymentService3.processPayment(75, '1234567890123456');
    console.log('Fake transactions:', fakeGateway.getTransactions());
})();

module.exports = { PaymentService, MockPaymentGateway, StubPaymentGateway, FakePaymentGateway };

