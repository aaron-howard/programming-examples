"""
Insertion Sort Implementation in Python

Insertion sort builds a sorted list one element at a time by inserting each
element into its correct position in the sorted portion of the array.

Time Complexity: O(n²) worst/average, O(n) best (already sorted)
Space Complexity: O(1) - sorts in place
"""


def insertion_sort(arr):
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    
    for i in range(1, n):
        key = sorted_arr[i]
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and sorted_arr[j] > key:
            sorted_arr[j + 1] = sorted_arr[j]
            j -= 1
        
        sorted_arr[j + 1] = key
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Insertion Sort:", insertion_sort(arr))

