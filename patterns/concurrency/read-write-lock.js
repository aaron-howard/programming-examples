/**
 * Read-Write Lock Pattern - JavaScript
 * 
 * Allows multiple readers or a single writer to access a resource,
 * improving concurrency for read-heavy workloads.
 */

class ReadWriteLock {
    constructor() {
        this.readers = 0;
        this.writers = 0;
        this.waitingWriters = 0;
        this.lock = false;
    }
    
    async acquireReadLock() {
        while (this.writers > 0 || this.waitingWriters > 0) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.readers++;
    }
    
    releaseReadLock() {
        this.readers--;
    }
    
    async acquireWriteLock() {
        this.waitingWriters++;
        while (this.readers > 0 || this.writers > 0) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.waitingWriters--;
        this.writers++;
    }
    
    releaseWriteLock() {
        this.writers--;
    }
}

class SharedResource {
    constructor() {
        this.data = 0;
        this.lock = new ReadWriteLock();
    }
    
    async read() {
        await this.lock.acquireReadLock();
        const value = this.data;
        this.lock.releaseReadLock();
        return value;
    }
    
    async write(value) {
        await this.lock.acquireWriteLock();
        this.data = value;
        this.lock.releaseWriteLock();
    }
}

// Example usage
console.log('=== Read-Write Lock Pattern ===\n');

const resource = new SharedResource();

async function reader(id) {
    const value = await resource.read();
    console.log(`Reader ${id} read: ${value}`);
}

async function writer(id, value) {
    await resource.write(value);
    console.log(`Writer ${id} wrote: ${value}`);
}

(async () => {
    await Promise.all([
        reader(1),
        reader(2),
        writer(1, 10),
        reader(3),
        writer(2, 20),
        reader(4)
    ]);
})();

module.exports = { ReadWriteLock, SharedResource };

