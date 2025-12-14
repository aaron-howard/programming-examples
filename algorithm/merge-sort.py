"""
Merge Sort Implementation in Python

Merge sort is a divide-and-conquer algorithm that splits the array in half,
recursively sorts both halves, then merges them back together.

Time Complexity: O(n log n) in all cases
Space Complexity: O(n) - requires temporary arrays
"""


def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Merge Sort:", merge_sort(arr))

