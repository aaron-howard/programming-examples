"""
Thread Pool Pattern - Python

Maintains a pool of worker threads to execute tasks concurrently,
avoiding the overhead of creating/destroying threads for each task.
"""

from concurrent.futures import ThreadPoolExecutor
import time


def task(name, duration):
    print(f"Worker executing: {name}")
    time.sleep(duration / 1000)  # Convert ms to seconds
    print(f"Worker completed: {name}")
    return f"Result of {name}"


# Example usage
if __name__ == "__main__":
    print("=== Thread Pool Pattern ===\n")
    
    tasks = [
        ('Task 1', 100),
        ('Task 2', 200),
        ('Task 3', 150),
        ('Task 4', 100),
        ('Task 5', 50)
    ]
    
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(task, name, duration) for name, duration in tasks]
        results = [future.result() for future in futures]
    
    print("\nAll tasks completed:")
    for result in results:
        print(f"  {result}")

