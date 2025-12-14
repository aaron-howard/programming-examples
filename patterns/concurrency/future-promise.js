/**
 * Future/Promise Pattern - JavaScript
 * 
 * Represents a value that will be available in the future,
 * allowing asynchronous operations without blocking.
 */

class Future {
    constructor(executor) {
        this.state = 'pending';
        this.value = null;
        this.error = null;
        this.callbacks = [];
        
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.callbacks.forEach(cb => cb.onFulfilled(value));
            }
        };
        
        const reject = (error) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.error = error;
                this.callbacks.forEach(cb => cb.onRejected(error));
            }
        };
        
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    
    then(onFulfilled, onRejected) {
        return new Future((resolve, reject) => {
            if (this.state === 'fulfilled') {
                try {
                    const result = onFulfilled ? onFulfilled(this.value) : this.value;
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else if (this.state === 'rejected') {
                if (onRejected) {
                    try {
                        const result = onRejected(this.error);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(this.error);
                }
            } else {
                this.callbacks.push({
                    onFulfilled: (value) => {
                        try {
                            const result = onFulfilled ? onFulfilled(value) : value;
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    onRejected: (error) => {
                        if (onRejected) {
                            try {
                                const result = onRejected(error);
                                resolve(result);
                            } catch (err) {
                                reject(err);
                            }
                        } else {
                            reject(error);
                        }
                    }
                });
            }
        });
    }
    
    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

// Example usage
console.log('=== Future/Promise Pattern ===\n');

const future = new Future((resolve, reject) => {
    setTimeout(() => {
        resolve('Data loaded');
    }, 100);
});

future
    .then(value => {
        console.log('Step 1:', value);
        return value.toUpperCase();
    })
    .then(value => {
        console.log('Step 2:', value);
        return value + '!';
    })
    .then(value => {
        console.log('Final:', value);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Using native Promise (for comparison)
Promise.resolve('Native Promise')
    .then(value => console.log('Native:', value));

module.exports = { Future };

