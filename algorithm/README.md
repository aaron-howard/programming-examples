# Sorting Algorithms Collection

A comprehensive collection of sorting algorithms implemented in both JavaScript and Python. This repository contains 27 different sorting algorithms, organized by category.

## 📚 Table of Contents

- [Comparison-Based Sorting Algorithms](#comparison-based-sorting-algorithms)
- [Non-Comparison Sorting Algorithms](#non-comparison-sorting-algorithms)
- [Specialized/Theoretical Sorting Algorithms](#specializedtheoretical-sorting-algorithms)
- [Hybrid Sorting Algorithms](#hybrid-sorting-algorithms)
- [Usage](#usage)
- [Algorithm Comparison](#algorithm-comparison)

---

## Comparison-Based Sorting Algorithms

These algorithms determine order by comparing elements.

### 1. **Bubble Sort** (`bubble-sort.js` / `bubble-sort.py`)
- **Description**: Repeatedly swaps adjacent out-of-order elements
- **Time Complexity**: O(n²) worst/average, O(n) best
- **Space Complexity**: O(1)
- **Stable**: Yes

### 2. **Selection Sort** (`selection-sort.js` / `selection-sort.py`)
- **Description**: Repeatedly selects the smallest remaining element
- **Time Complexity**: O(n²) in all cases
- **Space Complexity**: O(1)
- **Stable**: No

### 3. **Insertion Sort** (`insertion-sort.js` / `insertion-sort.py`)
- **Description**: Builds a sorted list one element at a time
- **Time Complexity**: O(n²) worst/average, O(n) best
- **Space Complexity**: O(1)
- **Stable**: Yes

### 4. **Merge Sort** (`merge-sort.js` / `merge-sort.py`)
- **Description**: Divide-and-conquer using merging
- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(n)
- **Stable**: Yes

### 5. **Quick Sort** (`quick-sort.js` / `quick-sort.py`)
- **Description**: Divide-and-conquer using partitioning
- **Time Complexity**: O(n log n) average, O(n²) worst
- **Space Complexity**: O(log n) average
- **Stable**: No

### 6. **Heap Sort** (`heap-sort.js` / `heap-sort.py`)
- **Description**: Uses a binary heap to extract minimum/maximum
- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(1)
- **Stable**: No

### 7. **Shell Sort** (`shell-sort.js` / `shell-sort.py`)
- **Description**: Gap-based generalization of insertion sort
- **Time Complexity**: O(n^1.5) to O(n²) depending on gap sequence
- **Space Complexity**: O(1)
- **Stable**: No

### 8. **Tree Sort** (`tree-sort.js` / `tree-sort.py`)
- **Description**: Inserts elements into a BST, then traverses
- **Time Complexity**: O(n log n) average, O(n²) worst
- **Space Complexity**: O(n)
- **Stable**: Yes

### 9. **Cycle Sort** (`cycle-sort.js` / `cycle-sort.py`)
- **Description**: Minimizes number of writes
- **Time Complexity**: O(n²) in all cases
- **Space Complexity**: O(1)
- **Stable**: No
- **Note**: Useful for flash memory where writes are expensive

### 10. **Cocktail Shaker Sort** (`cocktail-shaker-sort.js` / `cocktail-shaker-sort.py`)
- **Description**: Bidirectional bubble sort
- **Time Complexity**: O(n²) worst/average, O(n) best
- **Space Complexity**: O(1)
- **Stable**: Yes

### 11. **Comb Sort** (`comb-sort.js` / `comb-sort.py`)
- **Description**: Bubble sort with shrinking gap
- **Time Complexity**: O(n²) worst, O(n log n) average
- **Space Complexity**: O(1)
- **Stable**: No

### 12. **Gnome Sort** (`gnome-sort.js` / `gnome-sort.py`)
- **Description**: Simple adjacent-swap method
- **Time Complexity**: O(n²) worst/average, O(n) best
- **Space Complexity**: O(1)
- **Stable**: Yes

### 13. **Odd-Even Sort** (`odd-even-sort.js` / `odd-even-sort.py`)
- **Description**: Parallel-friendly bubble variant
- **Time Complexity**: O(n²) worst/average
- **Space Complexity**: O(1)
- **Stable**: Yes

---

## Non-Comparison Sorting Algorithms

These algorithms don't compare elements directly — they rely on structure or constraints.

### 14. **Counting Sort** (`counting-sort.js` / `counting-sort.py`)
- **Description**: Counts occurrences of each value
- **Time Complexity**: O(n + k) where k is the range
- **Space Complexity**: O(k)
- **Stable**: Yes
- **Note**: Works best when range is small

### 15. **Radix Sort** (`radix-sort.js` / `radix-sort.py`)
- **Description**: Sorts digits/characters by place value
- **Time Complexity**: O(d * (n + k)) where d is digits, k is base
- **Space Complexity**: O(n + k)
- **Stable**: Yes

### 16. **Bucket Sort** (`bucket-sort.js` / `bucket-sort.py`)
- **Description**: Distributes values into buckets, sorts each
- **Time Complexity**: O(n + k) average, O(n²) worst
- **Space Complexity**: O(n + k)
- **Stable**: Yes
- **Note**: Works best on uniformly distributed data

### 17. **Pigeonhole Sort** (`pigeonhole-sort.js` / `pigeonhole-sort.py`)
- **Description**: Extreme version of counting sort
- **Time Complexity**: O(n + range)
- **Space Complexity**: O(range)
- **Stable**: Yes

### 18. **Flash Sort** (`flash-sort.js` / `flash-sort.py`)
- **Description**: Distribution-based, very fast on uniform data
- **Time Complexity**: O(n) average on uniform data, O(n log n) worst
- **Space Complexity**: O(n)
- **Stable**: No

---

## Specialized/Theoretical Sorting Algorithms

Often used for teaching, research, or niche cases.

### 19. **Bitonic Sort** (`bitonic-sort.js` / `bitonic-sort.py`)
- **Description**: Parallel sorting network
- **Time Complexity**: O(log² n) parallel, O(n log² n) sequential
- **Space Complexity**: O(n log² n)
- **Stable**: No
- **Note**: Designed for parallel hardware

### 20. **Odd-Even Merge Sort** (`odd-even-merge-sort.js` / `odd-even-merge-sort.py`)
- **Description**: Sorting network for hardware
- **Time Complexity**: O(log² n) parallel, O(n log² n) sequential
- **Space Complexity**: O(n log² n)
- **Stable**: No

### 21. **Sleep Sort** (`sleep-sort.js` / `sleep-sort.py`)
- **Description**: Joke algorithm using thread timing
- **Time Complexity**: O(max(arr)) - depends on largest value
- **Space Complexity**: O(n)
- **Stable**: Yes (if implemented correctly)
- **Note**: Not practical, demonstration only

### 22. **Bead Sort** (`bead-sort.js` / `bead-sort.py`)
- **Description**: Physical simulation of beads
- **Time Complexity**: O(S) where S is sum of all elements
- **Space Complexity**: O(n * max(arr))
- **Stable**: Yes

### 23. **Spaghetti Sort** (`spaghetti-sort.js` / `spaghetti-sort.py`)
- **Description**: Uses lengths of spaghetti (conceptual)
- **Time Complexity**: O(n) - but requires O(n) space
- **Space Complexity**: O(n)
- **Stable**: Yes

---

## Hybrid Sorting Algorithms

These combine strengths of multiple algorithms.

### 24. **Intro Sort** (`intro-sort.js` / `intro-sort.py`)
- **Description**: Starts with quicksort, switches to heapsort if depth too large, uses insertion sort for small arrays
- **Time Complexity**: O(n log n) worst case
- **Space Complexity**: O(log n)
- **Stable**: No

### 25. **Tim Sort** (`tim-sort.js` / `tim-sort.py`)
- **Description**: Mergesort + insertion sort hybrid (used in Python & Java)
- **Time Complexity**: O(n log n) worst, O(n) best
- **Space Complexity**: O(n)
- **Stable**: Yes
- **Note**: Default sort in Python and Java

### 26. **Block Sort** (`block-sort.js` / `block-sort.py`)
- **Description**: Stable, cache-efficient mergesort variant
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Stable**: Yes

---

## Usage

### JavaScript

```javascript
const { bubbleSort } = require('./bubble-sort');
const arr = [64, 34, 25, 12, 22, 11, 90];
const sorted = bubbleSort(arr);
console.log(sorted); // [11, 12, 22, 25, 34, 64, 90]
```

Or run directly:
```bash
node bubble-sort.js
```

### Python

```python
from bubble_sort import bubble_sort

arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
print(sorted_arr)  # [11, 12, 22, 25, 34, 64, 90]
```

Or run directly:
```bash
python bubble-sort.py
```

---

## Algorithm Comparison

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Shell Sort | O(n log n) | O(n^1.5) | O(n²) | O(1) | No |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(k) | Yes |
| Radix Sort | O(d * n) | O(d * n) | O(d * n) | O(n + k) | Yes |
| Tim Sort | O(n) | O(n log n) | O(n log n) | O(n) | Yes |

---

## Notes

- All implementations create a copy of the input array/list to avoid mutating the original (except where noted as "in-place" versions)
- Time and space complexities are provided for reference
- Stability refers to whether equal elements maintain their relative order
- Some algorithms have multiple implementations (e.g., Quick Sort has both immutable and in-place versions)

---

## Contributing

Feel free to improve these implementations, add optimizations, or suggest additional sorting algorithms!

---

**Total Algorithms**: 27 (including Bubble Sort from the original example)

**Languages**: JavaScript & Python

**Status**: ✅ All algorithms implemented and tested

