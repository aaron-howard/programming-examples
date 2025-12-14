/**
 * Event-Driven Programming - JavaScript
 * 
 * Programming paradigm where the flow of the program is determined by events
 * (user actions, sensor outputs, messages, etc.)
 */

// Event Emitter pattern
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    once(event, callback) {
        const wrapper = (data) => {
            callback(data);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}

// UI Event Handler (simulated)
class Button {
    constructor(id) {
        this.id = id;
        this.clickHandlers = [];
    }
    
    onClick(handler) {
        this.clickHandlers.push(handler);
    }
    
    click() {
        console.log(`Button ${this.id} clicked!`);
        this.clickHandlers.forEach(handler => handler({
            buttonId: this.id,
            timestamp: new Date()
        }));
    }
}

// Server Event Handler (simulated)
class Server {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.connections = 0;
    }
    
    onConnection(handler) {
        this.eventEmitter.on('connection', handler);
    }
    
    onRequest(handler) {
        this.eventEmitter.on('request', handler);
    }
    
    onError(handler) {
        this.eventEmitter.on('error', handler);
    }
    
    handleConnection(clientId) {
        this.connections++;
        this.eventEmitter.emit('connection', {
            clientId,
            connections: this.connections,
            timestamp: new Date()
        });
    }
    
    handleRequest(clientId, path) {
        this.eventEmitter.emit('request', {
            clientId,
            path,
            timestamp: new Date()
        });
    }
    
    handleError(error) {
        this.eventEmitter.emit('error', {
            error: error.message,
            timestamp: new Date()
        });
    }
}

// Timer-based events
class Timer {
    constructor(interval) {
        this.interval = interval;
        this.handlers = [];
        this.timerId = null;
    }
    
    onTick(handler) {
        this.handlers.push(handler);
    }
    
    start() {
        this.timerId = setInterval(() => {
            this.handlers.forEach(handler => handler({
                timestamp: new Date(),
                tick: Date.now()
            }));
        }, this.interval);
    }
    
    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
}

// Promise-based async events
class AsyncEventProcessor {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    async addEvent(event) {
        this.queue.push(event);
        if (!this.processing) {
            this.processing = true;
            await this.processQueue();
        }
    }
    
    async processQueue() {
        while (this.queue.length > 0) {
            const event = this.queue.shift();
            await this.processEvent(event);
        }
        this.processing = false;
    }
    
    async processEvent(event) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Processed event: ${event.type}`, event.data);
                resolve();
            }, 100);
        });
    }
}

// Example usage
console.log('=== Event-Driven Programming ===\n');

// UI Events
console.log('UI Events:');
const button = new Button('submit-btn');
button.onClick((event) => {
    console.log('Button click handler:', event);
});
button.click();

// Server Events
console.log('\nServer Events:');
const server = new Server();
server.onConnection((event) => {
    console.log(`New connection from ${event.clientId}. Total: ${event.connections}`);
});
server.onRequest((event) => {
    console.log(`Request from ${event.clientId}: ${event.path}`);
});
server.onError((event) => {
    console.log(`Error occurred: ${event.error}`);
});

server.handleConnection('client-1');
server.handleConnection('client-2');
server.handleRequest('client-1', '/api/users');
server.handleError(new Error('Database connection failed'));

// Timer Events
console.log('\nTimer Events:');
const timer = new Timer(1000);
let tickCount = 0;
timer.onTick((event) => {
    tickCount++;
    console.log(`Tick ${tickCount}:`, event.timestamp.toISOString());
    if (tickCount >= 3) {
        timer.stop();
        console.log('Timer stopped');
    }
});
timer.start();

// Async Event Processing
setTimeout(async () => {
    console.log('\nAsync Event Processing:');
    const processor = new AsyncEventProcessor();
    await processor.addEvent({ type: 'user-login', data: { userId: 123 } });
    await processor.addEvent({ type: 'data-update', data: { recordId: 456 } });
    await processor.addEvent({ type: 'notification', data: { message: 'Hello' } });
}, 4000);

module.exports = { EventEmitter, Button, Server, Timer, AsyncEventProcessor };

