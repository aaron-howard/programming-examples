"""
Odd-Even Sort Implementation in Python

Odd-even sort is a parallel-friendly variant of bubble sort. It compares
all odd/even indexed pairs of adjacent elements and swaps them if in wrong order.

Time Complexity: O(n²) worst/average
Space Complexity: O(1) - sorts in place
"""


def odd_even_sort(arr):
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    sorted_flag = False
    
    while not sorted_flag:
        sorted_flag = True
        
        # Sort odd-indexed pairs
        for i in range(1, n - 1, 2):
            if sorted_arr[i] > sorted_arr[i + 1]:
                sorted_arr[i], sorted_arr[i + 1] = sorted_arr[i + 1], sorted_arr[i]
                sorted_flag = False
        
        # Sort even-indexed pairs
        for i in range(0, n - 1, 2):
            if sorted_arr[i] > sorted_arr[i + 1]:
                sorted_arr[i], sorted_arr[i + 1] = sorted_arr[i + 1], sorted_arr[i]
                sorted_flag = False
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Odd-Even Sort:", odd_even_sort(arr))

