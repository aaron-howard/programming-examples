/**
 * Aggregator Pattern - JavaScript
 * 
 * Combines multiple messages/requests into a single response,
 * reducing network overhead and improving performance.
 */

class MessageAggregator {
    constructor(timeout = 1000, maxSize = 10) {
        this.timeout = timeout;
        this.maxSize = maxSize;
        this.buffer = [];
        this.timer = null;
    }
    
    add(message, callback) {
        this.buffer.push({ message, callback });
        
        if (this.buffer.length >= this.maxSize) {
            this.flush();
        } else if (!this.timer) {
            this.timer = setTimeout(() => this.flush(), this.timeout);
        }
    }
    
    flush() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        
        if (this.buffer.length > 0) {
            const batch = this.buffer.splice(0);
            const aggregated = this.aggregate(batch.map(item => item.message));
            
            batch.forEach(item => {
                item.callback(aggregated);
            });
        }
    }
    
    aggregate(messages) {
        return {
            count: messages.length,
            messages: messages,
            timestamp: new Date()
        };
    }
}

// Example usage
console.log('=== Aggregator Pattern ===\n');

const aggregator = new MessageAggregator(500, 5);

for (let i = 1; i <= 7; i++) {
    aggregator.add(
        { id: i, data: `Message ${i}` },
        (aggregated) => {
            console.log(`Received aggregated batch: ${aggregated.count} messages`);
        }
    );
}

// Wait for flush
setTimeout(() => {
    console.log('Done');
}, 1000);

module.exports = { MessageAggregator };

