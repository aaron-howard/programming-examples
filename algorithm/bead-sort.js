/**
 * Bead Sort Implementation in JavaScript
 * 
 * Bead sort is a natural sorting algorithm that simulates the process of beads
 * falling under gravity. Each number is represented by that many beads on a rod.
 * 
 * Time Complexity: O(S) where S is the sum of all elements
 * Space Complexity: O(n * max(arr))
 */

function beadSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const beads = Array.from({ length: arr.length }, () => 
        Array.from({ length: max }, () => 0)
    );
    
    // Drop beads
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i]; j++) {
            beads[i][j] = 1;
        }
    }
    
    // Let beads fall
    for (let j = 0; j < max; j++) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += beads[i][j];
            beads[i][j] = 0;
        }
        
        for (let i = arr.length - sum; i < arr.length; i++) {
            beads[i][j] = 1;
        }
    }
    
    // Count beads in each row
    const sorted = [];
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let j = 0; j < max && beads[i][j] === 1; j++) {
            count++;
        }
        sorted.push(count);
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    console.log('Bead Sort:', beadSort(arr));
}

module.exports = { beadSort };

