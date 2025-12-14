"""
Asynchronous Programming - Python

Non-blocking code execution using async/await and asyncio.
"""

import asyncio
from typing import List, Dict


# Async function
async def fetch_data_async(url: str) -> Dict:
    await asyncio.sleep(1)  # Simulate network delay
    return {'data': f'Data from {url}'}


# Parallel execution
async def fetch_multiple(urls: List[str]) -> List[Dict]:
    tasks = [fetch_data_async(url) for url in urls]
    return await asyncio.gather(*tasks)


# Timeout handling
async def fetch_with_timeout(url: str, timeout: float) -> Dict:
    try:
        return await asyncio.wait_for(fetch_data_async(url), timeout=timeout)
    except asyncio.TimeoutError:
        return {'error': 'Timeout'}


# Example usage
async def main():
    print("=== Asynchronous Programming ===\n")
    
    # Single async call
    data = await fetch_data_async('/api/users')
    print("Async result:", data)
    
    # Parallel execution
    results = await fetch_multiple(['/api/1', '/api/2', '/api/3'])
    print("Parallel results:", results)
    
    # With timeout
    result = await fetch_with_timeout('/api/data', 0.5)
    print("With timeout:", result)


if __name__ == "__main__":
    asyncio.run(main())

