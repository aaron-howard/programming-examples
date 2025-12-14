/**
 * Active Object Pattern - JavaScript
 * 
 * Encapsulates method execution in its own thread of control,
 * decoupling method invocation from method execution.
 */

class ActiveObject {
    constructor() {
        this.queue = [];
        this.running = false;
        this.start();
    }
    
    start() {
        this.running = true;
        this.processQueue();
    }
    
    async processQueue() {
        while (this.running) {
            if (this.queue.length > 0) {
                const { method, args, resolve, reject } = this.queue.shift();
                try {
                    const result = await method.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
    }
    
    async execute(method, ...args) {
        return new Promise((resolve, reject) => {
            this.queue.push({ method, args, resolve, reject });
        });
    }
    
    async add(a, b) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return a + b;
    }
    
    async multiply(a, b) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return a * b;
    }
    
    stop() {
        this.running = false;
    }
}

// Example usage
console.log('=== Active Object Pattern ===\n');

const activeObject = new ActiveObject();

(async () => {
    const result1 = await activeObject.execute(activeObject.add, 5, 3);
    console.log('Add result:', result1);
    
    const result2 = await activeObject.execute(activeObject.multiply, 4, 7);
    console.log('Multiply result:', result2);
    
    activeObject.stop();
})();

module.exports = { ActiveObject };

