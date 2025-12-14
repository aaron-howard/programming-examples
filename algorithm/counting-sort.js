/**
 * Counting Sort Implementation in JavaScript
 * 
 * Counting sort counts occurrences of each value, then reconstructs the sorted array.
 * Works best when the range of values is small compared to the number of elements.
 * 
 * Time Complexity: O(n + k) where k is the range of values
 * Space Complexity: O(k) - for the count array
 */

function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    
    // Count occurrences of each value
    const count = new Array(range).fill(0);
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Modify count array to store positions
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}

// Example usage
if (require.main === module) {
    const arr = [4, 2, 2, 8, 3, 3, 1];
    console.log('Counting Sort:', countingSort(arr));
}

module.exports = { countingSort };

