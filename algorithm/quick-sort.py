"""
Quick Sort Implementation in Python

Quick sort is a divide-and-conquer algorithm that picks a pivot element,
partitions the array around the pivot, and recursively sorts the subarrays.

Time Complexity: O(n log n) average, O(n²) worst case
Space Complexity: O(log n) average (recursion stack)
"""


def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)


def quick_sort_in_place(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort_in_place(arr, low, pivot_idx - 1)
        quick_sort_in_place(arr, pivot_idx + 1, high)
    
    return arr


def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Quick Sort:", quick_sort(arr))
    arr2 = [64, 34, 25, 12, 22, 11, 90]
    print("Quick Sort (in-place):", quick_sort_in_place(arr2))

