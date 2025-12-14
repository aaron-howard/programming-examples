/**
 * Cocktail Shaker Sort Implementation in JavaScript
 * 
 * Cocktail shaker sort (bidirectional bubble sort) is a variation of bubble sort
 * that sorts in both directions on each pass through the list.
 * 
 * Time Complexity: O(n²) worst/average, O(n) best (already sorted)
 * Space Complexity: O(1) - sorts in place
 */

function cocktailShakerSort(arr) {
    const sorted = [...arr];
    let swapped = true;
    let start = 0;
    let end = sorted.length - 1;
    
    while (swapped) {
        swapped = false;
        
        // Forward pass
        for (let i = start; i < end; i++) {
            if (sorted[i] > sorted[i + 1]) {
                [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
        
        swapped = false;
        end--;
        
        // Backward pass
        for (let i = end - 1; i >= start; i--) {
            if (sorted[i] > sorted[i + 1]) {
                [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
                swapped = true;
            }
        }
        
        start++;
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Cocktail Shaker Sort:', cocktailShakerSort(arr));
}

module.exports = { cocktailShakerSort };

