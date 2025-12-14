"""
Bubble Sort Implementation in Python

Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
compares adjacent elements and swaps them if they are in the wrong order.
The pass through the list is repeated until the list is sorted.

Time Complexity: O(n²) in worst and average cases
Space Complexity: O(1) - sorts in place
"""


def bubble_sort(arr):
    """
    Bubble Sort - Standard Implementation
    
    Args:
        arr: List of numbers to sort
        
    Returns:
        List: Sorted list (original list is not modified)
    """
    # Create a copy to avoid mutating the original list
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    
    # Outer loop: number of passes needed
    for i in range(n - 1):
        swapped = False  # Optimization: track if any swaps occurred
        
        # Inner loop: compare adjacent elements
        # After each pass, the largest element "bubbles" to the end
        for j in range(n - i - 1):
            # If current element is greater than next, swap them
            if sorted_arr[j] > sorted_arr[j + 1]:
                # Swap elements using tuple unpacking
                sorted_arr[j], sorted_arr[j + 1] = sorted_arr[j + 1], sorted_arr[j]
                swapped = True
        
        # If no swaps occurred, array is already sorted
        if not swapped:
            break
    
    return sorted_arr


def bubble_sort_verbose(arr, verbose=False):
    """
    Bubble Sort - Verbose version with logging (for learning!)
    
    Args:
        arr: List of numbers to sort
        verbose: Whether to log each step
        
    Returns:
        List: Sorted list
    """
    sorted_arr = arr.copy()
    n = len(sorted_arr)
    
    if verbose:
        print(f"Starting bubble sort on: {sorted_arr}")
    
    for i in range(n - 1):
        if verbose:
            print(f"\nPass {i + 1}:")
        
        swapped = False
        
        for j in range(n - i - 1):
            if verbose:
                print(f"  Comparing {sorted_arr[j]} and {sorted_arr[j + 1]}")
            
            if sorted_arr[j] > sorted_arr[j + 1]:
                sorted_arr[j], sorted_arr[j + 1] = sorted_arr[j + 1], sorted_arr[j]
                swapped = True
                
                if verbose:
                    print(f"  [SWAPPED] New array: {sorted_arr}")
            elif verbose:
                print(f"  [NO SWAP]")
        
        if not swapped:
            if verbose:
                print(f"\nNo swaps in this pass - array is sorted!")
            break
    
    if verbose:
        print(f"\nFinal sorted array: {sorted_arr}")
    
    return sorted_arr


def bubble_sort_in_place(arr):
    """
    Bubble Sort - In-place version (modifies original list)
    
    Args:
        arr: List of numbers to sort (will be modified)
        
    Returns:
        None (sorts in place)
    """
    n = len(arr)
    
    for i in range(n - 1):
        swapped = False
        
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:
            break


if __name__ == "__main__":
    print("=== Bubble Sort Examples ===\n")
    
    # Example 1: Basic sorting
    numbers1 = [64, 34, 25, 12, 22, 11, 90]
    print("Example 1:")
    print(f"Original: {numbers1}")
    print(f"Sorted: {bubble_sort(numbers1)}")
    print()
    
    # Example 2: Already sorted array
    numbers2 = [1, 2, 3, 4, 5]
    print("Example 2 (already sorted):")
    print(f"Original: {numbers2}")
    print(f"Sorted: {bubble_sort(numbers2)}")
    print()
    
    # Example 3: Reverse sorted array
    numbers3 = [5, 4, 3, 2, 1]
    print("Example 3 (reverse sorted):")
    print(f"Original: {numbers3}")
    print(f"Sorted: {bubble_sort(numbers3)}")
    print()
    
    # Example 4: With duplicates
    numbers4 = [3, 7, 3, 1, 7, 2, 1]
    print("Example 4 (with duplicates):")
    print(f"Original: {numbers4}")
    print(f"Sorted: {bubble_sort(numbers4)}")
    print()
    
    # Example 5: Verbose mode
    print("Example 5 (verbose mode):")
    bubble_sort_verbose([64, 34, 25, 12], verbose=True)
    print()
    
    # Example 6: In-place sorting
    numbers6 = [64, 34, 25, 12, 22, 11, 90]
    print("Example 6 (in-place sorting):")
    print(f"Original: {numbers6}")
    bubble_sort_in_place(numbers6)
    print(f"After in-place sort: {numbers6}")

