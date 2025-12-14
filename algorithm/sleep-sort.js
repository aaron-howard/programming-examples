/**
 * Sleep Sort Implementation in JavaScript
 * 
 * Sleep sort is a joke/novelty algorithm that uses thread timing. Each element
 * "sleeps" for a duration proportional to its value, then adds itself to the result.
 * 
 * Note: This is a demonstration using setTimeout. In real applications, this
 * is highly inefficient and unreliable.
 * 
 * Time Complexity: O(max(arr)) - depends on largest value
 * Space Complexity: O(n)
 */

function sleepSort(arr) {
    return new Promise((resolve) => {
        const sorted = [];
        let completed = 0;
        
        if (arr.length === 0) {
            resolve([]);
            return;
        }
        
        for (const num of arr) {
            setTimeout(() => {
                sorted.push(num);
                completed++;
                if (completed === arr.length) {
                    resolve(sorted);
                }
            }, num * 10); // Multiply by 10ms for visibility
        }
    });
}

// Synchronous version using a different approach (not true sleep sort)
function sleepSortSync(arr) {
    // This is a simplified version that doesn't actually use timing
    // True sleep sort requires async operations
    const sorted = [];
    const max = Math.max(...arr);
    
    for (let i = 0; i <= max; i++) {
        for (const num of arr) {
            if (num === i) {
                sorted.push(num);
            }
        }
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    console.log('Sleep Sort (sync version):', sleepSortSync(arr));
    
    // Async version
    sleepSort([3, 1, 4, 1, 5]).then(result => {
        console.log('Sleep Sort (async):', result);
    });
}

module.exports = { sleepSort, sleepSortSync };

