/**
 * Publish-Subscribe Pattern - JavaScript
 * 
 * Messaging pattern where publishers send messages to topics/channels
 * and subscribers receive messages from topics they're interested in.
 */

class PubSub {
    constructor() {
        this.subscribers = {};
    }
    
    subscribe(topic, callback) {
        if (!this.subscribers[topic]) {
            this.subscribers[topic] = [];
        }
        this.subscribers[topic].push(callback);
        
        // Return unsubscribe function
        return () => {
            this.subscribers[topic] = this.subscribers[topic].filter(cb => cb !== callback);
        };
    }
    
    publish(topic, data) {
        if (this.subscribers[topic]) {
            this.subscribers[topic].forEach(callback => callback(data));
        }
    }
    
    unsubscribe(topic, callback) {
        if (this.subscribers[topic]) {
            this.subscribers[topic] = this.subscribers[topic].filter(cb => cb !== callback);
        }
    }
}

// Example usage
console.log('=== Publish-Subscribe Pattern ===\n');

const pubsub = new PubSub();

// Subscribers
const unsubscribe1 = pubsub.subscribe('news', (data) => {
    console.log(`Subscriber 1 received news: ${data}`);
});

pubsub.subscribe('news', (data) => {
    console.log(`Subscriber 2 received news: ${data}`);
});

pubsub.subscribe('sports', (data) => {
    console.log(`Subscriber received sports: ${data}`);
});

// Publishers
pubsub.publish('news', 'Breaking: New technology announced');
pubsub.publish('sports', 'Game result: Team A wins');

// Unsubscribe
unsubscribe1();
pubsub.publish('news', 'This message won\'t reach subscriber 1');

module.exports = { PubSub };

