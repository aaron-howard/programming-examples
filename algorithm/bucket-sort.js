/**
 * Bucket Sort Implementation in JavaScript
 * 
 * Bucket sort distributes values into buckets, sorts each bucket, then concatenates.
 * Works best when input is uniformly distributed.
 * 
 * Time Complexity: O(n + k) average, O(n²) worst case
 * Space Complexity: O(n + k)
 */

function bucketSort(arr, bucketCount = 10) {
    if (arr.length === 0) return arr;
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketSize = (max - min) / bucketCount;
    
    // Create buckets
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (const num of arr) {
        const bucketIndex = Math.min(
            Math.floor((num - min) / bucketSize),
            bucketCount - 1
        );
        buckets[bucketIndex].push(num);
    }
    
    // Sort each bucket and concatenate
    const sorted = [];
    for (const bucket of buckets) {
        // Using insertion sort for each bucket (can use any sorting algorithm)
        insertionSort(bucket);
        sorted.push(...bucket);
    }
    
    return sorted;
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Example usage
if (require.main === module) {
    const arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];
    console.log('Bucket Sort:', bucketSort(arr));
}

module.exports = { bucketSort };

