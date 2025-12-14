/**
 * Gnome Sort Implementation in JavaScript
 * 
 * Gnome sort is a simple sorting algorithm similar to insertion sort, but using
 * a series of swaps, similar to a bubble sort. It finds the first place where
 * two adjacent elements are in the wrong order and swaps them.
 * 
 * Time Complexity: O(n²) worst/average, O(n) best (already sorted)
 * Space Complexity: O(1) - sorts in place
 */

function gnomeSort(arr) {
    const sorted = [...arr];
    let pos = 0;
    
    while (pos < sorted.length) {
        if (pos === 0 || sorted[pos] >= sorted[pos - 1]) {
            pos++;
        } else {
            [sorted[pos], sorted[pos - 1]] = [sorted[pos - 1], sorted[pos]];
            pos--;
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Gnome Sort:', gnomeSort(arr));
}

module.exports = { gnomeSort };

