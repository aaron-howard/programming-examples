"""
Aggregator Pattern - Python

Combines multiple messages/requests into a single response,
reducing network overhead and improving performance.
"""

import threading
import time


class MessageAggregator:
    def __init__(self, timeout=1.0, max_size=10):
        self.timeout = timeout
        self.max_size = max_size
        self.buffer = []
        self.timer = None
        self.lock = threading.Lock()
    
    def add(self, message, callback):
        with self.lock:
            self.buffer.append({'message': message, 'callback': callback})
            
            if len(self.buffer) >= self.max_size:
                self.flush()
            elif not self.timer:
                self.timer = threading.Timer(self.timeout, self.flush)
                self.timer.start()
    
    def flush(self):
        with self.lock:
            if self.timer:
                self.timer.cancel()
                self.timer = None
            
            if self.buffer:
                batch = self.buffer[:]
                self.buffer.clear()
                
                aggregated = self.aggregate([item['message'] for item in batch])
                
                for item in batch:
                    item['callback'](aggregated)
    
    def aggregate(self, messages):
        return {
            'count': len(messages),
            'messages': messages,
            'timestamp': time.time()
        }


# Example usage
if __name__ == "__main__":
    print("=== Aggregator Pattern ===\n")
    
    aggregator = MessageAggregator(0.5, 5)
    
    for i in range(1, 8):
        aggregator.add(
            {'id': i, 'data': f'Message {i}'},
            lambda aggregated: print(f"Received aggregated batch: {aggregated['count']} messages")
        )
    
    time.sleep(1)
    print("Done")

