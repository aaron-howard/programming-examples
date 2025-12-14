/**
 * Shell Sort Implementation in JavaScript
 * 
 * Shell sort is a gap-based generalization of insertion sort. It sorts elements
 * that are far apart first, then reduces the gap progressively.
 * 
 * Time Complexity: O(n^1.5) to O(n²) depending on gap sequence
 * Space Complexity: O(1) - sorts in place
 */

function shellSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    
    // Start with a large gap, then reduce it
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            const temp = sorted[i];
            let j = i;
            
            // Shift earlier gap-sorted elements up until correct location
            while (j >= gap && sorted[j - gap] > temp) {
                sorted[j] = sorted[j - gap];
                j -= gap;
            }
            
            sorted[j] = temp;
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Shell Sort:', shellSort(arr));
}

module.exports = { shellSort };

