/**
 * Insertion Sort Implementation in JavaScript
 * 
 * Insertion sort builds a sorted list one element at a time by inserting each
 * element into its correct position in the sorted portion of the array.
 * 
 * Time Complexity: O(n²) worst/average, O(n) best (already sorted)
 * Space Complexity: O(1) - sorts in place
 */

function insertionSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    
    for (let i = 1; i < n; i++) {
        const key = sorted[i];
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && sorted[j] > key) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        
        sorted[j + 1] = key;
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Insertion Sort:', insertionSort(arr));
}

module.exports = { insertionSort };

