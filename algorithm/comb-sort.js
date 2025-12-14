/**
 * Comb Sort Implementation in JavaScript
 * 
 * Comb sort is an improvement over bubble sort. It uses a gap that starts large
 * and shrinks by a shrink factor (typically 1.3) until it reaches 1.
 * 
 * Time Complexity: O(n²) worst case, O(n log n) average
 * Space Complexity: O(1) - sorts in place
 */

function combSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    let gap = n;
    let swapped = true;
    const shrink = 1.3;
    
    while (gap > 1 || swapped) {
        gap = Math.floor(gap / shrink);
        if (gap < 1) gap = 1;
        
        swapped = false;
        
        for (let i = 0; i < n - gap; i++) {
            if (sorted[i] > sorted[i + gap]) {
                [sorted[i], sorted[i + gap]] = [sorted[i + gap], sorted[i]];
                swapped = true;
            }
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Comb Sort:', combSort(arr));
}

module.exports = { combSort };

