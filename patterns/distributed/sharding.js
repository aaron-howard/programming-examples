/**
 * Sharding Pattern - JavaScript
 * 
 * Partitions data across multiple databases/servers to improve
 * performance and scalability.
 */

class Shard {
    constructor(id) {
        this.id = id;
        this.data = new Map();
    }
    
    get(key) {
        return this.data.get(key);
    }
    
    set(key, value) {
        this.data.set(key, value);
    }
    
    delete(key) {
        return this.data.delete(key);
    }
}

class ShardManager {
    constructor(numShards = 4) {
        this.shards = Array.from({ length: numShards }, (_, i) => new Shard(i));
    }
    
    getShard(key) {
        // Simple hash-based sharding
        const hash = this.hash(key);
        return this.shards[hash % this.shards.length];
    }
    
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
    
    set(key, value) {
        const shard = this.getShard(key);
        shard.set(key, value);
        console.log(`Stored ${key} in shard ${shard.id}`);
    }
    
    get(key) {
        const shard = this.getShard(key);
        return shard.get(key);
    }
}

// Example usage
console.log('=== Sharding Pattern ===\n');

const shardManager = new ShardManager(4);

shardManager.set('user1', { name: 'Alice', age: 30 });
shardManager.set('user2', { name: 'Bob', age: 25 });
shardManager.set('user3', { name: 'Charlie', age: 35 });

console.log('Retrieved:', shardManager.get('user1'));

module.exports = { Shard, ShardManager };

