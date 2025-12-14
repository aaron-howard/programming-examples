/**
 * Bitonic Sort Implementation in JavaScript
 * 
 * Bitonic sort is a parallel sorting network algorithm. It works by creating
 * bitonic sequences (sequences that first increase then decrease, or vice versa).
 * 
 * Time Complexity: O(log² n) parallel, O(n log² n) sequential
 * Space Complexity: O(n log² n)
 */

function bitonicSort(arr, up = true) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = bitonicSort(arr.slice(0, mid), true);
    const right = bitonicSort(arr.slice(mid), false);
    
    return bitonicMerge([...left, ...right], up);
}

function bitonicMerge(arr, up) {
    if (arr.length <= 1) return arr;
    
    bitonicCompare(arr, up);
    const mid = Math.floor(arr.length / 2);
    const left = bitonicMerge(arr.slice(0, mid), up);
    const right = bitonicMerge(arr.slice(mid), up);
    
    return [...left, ...right];
}

function bitonicCompare(arr, up) {
    const dist = Math.floor(arr.length / 2);
    for (let i = 0; i < dist; i++) {
        if ((arr[i] > arr[i + dist]) === up) {
            [arr[i], arr[i + dist]] = [arr[i + dist], arr[i]];
        }
    }
}

// Example usage
if (require.main === module) {
    const arr = [3, 7, 4, 8, 6, 2, 1, 5];
    console.log('Bitonic Sort:', bitonicSort([...arr]));
}

module.exports = { bitonicSort };

