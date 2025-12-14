/**
 * Quick Sort Implementation in JavaScript
 * 
 * Quick sort is a divide-and-conquer algorithm that picks a pivot element,
 * partitions the array around the pivot, and recursively sorts the subarrays.
 * 
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average (recursion stack)
 */

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Non-mutating version
function quickSortImmutable(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSortImmutable(left), ...middle, ...quickSortImmutable(right)];
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Quick Sort (immutable):', quickSortImmutable(arr));
    const arr2 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Quick Sort (in-place):', quickSort([...arr2]));
}

module.exports = { quickSort, quickSortImmutable };

