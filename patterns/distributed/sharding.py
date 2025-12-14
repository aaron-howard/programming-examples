"""
Sharding Pattern - Python

Partitions data across multiple databases/servers to improve
performance and scalability.
"""


class Shard:
    def __init__(self, id):
        self.id = id
        self.data = {}
    
    def get(self, key):
        return self.data.get(key)
    
    def set(self, key, value):
        self.data[key] = value
    
    def delete(self, key):
        return self.data.pop(key, None)


class ShardManager:
    def __init__(self, num_shards=4):
        self.shards = [Shard(i) for i in range(num_shards)]
    
    def get_shard(self, key):
        # Simple hash-based sharding
        hash_val = hash(key)
        return self.shards[hash_val % len(self.shards)]
    
    def set(self, key, value):
        shard = self.get_shard(key)
        shard.set(key, value)
        print(f"Stored {key} in shard {shard.id}")
    
    def get(self, key):
        shard = self.get_shard(key)
        return shard.get(key)


# Example usage
if __name__ == "__main__":
    print("=== Sharding Pattern ===\n")
    
    shard_manager = ShardManager(4)
    
    shard_manager.set('user1', {'name': 'Alice', 'age': 30})
    shard_manager.set('user2', {'name': 'Bob', 'age': 25})
    shard_manager.set('user3', {'name': 'Charlie', 'age': 35})
    
    print("Retrieved:", shard_manager.get('user1'))

