/**
 * Bubble Sort Implementation in JavaScript
 * 
 * Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 * 
 * Time Complexity: O(n²) in worst and average cases
 * Space Complexity: O(1) - sorts in place
 */

/**
 * Bubble Sort - Standard Implementation
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} - Sorted array
 */
function bubbleSort(arr) {
    // Create a copy to avoid mutating the original array
    const sorted = [...arr];
    const n = sorted.length;
    
    // Outer loop: number of passes needed
    for (let i = 0; i < n - 1; i++) {
        let swapped = false; // Optimization: track if any swaps occurred
        
        // Inner loop: compare adjacent elements
        // After each pass, the largest element "bubbles" to the end
        for (let j = 0; j < n - i - 1; j++) {
            // If current element is greater than next, swap them
            if (sorted[j] > sorted[j + 1]) {
                // Swap elements using destructuring
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                swapped = true;
            }
        }
        
        // If no swaps occurred, array is already sorted
        if (!swapped) {
            break;
        }
    }
    
    return sorted;
}

/**
 * Bubble Sort - Verbose version with logging (for learning!)
 * @param {number[]} arr - Array of numbers to sort
 * @param {boolean} verbose - Whether to log each step
 * @returns {number[]} - Sorted array
 */
function bubbleSortVerbose(arr, verbose = false) {
    const sorted = [...arr];
    const n = sorted.length;
    
    if (verbose) {
        console.log(`Starting bubble sort on: [${sorted.join(', ')}]`);
    }
    
    for (let i = 0; i < n - 1; i++) {
        if (verbose) {
            console.log(`\nPass ${i + 1}:`);
        }
        
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (verbose) {
                console.log(`  Comparing ${sorted[j]} and ${sorted[j + 1]}`);
            }
            
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                swapped = true;
                
                if (verbose) {
                    console.log(`  ✓ Swapped! New array: [${sorted.join(', ')}]`);
                }
            } else if (verbose) {
                console.log(`  ✗ No swap needed`);
            }
        }
        
        if (!swapped) {
            if (verbose) {
                console.log(`\nNo swaps in this pass - array is sorted!`);
            }
            break;
        }
    }
    
    if (verbose) {
        console.log(`\nFinal sorted array: [${sorted.join(', ')}]`);
    }
    
    return sorted;
}

// Example usage
console.log('=== Bubble Sort Examples ===\n');

// Example 1: Basic sorting
const numbers1 = [64, 34, 25, 12, 22, 11, 90];
console.log('Example 1:');
console.log('Original:', numbers1);
console.log('Sorted:', bubbleSort(numbers1));
console.log('');

// Example 2: Already sorted array
const numbers2 = [1, 2, 3, 4, 5];
console.log('Example 2 (already sorted):');
console.log('Original:', numbers2);
console.log('Sorted:', bubbleSort(numbers2));
console.log('');

// Example 3: Reverse sorted array
const numbers3 = [5, 4, 3, 2, 1];
console.log('Example 3 (reverse sorted):');
console.log('Original:', numbers3);
console.log('Sorted:', bubbleSort(numbers3));
console.log('');

// Example 4: With duplicates
const numbers4 = [3, 7, 3, 1, 7, 2, 1];
console.log('Example 4 (with duplicates):');
console.log('Original:', numbers4);
console.log('Sorted:', bubbleSort(numbers4));
console.log('');

// Example 5: Verbose mode (uncomment to see step-by-step)
console.log('Example 5 (verbose mode):');
bubbleSortVerbose([64, 34, 25, 12], true);

