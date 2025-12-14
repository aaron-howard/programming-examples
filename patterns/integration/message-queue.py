"""
Message Queue Pattern - Python

Asynchronous communication pattern where messages are stored in a queue
and processed by consumers.
"""

import queue
import threading
import time


class MessageQueue:
    def __init__(self):
        self.queue = queue.Queue()
        self.consumers = []
        self.running = True
    
    def publish(self, message):
        message_with_meta = {
            **message,
            'id': int(time.time()),
            'timestamp': time.time()
        }
        self.queue.put(message_with_meta)
    
    def subscribe(self, consumer):
        self.consumers.append(consumer)
        threading.Thread(target=self._consume, daemon=True).start()
    
    def _consume(self):
        while self.running:
            try:
                message = self.queue.get(timeout=1)
                for consumer in self.consumers:
                    consumer(message)
                self.queue.task_done()
            except queue.Empty:
                continue
    
    def get_queue_length(self):
        return self.queue.qsize()
    
    def stop(self):
        self.running = False


# Example usage
if __name__ == "__main__":
    print("=== Message Queue Pattern ===\n")
    
    mq = MessageQueue()
    
    # Consumer
    def consumer1(message):
        print(f"Consumer 1 processed: {message['type']} - {message['data']}")
    
    def consumer2(message):
        print(f"Consumer 2 processed: {message['type']} - {message['data']}")
    
    mq.subscribe(consumer1)
    mq.subscribe(consumer2)
    
    # Producers
    mq.publish({'type': 'order', 'data': 'Order #123'})
    mq.publish({'type': 'payment', 'data': 'Payment #456'})
    mq.publish({'type': 'notification', 'data': 'Email sent'})
    
    time.sleep(1)
    mq.stop()

