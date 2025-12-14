"""
Flash Sort Implementation in Python

Flash sort is a distribution-based algorithm that's very fast on uniform data.
It uses a classification step to distribute elements into classes, then sorts each class.

Time Complexity: O(n) average on uniform data, O(n log n) worst case
Space Complexity: O(n)
"""


def flash_sort(arr):
    if len(arr) == 0:
        return arr
    
    n = len(arr)
    sorted_arr = arr.copy()
    
    # Find min and max
    min_val = sorted_arr[0]
    max_val = sorted_arr[0]
    for i in range(1, n):
        if sorted_arr[i] < min_val:
            min_val = sorted_arr[i]
        if sorted_arr[i] > max_val:
            max_val = sorted_arr[i]
    
    if min_val == max_val:
        return sorted_arr
    
    # Classification
    m = int(0.43 * n)
    l = [0] * m
    c1 = (m - 1) / (max_val - min_val)
    
    for i in range(n):
        k = int(c1 * (sorted_arr[i] - min_val))
        l[k] += 1
    
    for k in range(1, m):
        l[k] += l[k - 1]
    
    # Permutation
    hold = sorted_arr[0]
    move = 0
    j = 0
    k = m - 1
    
    while move < n - 1:
        while j > l[k] - 1:
            j += 1
            k = int(c1 * (sorted_arr[j] - min_val))
        
        flash = sorted_arr[j]
        while j != l[k]:
            k = int(c1 * (flash - min_val))
            hold = sorted_arr[l[k] - 1]
            sorted_arr[l[k] - 1] = flash
            flash = hold
            l[k] -= 1
            move += 1
    
    # Insertion sort for final touches
    for i in range(1, n):
        key = sorted_arr[i]
        j = i - 1
        while j >= 0 and sorted_arr[j] > key:
            sorted_arr[j + 1] = sorted_arr[j]
            j -= 1
        sorted_arr[j + 1] = key
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Flash Sort:", flash_sort(arr))

