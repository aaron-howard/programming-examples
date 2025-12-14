"""
Spaghetti Sort Implementation in Python

Spaghetti sort is a conceptual algorithm that uses lengths of spaghetti.
You grab all spaghetti sticks, hold them vertically, and the longest one
will stick out the most. You grab it, then repeat.

This is a simulation of that concept using arrays.

Time Complexity: O(n) - but requires O(n) space and setup
Space Complexity: O(n)
"""


def spaghetti_sort(arr):
    if len(arr) == 0:
        return arr
    
    sorted_arr = []
    remaining = arr.copy()
    
    while len(remaining) > 0:
        # Find the maximum (longest spaghetti)
        max_idx = 0
        for i in range(1, len(remaining)):
            if remaining[i] > remaining[max_idx]:
                max_idx = i
        
        # Add to sorted array (from end, since we're grabbing longest first)
        sorted_arr.insert(0, remaining[max_idx])
        
        # Remove from remaining
        remaining.pop(max_idx)
    
    return sorted_arr


def spaghetti_sort_efficient(arr):
    if len(arr) == 0:
        return arr
    
    sorted_arr = []
    arr_copy = arr.copy()
    
    while len(arr_copy) > 0:
        max_val = max(arr_copy)
        max_idx = arr_copy.index(max_val)
        sorted_arr.insert(0, max_val)
        arr_copy.pop(max_idx)
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Spaghetti Sort:", spaghetti_sort(arr))
    print("Spaghetti Sort (efficient):", spaghetti_sort_efficient(arr))

