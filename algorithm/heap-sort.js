/**
 * Heap Sort Implementation in JavaScript
 * 
 * Heap sort uses a binary heap data structure to extract minimum/maximum elements.
 * It builds a max heap, then repeatedly extracts the maximum element.
 * 
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1) - sorts in place
 */

function heapSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(sorted, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [sorted[0], sorted[i]] = [sorted[i], sorted[0]];
        heapify(sorted, i, 0);
    }
    
    return sorted;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Heap Sort:', heapSort(arr));
}

module.exports = { heapSort };

