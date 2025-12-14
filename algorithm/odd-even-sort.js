/**
 * Odd-Even Sort Implementation in JavaScript
 * 
 * Odd-even sort is a parallel-friendly variant of bubble sort. It compares
 * all odd/even indexed pairs of adjacent elements and swaps them if in wrong order.
 * 
 * Time Complexity: O(n²) worst/average
 * Space Complexity: O(1) - sorts in place
 */

function oddEvenSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    let sorted_flag = false;
    
    while (!sorted_flag) {
        sorted_flag = true;
        
        // Sort odd-indexed pairs
        for (let i = 1; i < n - 1; i += 2) {
            if (sorted[i] > sorted[i + 1]) {
                [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
                sorted_flag = false;
            }
        }
        
        // Sort even-indexed pairs
        for (let i = 0; i < n - 1; i += 2) {
            if (sorted[i] > sorted[i + 1]) {
                [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
                sorted_flag = false;
            }
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Odd-Even Sort:', oddEvenSort(arr));
}

module.exports = { oddEvenSort };

