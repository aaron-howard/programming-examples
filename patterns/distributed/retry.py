"""
Retry Pattern - Python

Automatically retries failed operations with exponential backoff
or other strategies.
"""

import time
import asyncio


class RetryPolicy:
    def __init__(self, max_attempts=3, initial_delay=1, backoff_multiplier=2):
        self.max_attempts = max_attempts
        self.initial_delay = initial_delay
        self.backoff_multiplier = backoff_multiplier
    
    async def execute(self, fn):
        last_error = None
        
        for attempt in range(1, self.max_attempts + 1):
            try:
                return await fn()
            except Exception as error:
                last_error = error
                if attempt < self.max_attempts:
                    delay = self.initial_delay * (self.backoff_multiplier ** (attempt - 1))
                    print(f"Attempt {attempt} failed, retrying in {delay}s...")
                    await asyncio.sleep(delay)
        
        raise last_error


# Example usage
if __name__ == "__main__":
    attempt_count = 0
    
    async def unreliable_operation():
        nonlocal attempt_count
        attempt_count += 1
        if attempt_count < 3:
            raise Exception("Operation failed")
        return "Operation succeeded"
    
    async def main():
        retry = RetryPolicy(3, 1, 2)
        try:
            result = await retry.execute(unreliable_operation)
            print("Result:", result)
        except Exception as e:
            print("Final error:", e)
    
    asyncio.run(main())

