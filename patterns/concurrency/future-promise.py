"""
Future/Promise Pattern - Python

Represents a value that will be available in the future,
allowing asynchronous operations without blocking.
"""

from concurrent.futures import Future as PyFuture, ThreadPoolExecutor
import time


def async_operation(duration, result):
    time.sleep(duration / 1000)
    return result


# Example usage
if __name__ == "__main__":
    print("=== Future/Promise Pattern ===\n")
    
    with ThreadPoolExecutor() as executor:
        # Submit tasks and get futures
        future1 = executor.submit(async_operation, 100, "Data loaded")
        future2 = executor.submit(async_operation, 200, "Processing complete")
        
        # Wait for results
        result1 = future1.result()
        result2 = future2.result()
        
        print(f"Result 1: {result1}")
        print(f"Result 2: {result2}")
    
    # Using asyncio (modern Python approach)
    import asyncio
    
    async def async_task(name, duration):
        await asyncio.sleep(duration / 1000)
        return f"{name} completed"
    
    async def main():
        results = await asyncio.gather(
            async_task("Task 1", 100),
            async_task("Task 2", 200)
        )
        for result in results:
            print(f"Async result: {result}")
    
    asyncio.run(main())

