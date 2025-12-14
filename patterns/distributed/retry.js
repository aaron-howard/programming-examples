/**
 * Retry Pattern - JavaScript
 * 
 * Automatically retries failed operations with exponential backoff
 * or other strategies.
 */

class RetryPolicy {
    constructor(maxAttempts = 3, initialDelay = 1000, backoffMultiplier = 2) {
        this.maxAttempts = maxAttempts;
        this.initialDelay = initialDelay;
        this.backoffMultiplier = backoffMultiplier;
    }
    
    async execute(fn) {
        let lastError;
        
        for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                if (attempt < this.maxAttempts) {
                    const delay = this.initialDelay * Math.pow(this.backoffMultiplier, attempt - 1);
                    console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        throw lastError;
    }
}

// Example usage
console.log('=== Retry Pattern ===\n');

const retry = new RetryPolicy(3, 1000, 2);

let attemptCount = 0;
const unreliableOperation = async () => {
    attemptCount++;
    if (attemptCount < 3) {
        throw new Error('Operation failed');
    }
    return 'Operation succeeded';
};

retry.execute(unreliableOperation)
    .then(result => console.log('Result:', result))
    .catch(error => console.error('Final error:', error.message));

module.exports = { RetryPolicy };

