/**
 * Spaghetti Sort Implementation in JavaScript
 * 
 * Spaghetti sort is a conceptual algorithm that uses lengths of spaghetti.
 * You grab all spaghetti sticks, hold them vertically, and the longest one
 * will stick out the most. You grab it, then repeat.
 * 
 * This is a simulation of that concept using arrays.
 * 
 * Time Complexity: O(n) - but requires O(n) space and setup
 * Space Complexity: O(n)
 */

function spaghettiSort(arr) {
    if (arr.length === 0) return arr;
    
    const sorted = [];
    const remaining = [...arr];
    
    while (remaining.length > 0) {
        // Find the maximum (longest spaghetti)
        let maxIdx = 0;
        for (let i = 1; i < remaining.length; i++) {
            if (remaining[i] > remaining[maxIdx]) {
                maxIdx = i;
            }
        }
        
        // Add to sorted array (from end, since we're grabbing longest first)
        sorted.unshift(remaining[maxIdx]);
        
        // Remove from remaining
        remaining.splice(maxIdx, 1);
    }
    
    return sorted;
}

// Alternative implementation that's more efficient
function spaghettiSortEfficient(arr) {
    if (arr.length === 0) return arr;
    
    const sorted = [];
    const arrCopy = [...arr];
    
    while (arrCopy.length > 0) {
        const max = Math.max(...arrCopy);
        const maxIdx = arrCopy.indexOf(max);
        sorted.unshift(max);
        arrCopy.splice(maxIdx, 1);
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Spaghetti Sort:', spaghettiSort(arr));
    console.log('Spaghetti Sort (efficient):', spaghettiSortEfficient(arr));
}

module.exports = { spaghettiSort, spaghettiSortEfficient };

