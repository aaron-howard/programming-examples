/**
 * Singleton Pattern - JavaScript
 * 
 * Ensures a class has only one instance and provides a global point of access to it.
 * 
 * Use cases:
 * - Database connections
 * - Logger instances
 * - Configuration managers
 * - Cache managers
 */

class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        
        this.data = 'Singleton instance data';
        Singleton.instance = this;
    }
    
    getData() {
        return this.data;
    }
    
    setData(data) {
        this.data = data;
    }
}

// Alternative: Using a function
function createSingleton() {
    let instance = null;
    
    return function() {
        if (!instance) {
            instance = {
                data: 'Singleton instance data',
                getData() {
                    return this.data;
                },
                setData(data) {
                    this.data = data;
                }
            };
        }
        return instance;
    };
}

// Example usage
console.log('=== Singleton Pattern ===\n');

const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log('Are both instances the same?', singleton1 === singleton2); // true
console.log('Instance 1 data:', singleton1.getData());
singleton2.setData('Modified data');
console.log('Instance 1 data after modifying instance 2:', singleton1.getData());

// Function-based singleton
const getSingleton = createSingleton();
const instance1 = getSingleton();
const instance2 = getSingleton();
console.log('Function-based singleton:', instance1 === instance2); // true

module.exports = { Singleton, createSingleton };

