"""
Sleep Sort Implementation in Python

Sleep sort is a joke/novelty algorithm that uses thread timing. Each element
"sleeps" for a duration proportional to its value, then adds itself to the result.

Note: This is a demonstration using threading. In real applications, this
is highly inefficient and unreliable.

Time Complexity: O(max(arr)) - depends on largest value
Space Complexity: O(n)
"""

import threading
import time


def sleep_sort(arr):
    sorted_arr = []
    lock = threading.Lock()
    
    def add_to_sorted(num):
        time.sleep(num * 0.01)  # Multiply by 0.01s for visibility
        with lock:
            sorted_arr.append(num)
    
    threads = []
    for num in arr:
        thread = threading.Thread(target=add_to_sorted, args=(num,))
        thread.start()
        threads.append(thread)
    
    for thread in threads:
        thread.join()
    
    return sorted_arr


def sleep_sort_sync(arr):
    # This is a simplified version that doesn't actually use timing
    # True sleep sort requires async operations
    sorted_arr = []
    max_val = max(arr) if arr else 0
    
    for i in range(max_val + 1):
        for num in arr:
            if num == i:
                sorted_arr.append(num)
    
    return sorted_arr


if __name__ == "__main__":
    arr = [3, 1, 4, 1, 5, 9, 2, 6]
    print("Sleep Sort (sync version):", sleep_sort_sync(arr))
    
    # Async version
    result = sleep_sort([3, 1, 4, 1, 5])
    print("Sleep Sort (async):", result)

