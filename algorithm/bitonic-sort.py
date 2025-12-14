"""
Bitonic Sort Implementation in Python

Bitonic sort is a parallel sorting network algorithm. It works by creating
bitonic sequences (sequences that first increase then decrease, or vice versa).

Time Complexity: O(log² n) parallel, O(n log² n) sequential
Space Complexity: O(n log² n)
"""


def bitonic_sort(arr, up=True):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = bitonic_sort(arr[:mid], True)
    right = bitonic_sort(arr[mid:], False)
    
    return bitonic_merge(left + right, up)


def bitonic_merge(arr, up):
    if len(arr) <= 1:
        return arr
    
    arr = bitonic_compare(arr, up)
    mid = len(arr) // 2
    left = bitonic_merge(arr[:mid], up)
    right = bitonic_merge(arr[mid:], up)
    
    return left + right


def bitonic_compare(arr, up):
    dist = len(arr) // 2
    for i in range(dist):
        if (arr[i] > arr[i + dist]) == up:
            arr[i], arr[i + dist] = arr[i + dist], arr[i]
    return arr


if __name__ == "__main__":
    arr = [3, 7, 4, 8, 6, 2, 1, 5]
    print("Bitonic Sort:", bitonic_sort(arr.copy()))

