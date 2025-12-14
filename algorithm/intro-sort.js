/**
 * Intro Sort Implementation in JavaScript
 * 
 * Intro sort (introsort) starts with quicksort, but switches to heapsort if
 * the recursion depth becomes too large, and uses insertion sort for small arrays.
 * This combines the best of all three algorithms.
 * 
 * Time Complexity: O(n log n) worst case
 * Space Complexity: O(log n)
 */

function introSort(arr) {
    const maxDepth = Math.floor(Math.log2(arr.length)) * 2;
    return introSortRecursive([...arr], 0, arr.length - 1, maxDepth);
}

function introSortRecursive(arr, low, high, maxDepth) {
    const size = high - low + 1;
    
    // Use insertion sort for small arrays
    if (size < 16) {
        return insertionSort(arr, low, high);
    }
    
    // If max depth reached, use heap sort
    if (maxDepth === 0) {
        heapSort(arr, low, high);
        return arr;
    }
    
    // Otherwise use quicksort
    const pivot = partition(arr, low, high);
    introSortRecursive(arr, low, pivot - 1, maxDepth - 1);
    introSortRecursive(arr, pivot + 1, high, maxDepth - 1);
    
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

function insertionSort(arr, low, high) {
    for (let i = low + 1; i <= high; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= low && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

function heapSort(arr, low, high) {
    const n = high - low + 1;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, low + i, low);
    }
    
    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [arr[low], arr[low + i]] = [arr[low + i], arr[low]];
        heapify(arr, i, low, low);
    }
    
    return arr;
}

function heapify(arr, n, i, offset) {
    let largest = i;
    const left = offset + 2 * (i - offset) + 1;
    const right = offset + 2 * (i - offset) + 2;
    
    if (left < offset + n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < offset + n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest, offset);
    }
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Intro Sort:', introSort(arr));
}

module.exports = { introSort };

