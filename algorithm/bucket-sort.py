"""
Bucket Sort Implementation in Python

Bucket sort distributes values into buckets, sorts each bucket, then concatenates.
Works best when input is uniformly distributed.

Time Complexity: O(n + k) average, O(n²) worst case
Space Complexity: O(n + k)
"""


def bucket_sort(arr, bucket_count=10):
    if len(arr) == 0:
        return arr
    
    min_val = min(arr)
    max_val = max(arr)
    bucket_size = (max_val - min_val) / bucket_count
    
    # Create buckets
    buckets = [[] for _ in range(bucket_count)]
    
    # Distribute elements into buckets
    for num in arr:
        bucket_index = min(
            int((num - min_val) / bucket_size),
            bucket_count - 1
        )
        buckets[bucket_index].append(num)
    
    # Sort each bucket and concatenate
    sorted_arr = []
    for bucket in buckets:
        insertion_sort_bucket(bucket)
        sorted_arr.extend(bucket)
    
    return sorted_arr


def insertion_sort_bucket(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key


if __name__ == "__main__":
    arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]
    print("Bucket Sort:", bucket_sort(arr))

