"""
Radix Sort Implementation in Python

Radix sort sorts digits/characters by place value, starting from least significant
digit to most significant digit. Uses counting sort as a subroutine.

Time Complexity: O(d * (n + k)) where d is number of digits, k is base
Space Complexity: O(n + k)
"""


def radix_sort(arr):
    if len(arr) == 0:
        return arr
    
    max_val = max(arr)
    max_digits = len(str(abs(max_val)))
    
    for exp in range(max_digits):
        arr = counting_sort_by_digit(arr, 10 ** exp)
    
    return arr


def counting_sort_by_digit(arr, exp):
    output = [0] * len(arr)
    count = [0] * 10
    
    # Count occurrences
    for i in range(len(arr)):
        count[(arr[i] // exp) % 10] += 1
    
    # Change count to positions
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array
    for i in range(len(arr) - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    return output


if __name__ == "__main__":
    arr = [170, 45, 75, 90, 802, 24, 2, 66]
    print("Radix Sort:", radix_sort(arr.copy()))

