/**
 * Thread Pool Pattern - JavaScript
 * 
 * Maintains a pool of worker threads to execute tasks concurrently,
 * avoiding the overhead of creating/destroying threads for each task.
 */

class ThreadPool {
    constructor(size = 4) {
        this.size = size;
        this.queue = [];
        this.workers = [];
        this.running = false;
    }
    
    start() {
        this.running = true;
        for (let i = 0; i < this.size; i++) {
            this.workers.push(this.createWorker(i));
        }
    }
    
    createWorker(id) {
        return {
            id,
            busy: false,
            async execute(task) {
                this.busy = true;
                console.log(`Worker ${id} executing: ${task.name}`);
                await task.execute();
                console.log(`Worker ${id} completed: ${task.name}`);
                this.busy = false;
            }
        };
    }
    
    async submit(task) {
        return new Promise((resolve) => {
            this.queue.push({ task, resolve });
            this.processQueue();
        });
    }
    
    async processQueue() {
        while (this.queue.length > 0) {
            const worker = this.workers.find(w => !w.busy);
            if (!worker) {
                await new Promise(resolve => setTimeout(resolve, 10));
                continue;
            }
            
            const { task, resolve } = this.queue.shift();
            await worker.execute(task);
            resolve();
        }
    }
    
    shutdown() {
        this.running = false;
    }
}

class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }
    
    async execute() {
        return new Promise(resolve => setTimeout(resolve, this.duration));
    }
}

// Example usage
console.log('=== Thread Pool Pattern ===\n');

const pool = new ThreadPool(3);
pool.start();

const tasks = [
    new Task('Task 1', 100),
    new Task('Task 2', 200),
    new Task('Task 3', 150),
    new Task('Task 4', 100),
    new Task('Task 5', 50)
];

Promise.all(tasks.map(task => pool.submit(task))).then(() => {
    console.log('All tasks completed');
    pool.shutdown();
});

module.exports = { ThreadPool, Task };

