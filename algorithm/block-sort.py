"""
Block Sort Implementation in Python

Block sort is a stable, cache-efficient mergesort variant. It divides the
array into blocks and uses a merge operation that's optimized for cache performance.

Time Complexity: O(n log n)
Space Complexity: O(n)
"""

import math


def block_sort(arr):
    if len(arr) <= 1:
        return arr
    
    block_size = int(math.sqrt(len(arr)))
    sorted_arr = arr.copy()
    
    # Sort blocks
    for i in range(0, len(sorted_arr), block_size):
        end = min(i + block_size, len(sorted_arr))
        insertion_sort_block(sorted_arr, i, end)
    
    # Merge blocks
    size = block_size
    while size < len(sorted_arr):
        for left in range(0, len(sorted_arr), 2 * size):
            mid = min(left + size, len(sorted_arr))
            right = min(left + 2 * size, len(sorted_arr))
            merge_block(sorted_arr, left, mid, right)
        size *= 2
    
    return sorted_arr


def insertion_sort_block(arr, left, right):
    for i in range(left + 1, right):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key


def merge_block(arr, left, mid, right):
    left_arr = arr[left:mid]
    right_arr = arr[mid:right]
    
    i = j = 0
    k = left
    
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Block Sort:", block_sort(arr))

