"""
Active Object Pattern - Python

Encapsulates method execution in its own thread of control,
decoupling method invocation from method execution.
"""

import threading
import queue
import time


class ActiveObject:
    def __init__(self):
        self.queue = queue.Queue()
        self.running = True
        self.thread = threading.Thread(target=self._run)
        self.thread.start()
    
    def _run(self):
        while self.running:
            try:
                method, args, kwargs, future = self.queue.get(timeout=0.1)
                try:
                    result = method(*args, **kwargs)
                    future.set_result(result)
                except Exception as e:
                    future.set_exception(e)
            except queue.Empty:
                continue
    
    def execute(self, method, *args, **kwargs):
        future = Future()
        self.queue.put((method, args, kwargs, future))
        return future
    
    def add(self, a, b):
        time.sleep(0.1)
        return a + b
    
    def multiply(self, a, b):
        time.sleep(0.1)
        return a * b
    
    def stop(self):
        self.running = False
        self.thread.join()


class Future:
    def __init__(self):
        self._result = None
        self._exception = None
        self._condition = threading.Condition()
        self._done = False
    
    def set_result(self, result):
        with self._condition:
            self._result = result
            self._done = True
            self._condition.notify_all()
    
    def set_exception(self, exception):
        with self._condition:
            self._exception = exception
            self._done = True
            self._condition.notify_all()
    
    def result(self):
        with self._condition:
            while not self._done:
                self._condition.wait()
            if self._exception:
                raise self._exception
            return self._result


# Example usage
if __name__ == "__main__":
    print("=== Active Object Pattern ===\n")
    
    active_object = ActiveObject()
    
    future1 = active_object.execute(active_object.add, 5, 3)
    future2 = active_object.execute(active_object.multiply, 4, 7)
    
    print("Add result:", future1.result())
    print("Multiply result:", future2.result())
    
    active_object.stop()

