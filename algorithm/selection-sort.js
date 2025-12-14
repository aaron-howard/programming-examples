/**
 * Selection Sort Implementation in JavaScript
 * 
 * Selection sort repeatedly finds the minimum element from the unsorted portion
 * and places it at the beginning. The algorithm maintains two subarrays: sorted and unsorted.
 * 
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1) - sorts in place
 */

function selectionSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in the unsorted portion
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (sorted[j] < sorted[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the minimum element with the first element of unsorted portion
        if (minIdx !== i) {
            [sorted[i], sorted[minIdx]] = [sorted[minIdx], sorted[i]];
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Selection Sort:', selectionSort(arr));
}

module.exports = { selectionSort };

