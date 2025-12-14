/**
 * Message Queue Pattern - JavaScript
 * 
 * Asynchronous communication pattern where messages are stored in a queue
 * and processed by consumers.
 */

class MessageQueue {
    constructor() {
        this.queue = [];
        this.consumers = [];
    }
    
    publish(message) {
        this.queue.push({
            ...message,
            id: Date.now(),
            timestamp: new Date()
        });
        this.notifyConsumers();
    }
    
    subscribe(consumer) {
        this.consumers.push(consumer);
    }
    
    notifyConsumers() {
        while (this.queue.length > 0 && this.consumers.length > 0) {
            const message = this.queue.shift();
            const consumer = this.consumers[0];
            consumer(message);
        }
    }
    
    getQueueLength() {
        return this.queue.length;
    }
}

// Example usage
console.log('=== Message Queue Pattern ===\n');

const queue = new MessageQueue();

// Consumer
queue.subscribe((message) => {
    console.log(`Consumer 1 processed: ${message.type} - ${message.data}`);
});

queue.subscribe((message) => {
    console.log(`Consumer 2 processed: ${message.type} - ${message.data}`);
});

// Producers
queue.publish({ type: 'order', data: 'Order #123' });
queue.publish({ type: 'payment', data: 'Payment #456' });
queue.publish({ type: 'notification', data: 'Email sent' });

module.exports = { MessageQueue };

