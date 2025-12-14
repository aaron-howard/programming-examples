"""
Bulkhead Pattern - Python

Isolates resources to prevent cascading failures.
Similar to ship bulkheads that prevent water from flooding the entire ship.
"""

import asyncio
from collections import deque


class Bulkhead:
    def __init__(self, name, max_concurrency=5):
        self.name = name
        self.max_concurrency = max_concurrency
        self.active_tasks = 0
        self.queue = deque()
    
    async def execute(self, fn):
        if self.active_tasks < self.max_concurrency:
            return await self._run_task(fn)
        else:
            future = asyncio.Future()
            self.queue.append((fn, future))
            return await future
    
    async def _run_task(self, fn):
        self.active_tasks += 1
        try:
            result = await fn()
            return result
        finally:
            self.active_tasks -= 1
            if self.queue:
                next_fn, next_future = self.queue.popleft()
                asyncio.create_task(self._run_task_and_set_future(next_fn, next_future))
    
    async def _run_task_and_set_future(self, fn, future):
        try:
            result = await self._run_task(fn)
            future.set_result(result)
        except Exception as e:
            future.set_exception(e)


# Example usage
if __name__ == "__main__":
    async def task(i):
        print(f"Task {i} started")
        await asyncio.sleep(1)
        print(f"Task {i} completed")
        return f"Result {i}"
    
    async def main():
        bulkhead = Bulkhead("ServiceA", 2)
        tasks = [bulkhead.execute(lambda i=i: task(i)) for i in range(10)]
        results = await asyncio.gather(*tasks)
        print(f"All tasks completed: {len(results)} results")
    
    asyncio.run(main())

