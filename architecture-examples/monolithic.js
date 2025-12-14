/**
 * Monolithic Architecture - JavaScript
 * 
 * Single, unified application where all components are tightly coupled
 * and deployed together as one unit.
 */

// Monolithic Application Structure
class MonolithicApp {
    constructor() {
        this.userService = new UserService();
        this.orderService = new OrderService();
        this.paymentService = new PaymentService();
        this.database = new Database();
    }
    
    // All services share the same database connection
    initialize() {
        this.database.connect();
        console.log('Monolithic app initialized');
    }
    
    handleRequest(endpoint, data) {
        switch (endpoint) {
            case '/users':
                return this.userService.handle(data);
            case '/orders':
                return this.orderService.handle(data);
            case '/payments':
                return this.paymentService.handle(data);
            default:
                return { error: 'Not found' };
        }
    }
}

class UserService {
    constructor() {
        this.db = null; // Shared database
    }
    
    setDatabase(db) {
        this.db = db;
    }
    
    handle(data) {
        if (data.action === 'create') {
            return this.createUser(data.user);
        }
        return { error: 'Invalid action' };
    }
    
    createUser(user) {
        // Direct database access
        return { id: Date.now(), ...user, created: new Date() };
    }
}

class OrderService {
    constructor() {
        this.db = null;
    }
    
    setDatabase(db) {
        this.db = db;
    }
    
    handle(data) {
        if (data.action === 'create') {
            return this.createOrder(data.order);
        }
        return { error: 'Invalid action' };
    }
    
    createOrder(order) {
        return { id: Date.now(), ...order, status: 'pending' };
    }
}

class PaymentService {
    handle(data) {
        if (data.action === 'process') {
            return this.processPayment(data.payment);
        }
        return { error: 'Invalid action' };
    }
    
    processPayment(payment) {
        return { id: Date.now(), ...payment, status: 'completed' };
    }
}

class Database {
    connect() {
        console.log('Database connected (shared connection)');
    }
}

// Example usage
console.log('=== Monolithic Architecture ===\n');

const app = new MonolithicApp();
app.initialize();

console.log('\nHandling requests:');
console.log(app.handleRequest('/users', { action: 'create', user: { name: 'John' } }));
console.log(app.handleRequest('/orders', { action: 'create', order: { item: 'Book' } }));
console.log(app.handleRequest('/payments', { action: 'process', payment: { amount: 100 } }));

module.exports = { MonolithicApp, UserService, OrderService, PaymentService };

