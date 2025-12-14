"""
Gnome Sort Implementation in Python

Gnome sort is a simple sorting algorithm similar to insertion sort, but using
a series of swaps, similar to a bubble sort. It finds the first place where
two adjacent elements are in the wrong order and swaps them.

Time Complexity: O(n²) worst/average, O(n) best (already sorted)
Space Complexity: O(1) - sorts in place
"""


def gnome_sort(arr):
    sorted_arr = arr.copy()
    pos = 0
    
    while pos < len(sorted_arr):
        if pos == 0 or sorted_arr[pos] >= sorted_arr[pos - 1]:
            pos += 1
        else:
            sorted_arr[pos], sorted_arr[pos - 1] = sorted_arr[pos - 1], sorted_arr[pos]
            pos -= 1
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Gnome Sort:", gnome_sort(arr))

