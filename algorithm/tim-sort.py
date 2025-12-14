"""
Tim Sort Implementation in Python

Tim sort is a hybrid of merge sort and insertion sort. It's the default
sorting algorithm in Python and Java. It finds runs (already sorted sequences),
uses insertion sort for small runs, and merges runs together.

Time Complexity: O(n log n) worst case, O(n) best case
Space Complexity: O(n)
"""

MIN_MERGE = 32


def tim_sort(arr):
    n = len(arr)
    sorted_arr = arr.copy()
    
    # Sort individual subarrays of size MIN_MERGE
    for i in range(0, n, MIN_MERGE):
        insertion_sort_tim(sorted_arr, i, min(i + MIN_MERGE - 1, n - 1))
    
    # Merge subarrays
    size = MIN_MERGE
    while size < n:
        for left in range(0, n, 2 * size):
            mid = left + size - 1
            right = min(left + 2 * size - 1, n - 1)
            
            if mid < right:
                merge_tim(sorted_arr, left, mid, right)
        
        size *= 2
    
    return sorted_arr


def insertion_sort_tim(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key


def merge_tim(arr, left, mid, right):
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
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
    print("Tim Sort:", tim_sort(arr))

