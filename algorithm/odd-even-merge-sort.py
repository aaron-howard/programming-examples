"""
Odd-Even Merge Sort Implementation in Python

Odd-even merge sort is a sorting network algorithm designed for parallel hardware.
It's based on the odd-even merge algorithm.

Time Complexity: O(log² n) parallel, O(n log² n) sequential
Space Complexity: O(n log² n)
"""


def odd_even_merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = odd_even_merge_sort(arr[:mid])
    right = odd_even_merge_sort(arr[mid:])
    
    return odd_even_merge(left + right)


def odd_even_merge(arr):
    if len(arr) <= 1:
        return arr
    
    n = len(arr)
    mid = n // 2
    
    # Compare and swap
    for i in range(mid):
        if arr[i] > arr[i + mid]:
            arr[i], arr[i + mid] = arr[i + mid], arr[i]
    
    # Recursively merge odd and even indices
    odd = [arr[i] for i in range(0, mid)]
    even = [arr[i] for i in range(mid, n)]
    
    sorted_odd = odd_even_merge(odd)
    sorted_even = odd_even_merge(even)
    
    return sorted_odd + sorted_even


if __name__ == "__main__":
    arr = [3, 7, 4, 8, 6, 2, 1, 5]
    print("Odd-Even Merge Sort:", odd_even_merge_sort(arr.copy()))

