"""
Bead Sort Implementation in Python

Bead sort is a natural sorting algorithm that simulates the process of beads
falling under gravity. Each number is represented by that many beads on a rod.

Time Complexity: O(S) where S is the sum of all elements
Space Complexity: O(n * max(arr))
"""


def bead_sort(arr):
    if len(arr) == 0:
        return arr
    
    max_val = max(arr)
    beads = [[0] * max_val for _ in range(len(arr))]
    
    # Drop beads
    for i in range(len(arr)):
        for j in range(arr[i]):
            beads[i][j] = 1
    
    # Let beads fall
    for j in range(max_val):
        sum_val = 0
        for i in range(len(arr)):
            sum_val += beads[i][j]
            beads[i][j] = 0
        
        for i in range(len(arr) - sum_val, len(arr)):
            beads[i][j] = 1
    
    # Count beads in each row
    sorted_arr = []
    for i in range(len(arr)):
        count = 0
        for j in range(max_val):
            if beads[i][j] == 1:
                count += 1
            else:
                break
        sorted_arr.append(count)
    
    return sorted_arr


if __name__ == "__main__":
    arr = [3, 1, 4, 1, 5, 9, 2, 6]
    print("Bead Sort:", bead_sort(arr))

