/**
 * Circuit Breaker Pattern - JavaScript
 * 
 * Prevents cascading failures by stopping requests to a failing service
 * and allowing it time to recover.
 */

class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.failureCount = 0;
        this.threshold = threshold;
        this.timeout = timeout;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = Date.now();
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
            }
            this.state = 'HALF_OPEN';
        }
        
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
    
    getState() {
        return this.state;
    }
}

// Example usage
console.log('=== Circuit Breaker Pattern ===\n');

const breaker = new CircuitBreaker(3, 5000);

async function unreliableService() {
    if (Math.random() > 0.3) {
        throw new Error('Service unavailable');
    }
    return 'Success';
}

(async () => {
    for (let i = 0; i < 10; i++) {
        try {
            const result = await breaker.execute(unreliableService);
            console.log(`Attempt ${i + 1}: ${result} (State: ${breaker.getState()})`);
        } catch (error) {
            console.log(`Attempt ${i + 1}: ${error.message} (State: ${breaker.getState()})`);
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
})();

module.exports = { CircuitBreaker };

