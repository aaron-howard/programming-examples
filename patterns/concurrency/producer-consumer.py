"""
Producer-Consumer Pattern - Python

Coordinates threads/processes where producers generate data and
consumers process that data, typically using a shared buffer/queue.
"""

import queue
import threading
import time


class Producer(threading.Thread):
    def __init__(self, q, name):
        super().__init__()
        self.q = q
        self.name = name
    
    def run(self):
        for i in range(5):
            item = f"Item {i+1}"
            self.q.put(item)
            print(f"{self.name} produced: {item}")
            time.sleep(0.1)


class Consumer(threading.Thread):
    def __init__(self, q, name):
        super().__init__()
        self.q = q
        self.name = name
    
    def run(self):
        while True:
            try:
                item = self.q.get(timeout=1)
                print(f"{self.name} consumed: {item}")
                self.q.task_done()
            except queue.Empty:
                break


# Example usage
if __name__ == "__main__":
    print("=== Producer-Consumer Pattern ===\n")
    
    q = queue.Queue(maxsize=5)
    
    producer = Producer(q, "Producer1")
    consumer = Consumer(q, "Consumer1")
    
    producer.start()
    consumer.start()
    
    producer.join()
    q.join()
    consumer.join()

