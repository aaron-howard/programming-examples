/**
 * Odd-Even Merge Sort Implementation in JavaScript
 * 
 * Odd-even merge sort is a sorting network algorithm designed for parallel hardware.
 * It's based on the odd-even merge algorithm.
 * 
 * Time Complexity: O(log² n) parallel, O(n log² n) sequential
 * Space Complexity: O(n log² n)
 */

function oddEvenMergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = oddEvenMergeSort(arr.slice(0, mid));
    const right = oddEvenMergeSort(arr.slice(mid));
    
    return oddEvenMerge([...left, ...right]);
}

function oddEvenMerge(arr) {
    if (arr.length <= 1) return arr;
    
    const n = arr.length;
    const mid = Math.floor(n / 2);
    
    // Compare and swap
    for (let i = 0; i < mid; i++) {
        if (arr[i] > arr[i + mid]) {
            [arr[i], arr[i + mid]] = [arr[i + mid], arr[i]];
        }
    }
    
    // Recursively merge odd and even indices
    const odd = [];
    const even = [];
    for (let i = 0; i < mid; i++) {
        odd.push(arr[i]);
        even.push(arr[i + mid]);
    }
    
    const sortedOdd = oddEvenMerge(odd);
    const sortedEven = oddEvenMerge(even);
    
    return [...sortedOdd, ...sortedEven];
}

// Example usage
if (require.main === module) {
    const arr = [3, 7, 4, 8, 6, 2, 1, 5];
    console.log('Odd-Even Merge Sort:', oddEvenMergeSort([...arr]));
}

module.exports = { oddEvenMergeSort };

