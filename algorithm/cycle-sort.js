/**
 * Cycle Sort Implementation in JavaScript
 * 
 * Cycle sort minimizes the number of writes to memory. It finds cycles of
 * elements that need to be rotated to their correct positions.
 * 
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1) - sorts in place
 * 
 * Note: Minimizes writes (useful for flash memory)
 */

function cycleSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    let writes = 0;
    
    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        let item = sorted[cycleStart];
        let pos = cycleStart;
        
        // Find position where item should be placed
        for (let i = cycleStart + 1; i < n; i++) {
            if (sorted[i] < item) {
                pos++;
            }
        }
        
        // If item is already in correct position, continue
        if (pos === cycleStart) {
            continue;
        }
        
        // Skip duplicates
        while (item === sorted[pos]) {
            pos++;
        }
        
        // Put item in correct position
        if (pos !== cycleStart) {
            [item, sorted[pos]] = [sorted[pos], item];
            writes++;
        }
        
        // Rotate the rest of the cycle
        while (pos !== cycleStart) {
            pos = cycleStart;
            
            for (let i = cycleStart + 1; i < n; i++) {
                if (sorted[i] < item) {
                    pos++;
                }
            }
            
            while (item === sorted[pos]) {
                pos++;
            }
            
            if (item !== sorted[pos]) {
                [item, sorted[pos]] = [sorted[pos], item];
                writes++;
            }
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Cycle Sort:', cycleSort(arr));
}

module.exports = { cycleSort };

