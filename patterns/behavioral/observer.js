/**
 * Observer Pattern - JavaScript
 * 
 * Defines a one-to-many dependency between objects so that when one object
 * changes state, all its dependents are notified and updated automatically.
 * 
 * Use cases:
 * - Event handling systems
 * - Model-View architectures
 * - Real-time data updates
 * - Pub/Sub systems
 */

// Subject (Observable)
class Subject {
    constructor() {
        this.observers = [];
    }
    
    attach(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

// Observer interface
class Observer {
    update(data) {
        throw new Error('Method must be implemented');
    }
}

// Concrete observers
class EmailObserver extends Observer {
    constructor(email) {
        super();
        this.email = email;
    }
    
    update(data) {
        console.log(`Email to ${this.email}: ${data}`);
    }
}

class SMSObserver extends Observer {
    constructor(phone) {
        super();
        this.phone = phone;
    }
    
    update(data) {
        console.log(`SMS to ${this.phone}: ${data}`);
    }
}

class PushObserver extends Observer {
    constructor(deviceId) {
        super();
        this.deviceId = deviceId;
    }
    
    update(data) {
        console.log(`Push notification to device ${this.deviceId}: ${data}`);
    }
}

// Concrete subject
class NewsAgency extends Subject {
    constructor(name) {
        super();
        this.name = name;
        this.news = null;
    }
    
    setNews(news) {
        this.news = news;
        this.notify(news);
    }
}

// Example usage
console.log('=== Observer Pattern ===\n');

const newsAgency = new NewsAgency('Tech News');

const emailObserver = new EmailObserver('user@example.com');
const smsObserver = new SMSObserver('+1234567890');
const pushObserver = new PushObserver('device-123');

newsAgency.attach(emailObserver);
newsAgency.attach(smsObserver);
newsAgency.attach(pushObserver);

console.log('Breaking news:');
newsAgency.setNews('New JavaScript framework released!');

console.log('\nRemoving SMS observer:');
newsAgency.detach(smsObserver);

console.log('\nAnother news update:');
newsAgency.setNews('AI breakthrough announced!');

module.exports = { Subject, Observer, EmailObserver, SMSObserver, PushObserver, NewsAgency };

