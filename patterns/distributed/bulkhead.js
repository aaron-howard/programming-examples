/**
 * Bulkhead Pattern - JavaScript
 * 
 * Isolates resources to prevent cascading failures.
 * Similar to ship bulkheads that prevent water from flooding the entire ship.
 */

class Bulkhead {
    constructor(name, maxConcurrency = 5) {
        this.name = name;
        this.maxConcurrency = maxConcurrency;
        this.activeTasks = 0;
        this.queue = [];
    }
    
    async execute(fn) {
        return new Promise((resolve, reject) => {
            if (this.activeTasks < this.maxConcurrency) {
                this.runTask(fn, resolve, reject);
            } else {
                this.queue.push({ fn, resolve, reject });
            }
        });
    }
    
    async runTask(fn, resolve, reject) {
        this.activeTasks++;
        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.activeTasks--;
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                this.runTask(next.fn, next.resolve, next.reject);
            }
        }
    }
}

// Example usage
console.log('=== Bulkhead Pattern ===\n');

const bulkhead = new Bulkhead('ServiceA', 2);

const tasks = Array.from({ length: 10 }, (_, i) => 
    bulkhead.execute(async () => {
        console.log(`Task ${i + 1} started`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Task ${i + 1} completed`);
        return `Result ${i + 1}`;
    })
);

Promise.all(tasks).then(results => {
    console.log(`All tasks completed: ${results.length} results`);
});

module.exports = { Bulkhead };

