/**
 * Radix Sort Implementation in JavaScript
 * 
 * Radix sort sorts digits/characters by place value, starting from least significant
 * digit to most significant digit. Uses counting sort as a subroutine.
 * 
 * Time Complexity: O(d * (n + k)) where d is number of digits, k is base
 * Space Complexity: O(n + k)
 */

function radixSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const maxDigits = Math.floor(Math.log10(Math.abs(max))) + 1;
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        arr = countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    // Change count to positions
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    return output;
}

// Example usage
if (require.main === module) {
    const arr = [170, 45, 75, 90, 802, 24, 2, 66];
    console.log('Radix Sort:', radixSort([...arr]));
}

module.exports = { radixSort };

