"""
Counting Sort Implementation in Python

Counting sort counts occurrences of each value, then reconstructs the sorted array.
Works best when the range of values is small compared to the number of elements.

Time Complexity: O(n + k) where k is the range of values
Space Complexity: O(k) - for the count array
"""


def counting_sort(arr):
    if len(arr) == 0:
        return arr
    
    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val + 1
    
    # Count occurrences of each value
    count = [0] * range_val
    for num in arr:
        count[num - min_val] += 1
    
    # Modify count array to store positions
    for i in range(1, range_val):
        count[i] += count[i - 1]
    
    # Build output array
    output = [0] * len(arr)
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output


if __name__ == "__main__":
    arr = [4, 2, 2, 8, 3, 3, 1]
    print("Counting Sort:", counting_sort(arr))

