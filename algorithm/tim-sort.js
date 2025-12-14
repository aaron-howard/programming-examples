/**
 * Tim Sort Implementation in JavaScript
 * 
 * Tim sort is a hybrid of merge sort and insertion sort. It's the default
 * sorting algorithm in Python and Java. It finds runs (already sorted sequences),
 * uses insertion sort for small runs, and merges runs together.
 * 
 * Time Complexity: O(n log n) worst case, O(n) best case
 * Space Complexity: O(n)
 */

const MIN_MERGE = 32;

function timSort(arr) {
    const n = arr.length;
    const sorted = [...arr];
    
    // Sort individual subarrays of size MIN_MERGE
    for (let i = 0; i < n; i += MIN_MERGE) {
        insertionSortTim(sorted, i, Math.min(i + MIN_MERGE - 1, n - 1));
    }
    
    // Merge subarrays
    for (let size = MIN_MERGE; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            
            if (mid < right) {
                mergeTim(sorted, left, mid, right);
            }
        }
    }
    
    return sorted;
}

function insertionSortTim(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function mergeTim(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
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
    console.log('Tim Sort:', timSort(arr));
}

module.exports = { timSort };

