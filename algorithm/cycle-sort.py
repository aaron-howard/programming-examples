"""
Cycle Sort Implementation in Python

Cycle sort minimizes the number of writes to memory. It finds cycles of
elements that need to be rotated to their correct positions.

Time Complexity: O(n²) in all cases
Space Complexity: O(1) - sorts in place

Note: Minimizes writes (useful for flash memory)
"""


def cycle_sort(arr):
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    writes = 0
    
    for cycle_start in range(n - 1):
        item = sorted_arr[cycle_start]
        pos = cycle_start
        
        # Find position where item should be placed
        for i in range(cycle_start + 1, n):
            if sorted_arr[i] < item:
                pos += 1
        
        # If item is already in correct position, continue
        if pos == cycle_start:
            continue
        
        # Skip duplicates
        while item == sorted_arr[pos]:
            pos += 1
        
        # Put item in correct position
        if pos != cycle_start:
            sorted_arr[pos], item = item, sorted_arr[pos]
            writes += 1
        
        # Rotate the rest of the cycle
        while pos != cycle_start:
            pos = cycle_start
            
            for i in range(cycle_start + 1, n):
                if sorted_arr[i] < item:
                    pos += 1
            
            while item == sorted_arr[pos]:
                pos += 1
            
            if item != sorted_arr[pos]:
                sorted_arr[pos], item = item, sorted_arr[pos]
                writes += 1
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Cycle Sort:", cycle_sort(arr))

