/**
 * Event-Driven Architecture Pattern - JavaScript
 * 
 * Architecture where components communicate through events.
 * Decouples producers and consumers of events.
 */

// Event Bus
class EventBus {
    constructor() {
        this.listeners = {};
    }
    
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}

// Event Producers
class OrderService {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.orders = [];
    }
    
    createOrder(orderData) {
        const order = {
            id: Date.now(),
            ...orderData,
            status: 'created'
        };
        this.orders.push(order);
        
        // Emit event
        this.eventBus.emit('order.created', order);
        return order;
    }
    
    completeOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = 'completed';
            this.eventBus.emit('order.completed', order);
        }
    }
}

// Event Consumers
class EmailService {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.setupListeners();
    }
    
    setupListeners() {
        this.eventBus.on('order.created', (order) => {
            this.sendOrderConfirmation(order);
        });
        
        this.eventBus.on('order.completed', (order) => {
            this.sendOrderCompletion(order);
        });
    }
    
    sendOrderConfirmation(order) {
        console.log(`Email: Order ${order.id} confirmation sent to ${order.customerEmail}`);
    }
    
    sendOrderCompletion(order) {
        console.log(`Email: Order ${order.id} completion notification sent to ${order.customerEmail}`);
    }
}

class InventoryService {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.inventory = { 'item1': 100, 'item2': 50 };
        this.setupListeners();
    }
    
    setupListeners() {
        this.eventBus.on('order.created', (order) => {
            this.reserveItems(order.items);
        });
    }
    
    reserveItems(items) {
        items.forEach(item => {
            if (this.inventory[item.id]) {
                this.inventory[item.id] -= item.quantity;
                console.log(`Inventory: Reserved ${item.quantity} of ${item.id}`);
            }
        });
    }
}

// Example usage
console.log('=== Event-Driven Architecture Pattern ===\n');

const eventBus = new EventBus();
const orderService = new OrderService(eventBus);
const emailService = new EmailService(eventBus);
const inventoryService = new InventoryService(eventBus);

const order = orderService.createOrder({
    customerEmail: 'customer@example.com',
    items: [
        { id: 'item1', quantity: 2 },
        { id: 'item2', quantity: 1 }
    ]
});

console.log();
orderService.completeOrder(order.id);

module.exports = { EventBus, OrderService, EmailService, InventoryService };

