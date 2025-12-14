"""
Shell Sort Implementation in Python

Shell sort is a gap-based generalization of insertion sort. It sorts elements
that are far apart first, then reduces the gap progressively.

Time Complexity: O(n^1.5) to O(n²) depending on gap sequence
Space Complexity: O(1) - sorts in place
"""


def shell_sort(arr):
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    
    # Start with a large gap, then reduce it
    gap = n // 2
    while gap > 0:
        # Do a gapped insertion sort for this gap size
        for i in range(gap, n):
            temp = sorted_arr[i]
            j = i
            
            # Shift earlier gap-sorted elements up until correct location
            while j >= gap and sorted_arr[j - gap] > temp:
                sorted_arr[j] = sorted_arr[j - gap]
                j -= gap
            
            sorted_arr[j] = temp
        
        gap //= 2
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Shell Sort:", shell_sort(arr))

