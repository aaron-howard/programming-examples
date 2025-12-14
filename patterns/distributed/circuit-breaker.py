"""
Circuit Breaker Pattern - Python

Prevents cascading failures by stopping requests to a failing service
and allowing it time to recover.
"""

import time
from enum import Enum


class State(Enum):
    CLOSED = "CLOSED"
    OPEN = "OPEN"
    HALF_OPEN = "HALF_OPEN"


class CircuitBreaker:
    def __init__(self, threshold=5, timeout=60):
        self.failure_count = 0
        self.threshold = threshold
        self.timeout = timeout
        self.state = State.CLOSED
        self.next_attempt = time.time()
    
    async def execute(self, fn):
        if self.state == State.OPEN:
            if time.time() < self.next_attempt:
                raise Exception("Circuit breaker is OPEN")
            self.state = State.HALF_OPEN
        
        try:
            result = await fn()
            self.on_success()
            return result
        except Exception as error:
            self.on_failure()
            raise error
    
    def on_success(self):
        self.failure_count = 0
        self.state = State.CLOSED
    
    def on_failure(self):
        self.failure_count += 1
        if self.failure_count >= self.threshold:
            self.state = State.OPEN
            self.next_attempt = time.time() + self.timeout
    
    def get_state(self):
        return self.state.value


# Example usage
if __name__ == "__main__":
    import asyncio
    import random
    
    async def unreliable_service():
        if random.random() > 0.3:
            raise Exception("Service unavailable")
        return "Success"
    
    async def main():
        breaker = CircuitBreaker(3, 5)
        
        for i in range(10):
            try:
                result = await breaker.execute(unreliable_service)
                print(f"Attempt {i + 1}: {result} (State: {breaker.get_state()})")
            except Exception as e:
                print(f"Attempt {i + 1}: {e} (State: {breaker.get_state()})")
            await asyncio.sleep(0.5)
    
    asyncio.run(main())

