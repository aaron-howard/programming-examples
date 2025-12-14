"""
Read-Write Lock Pattern - Python

Allows multiple readers or a single writer to access a resource,
improving concurrency for read-heavy workloads.
"""

import threading
import time


class ReadWriteLock:
    def __init__(self):
        self._read_ready = threading.Condition(threading.RLock())
        self._readers = 0
    
    def acquire_read(self):
        self._read_ready.acquire()
        try:
            self._readers += 1
        finally:
            self._read_ready.release()
    
    def release_read(self):
        self._read_ready.acquire()
        try:
            self._readers -= 1
            if self._readers == 0:
                self._read_ready.notifyAll()
        finally:
            self._read_ready.release()
    
    def acquire_write(self):
        self._read_ready.acquire()
        while self._readers > 0:
            self._read_ready.wait()
    
    def release_write(self):
        self._read_ready.release()


class SharedResource:
    def __init__(self):
        self.data = 0
        self.lock = ReadWriteLock()
    
    def read(self):
        self.lock.acquire_read()
        try:
            return self.data
        finally:
            self.lock.release_read()
    
    def write(self, value):
        self.lock.acquire_write()
        try:
            self.data = value
        finally:
            self.lock.release_write()


# Example usage
if __name__ == "__main__":
    print("=== Read-Write Lock Pattern ===\n")
    
    resource = SharedResource()
    
    def reader(id):
        value = resource.read()
        print(f"Reader {id} read: {value}")
    
    def writer(id, value):
        resource.write(value)
        print(f"Writer {id} wrote: {value}")
    
    threads = [
        threading.Thread(target=reader, args=(1,)),
        threading.Thread(target=reader, args=(2,)),
        threading.Thread(target=writer, args=(1, 10)),
        threading.Thread(target=reader, args=(3,)),
        threading.Thread(target=writer, args=(2, 20)),
        threading.Thread(target=reader, args=(4,))
    ]
    
    for t in threads:
        t.start()
    
    for t in threads:
        t.join()

