"""
Pigeonhole Sort Implementation in Python

Pigeonhole sort is an extreme version of counting sort. It requires that the
range of possible values is small and known. Each value gets its own "pigeonhole".

Time Complexity: O(n + range) where range is the difference between max and min
Space Complexity: O(range)
"""


def pigeonhole_sort(arr):
    if len(arr) == 0:
        return arr
    
    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val + 1
    
    # Create pigeonholes
    holes = [0] * range_val
    
    # Count occurrences
    for num in arr:
        holes[num - min_val] += 1
    
    # Reconstruct sorted array
    sorted_arr = []
    for i in range(range_val):
        while holes[i] > 0:
            sorted_arr.append(i + min_val)
            holes[i] -= 1
    
    return sorted_arr


if __name__ == "__main__":
    arr = [8, 3, 2, 7, 4, 6, 8]
    print("Pigeonhole Sort:", pigeonhole_sort(arr))

