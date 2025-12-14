/**
 * Proxy Pattern - JavaScript
 * 
 * Provides a placeholder or surrogate for another object to control access to it.
 * Acts as an intermediary between client and the real object.
 * 
 * Use cases:
 * - Lazy loading
 * - Access control
 * - Logging
 * - Caching
 * - Remote proxies
 */

// Subject interface
class Image {
    display() {
        throw new Error('Method must be implemented');
    }
}

// Real subject
class RealImage extends Image {
    constructor(filename) {
        super();
        this.filename = filename;
        this.loadFromDisk();
    }
    
    loadFromDisk() {
        console.log(`Loading ${this.filename} from disk...`);
    }
    
    display() {
        return `Displaying ${this.filename}`;
    }
}

// Proxy
class ProxyImage extends Image {
    constructor(filename) {
        super();
        this.filename = filename;
        this.realImage = null;
    }
    
    display() {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filename);
        }
        return this.realImage.display();
    }
}

// Another example: Protection Proxy
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    
    withdraw(amount) {
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
        return `Withdrew $${amount}. New balance: $${this.balance}`;
    }
    
    getBalance() {
        return this.balance;
    }
}

class BankAccountProxy {
    constructor(account, user) {
        this.account = account;
        this.user = user;
    }
    
    withdraw(amount) {
        if (this.user !== 'admin') {
            if (amount > 1000) {
                throw new Error('Non-admin users cannot withdraw more than $1000');
            }
        }
        return this.account.withdraw(amount);
    }
    
    getBalance() {
        return this.account.getBalance();
    }
}

// Example usage
console.log('=== Proxy Pattern ===\n');

// Virtual Proxy (Lazy Loading)
console.log('Virtual Proxy (Lazy Loading):');
const image1 = new ProxyImage('photo1.jpg');
const image2 = new ProxyImage('photo2.jpg');

// Image not loaded yet
console.log('Image created, but not loaded');

// Now load and display
console.log(image1.display());
console.log(image2.display());

console.log('\nProtection Proxy:');
const account = new BankAccount(5000);
const userProxy = new BankAccountProxy(account, 'user');
const adminProxy = new BankAccountProxy(account, 'admin');

console.log('User balance:', userProxy.getBalance());
console.log(userProxy.withdraw(500));
try {
    console.log(userProxy.withdraw(2000)); // Should fail
} catch (e) {
    console.log('Error:', e.message);
}

console.log('Admin can withdraw any amount:');
console.log(adminProxy.withdraw(2000));

module.exports = { Image, RealImage, ProxyImage, BankAccount, BankAccountProxy };

