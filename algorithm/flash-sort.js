/**
 * Flash Sort Implementation in JavaScript
 * 
 * Flash sort is a distribution-based algorithm that's very fast on uniform data.
 * It uses a classification step to distribute elements into classes, then sorts each class.
 * 
 * Time Complexity: O(n) average on uniform data, O(n log n) worst case
 * Space Complexity: O(n)
 */

function flashSort(arr) {
    if (arr.length === 0) return arr;
    
    const n = arr.length;
    const sorted = [...arr];
    
    // Find min and max
    let min = sorted[0];
    let max = sorted[0];
    for (let i = 1; i < n; i++) {
        if (sorted[i] < min) min = sorted[i];
        if (sorted[i] > max) max = sorted[i];
    }
    
    if (min === max) return sorted;
    
    // Classification
    const m = Math.floor(0.43 * n);
    const l = new Array(m).fill(0);
    const c1 = (m - 1) / (max - min);
    
    for (let i = 0; i < n; i++) {
        const k = Math.floor(c1 * (sorted[i] - min));
        l[k]++;
    }
    
    for (let k = 1; k < m; k++) {
        l[k] += l[k - 1];
    }
    
    // Permutation
    let hold = sorted[0];
    let move = 0;
    let j = 0;
    let k = m - 1;
    
    while (move < n - 1) {
        while (j > l[k] - 1) {
            j++;
            k = Math.floor(c1 * (sorted[j] - min));
        }
        
        const flash = sorted[j];
        while (j !== l[k]) {
            k = Math.floor(c1 * (flash - min));
            hold = sorted[l[k] - 1];
            sorted[l[k] - 1] = flash;
            flash = hold;
            l[k]--;
            move++;
        }
    }
    
    // Insertion sort for final touches
    for (let i = 1; i < n; i++) {
        const key = sorted[i];
        let j = i - 1;
        while (j >= 0 && sorted[j] > key) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        sorted[j + 1] = key;
    }
    
    return sorted;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Flash Sort:', flashSort(arr));
}

module.exports = { flashSort };

