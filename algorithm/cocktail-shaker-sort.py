"""
Cocktail Shaker Sort Implementation in Python

Cocktail shaker sort (bidirectional bubble sort) is a variation of bubble sort
that sorts in both directions on each pass through the list.

Time Complexity: O(n²) worst/average, O(n) best (already sorted)
Space Complexity: O(1) - sorts in place
"""


def cocktail_shaker_sort(arr):
    sorted_arr = arr.copy()
    swapped = True
    start = 0
    end = len(sorted_arr) - 1
    
    while swapped:
        swapped = False
        
        # Forward pass
        for i in range(start, end):
            if sorted_arr[i] > sorted_arr[i + 1]:
                sorted_arr[i], sorted_arr[i + 1] = sorted_arr[i + 1], sorted_arr[i]
                swapped = True
        
        if not swapped:
            break
        
        swapped = False
        end -= 1
        
        # Backward pass
        for i in range(end - 1, start - 1, -1):
            if sorted_arr[i] > sorted_arr[i + 1]:
                sorted_arr[i], sorted_arr[i + 1] = sorted_arr[i + 1], sorted_arr[i]
                swapped = True
        
        start += 1
    
    return sorted_arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Cocktail Shaker Sort:", cocktail_shaker_sort(arr))

