/**
 * Pigeonhole Sort Implementation in JavaScript
 * 
 * Pigeonhole sort is an extreme version of counting sort. It requires that the
 * range of possible values is small and known. Each value gets its own "pigeonhole".
 * 
 * Time Complexity: O(n + range) where range is the difference between max and min
 * Space Complexity: O(range)
 */

function pigeonholeSort(arr) {
    if (arr.length === 0) return arr;
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    
    // Create pigeonholes
    const holes = new Array(range).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        holes[num - min]++;
    }
    
    // Reconstruct sorted array
    const sorted = [];
    for (let i = 0; i < range; i++) {
        while (holes[i] > 0) {
            sorted.push(i + min);
            holes[i]--;
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [8, 3, 2, 7, 4, 6, 8];
    console.log('Pigeonhole Sort:', pigeonholeSort(arr));
}

module.exports = { pigeonholeSort };

