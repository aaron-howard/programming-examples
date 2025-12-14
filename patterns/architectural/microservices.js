/**
 * Microservices Pattern - JavaScript
 * 
 * Architecture where applications are built as a collection of small,
 * independent services that communicate over well-defined APIs.
 */

// Service 1: User Service
class UserService {
    constructor() {
        this.users = [];
    }
    
    createUser(userData) {
        const user = {
            id: Date.now(),
            ...userData,
            createdAt: new Date()
        };
        this.users.push(user);
        return user;
    }
    
    getUser(id) {
        return this.users.find(u => u.id === id);
    }
}

// Service 2: Order Service
class OrderService {
    constructor(userService) {
        this.userService = userService;
        this.orders = [];
    }
    
    createOrder(userId, items) {
        const user = this.userService.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        const order = {
            id: Date.now(),
            userId,
            items,
            total: items.reduce((sum, item) => sum + item.price, 0),
            createdAt: new Date()
        };
        this.orders.push(order);
        return order;
    }
    
    getOrder(id) {
        return this.orders.find(o => o.id === id);
    }
}

// API Gateway (simplified)
class APIGateway {
    constructor(userService, orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }
    
    handleRequest(method, path, data) {
        if (path.startsWith('/users')) {
            return this.handleUserRequest(method, path, data);
        } else if (path.startsWith('/orders')) {
            return this.handleOrderRequest(method, path, data);
        }
        return { error: 'Not found' };
    }
    
    handleUserRequest(method, path, data) {
        if (method === 'POST' && path === '/users') {
            return this.userService.createUser(data);
        } else if (method === 'GET' && path.startsWith('/users/')) {
            const id = parseInt(path.split('/')[2]);
            return this.userService.getUser(id);
        }
        return { error: 'Not found' };
    }
    
    handleOrderRequest(method, path, data) {
        if (method === 'POST' && path === '/orders') {
            return this.orderService.createOrder(data.userId, data.items);
        } else if (method === 'GET' && path.startsWith('/orders/')) {
            const id = parseInt(path.split('/')[2]);
            return this.orderService.getOrder(id);
        }
        return { error: 'Not found' };
    }
}

// Example usage
console.log('=== Microservices Pattern ===\n');

const userService = new UserService();
const orderService = new OrderService(userService);
const gateway = new APIGateway(userService, orderService);

// Create user via gateway
const user = gateway.handleRequest('POST', '/users', {
    name: 'John Doe',
    email: 'john@example.com'
});
console.log('Created user:', user);

// Create order via gateway
const order = gateway.handleRequest('POST', '/orders', {
    userId: user.id,
    items: [
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 }
    ]
});
console.log('Created order:', order);

module.exports = { UserService, OrderService, APIGateway };

