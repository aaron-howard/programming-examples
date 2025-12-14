"""
Heap Sort Implementation in Python

Heap sort uses a binary heap data structure to extract minimum/maximum elements.
It builds a max heap, then repeatedly extracts the maximum element.

Time Complexity: O(n log n) in all cases
Space Complexity: O(1) - sorts in place
"""


def heap_sort(arr):
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(sorted_arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        sorted_arr[0], sorted_arr[i] = sorted_arr[i], sorted_arr[0]
        heapify(sorted_arr, i, 0)
    
    return sorted_arr


def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Heap Sort:", heap_sort(arr))

