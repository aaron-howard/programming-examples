"""
Selection Sort Implementation in Python

Selection sort repeatedly finds the minimum element from the unsorted portion
and places it at the beginning. The algorithm maintains two subarrays: sorted and unsorted.

Time Complexity: O(n²) in all cases
Space Complexity: O(1) - sorts in place
"""


def selection_sort(arr):
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    
    for i in range(n - 1):
        # Find the minimum element in the unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if sorted_arr[j] < sorted_arr[min_idx]:
                min_idx = j
        
        # Swap the minimum element with the first element of unsorted portion
        if min_idx != i:
            sorted_arr[i], sorted_arr[min_idx] = sorted_arr[min_idx], sorted_arr[i]
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Selection Sort:", selection_sort(arr))

