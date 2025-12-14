"""
Comb Sort Implementation in Python

Comb sort is an improvement over bubble sort. It uses a gap that starts large
and shrinks by a shrink factor (typically 1.3) until it reaches 1.

Time Complexity: O(n²) worst case, O(n log n) average
Space Complexity: O(1) - sorts in place
"""


def comb_sort(arr):
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    gap = n
    swapped = True
    shrink = 1.3
    
    while gap > 1 or swapped:
        gap = int(gap / shrink)
        if gap < 1:
            gap = 1
        
        swapped = False
        
        for i in range(n - gap):
            if sorted_arr[i] > sorted_arr[i + gap]:
                sorted_arr[i], sorted_arr[i + gap] = sorted_arr[i + gap], sorted_arr[i]
                swapped = True
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Comb Sort:", comb_sort(arr))

