"""
Intro Sort Implementation in Python

Intro sort (introsort) starts with quicksort, but switches to heapsort if
the recursion depth becomes too large, and uses insertion sort for small arrays.
This combines the best of all three algorithms.

Time Complexity: O(n log n) worst case
Space Complexity: O(log n)
"""

import math


def intro_sort(arr):
    max_depth = int(math.log2(len(arr))) * 2
    return intro_sort_recursive(arr.copy(), 0, len(arr) - 1, max_depth)


def intro_sort_recursive(arr, low, high, max_depth):
    size = high - low + 1
    
    # Use insertion sort for small arrays
    if size < 16:
        return insertion_sort_intro(arr, low, high)
    
    # If max depth reached, use heap sort
    if max_depth == 0:
        heap_sort_intro(arr, low, high)
        return arr
    
    # Otherwise use quicksort
    pivot = partition_intro(arr, low, high)
    intro_sort_recursive(arr, low, pivot - 1, max_depth - 1)
    intro_sort_recursive(arr, pivot + 1, high, max_depth - 1)
    
    return arr


def partition_intro(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def insertion_sort_intro(arr, low, high):
    for i in range(low + 1, high + 1):
        key = arr[i]
        j = i - 1
        while j >= low and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr


def heap_sort_intro(arr, low, high):
    n = high - low + 1
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify_intro(arr, n, low + i, low)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[low], arr[low + i] = arr[low + i], arr[low]
        heapify_intro(arr, i, low, low)
    
    return arr


def heapify_intro(arr, n, i, offset):
    largest = i
    left = offset + 2 * (i - offset) + 1
    right = offset + 2 * (i - offset) + 2
    
    if left < offset + n and arr[left] > arr[largest]:
        largest = left
    
    if right < offset + n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify_intro(arr, n, largest, offset)


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Intro Sort:", intro_sort(arr))

