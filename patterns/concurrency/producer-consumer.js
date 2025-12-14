/**
 * Producer-Consumer Pattern - JavaScript
 * 
 * Coordinates threads/processes where producers generate data and
 * consumers process that data, typically using a shared buffer/queue.
 */

class Queue {
    constructor(maxSize = 10) {
        this.items = [];
        this.maxSize = maxSize;
    }
    
    enqueue(item) {
        if (this.items.length >= this.maxSize) {
            throw new Error('Queue is full');
        }
        this.items.push(item);
    }
    
    dequeue() {
        if (this.items.length === 0) {
            return null;
        }
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    isFull() {
        return this.items.length >= this.maxSize;
    }
}

class Producer {
    constructor(queue, name) {
        this.queue = queue;
        this.name = name;
    }
    
    produce(item) {
        if (!this.queue.isFull()) {
            this.queue.enqueue(item);
            console.log(`${this.name} produced: ${item}`);
            return true;
        }
        console.log(`${this.name} - Queue full, waiting...`);
        return false;
    }
}

class Consumer {
    constructor(queue, name) {
        this.queue = queue;
        this.name = name;
    }
    
    consume() {
        if (!this.queue.isEmpty()) {
            const item = this.queue.dequeue();
            console.log(`${this.name} consumed: ${item}`);
            return item;
        }
        console.log(`${this.name} - Queue empty, waiting...`);
        return null;
    }
}

// Example usage
console.log('=== Producer-Consumer Pattern ===\n');

const queue = new Queue(5);
const producer = new Producer(queue, 'Producer1');
const consumer = new Consumer(queue, 'Consumer1');

// Simulate production and consumption
producer.produce('Item 1');
producer.produce('Item 2');
producer.produce('Item 3');

consumer.consume();
consumer.consume();
producer.produce('Item 4');
consumer.consume();

module.exports = { Queue, Producer, Consumer };

