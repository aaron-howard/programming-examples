/**
 * Block Sort Implementation in JavaScript
 * 
 * Block sort is a stable, cache-efficient mergesort variant. It divides the
 * array into blocks and uses a merge operation that's optimized for cache performance.
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

function blockSort(arr) {
    if (arr.length <= 1) return arr;
    
    const blockSize = Math.floor(Math.sqrt(arr.length));
    const sorted = [...arr];
    
    // Sort blocks
    for (let i = 0; i < sorted.length; i += blockSize) {
        const end = Math.min(i + blockSize, sorted.length);
        insertionSortBlock(sorted, i, end);
    }
    
    // Merge blocks
    for (let size = blockSize; size < sorted.length; size *= 2) {
        for (let left = 0; left < sorted.length; left += 2 * size) {
            const mid = Math.min(left + size, sorted.length);
            const right = Math.min(left + 2 * size, sorted.length);
            mergeBlock(sorted, left, mid, right);
        }
    }
    
    return sorted;
}

function insertionSortBlock(arr, left, right) {
    for (let i = left + 1; i < right; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function mergeBlock(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid);
    const rightArr = arr.slice(mid, right);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Block Sort:', blockSort(arr));
}

module.exports = { blockSort };

