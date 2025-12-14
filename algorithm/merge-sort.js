/**
 * Merge Sort Implementation in JavaScript
 * 
 * Merge sort is a divide-and-conquer algorithm that splits the array in half,
 * recursively sorts both halves, then merges them back together.
 * 
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n) - requires temporary arrays
 */

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // Add remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Merge Sort:', mergeSort(arr));
}

module.exports = { mergeSort };

