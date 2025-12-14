/**
 * Search Algorithms - JavaScript
 * 
 * Algorithms for finding elements in data structures:
 * - Binary Search
 * - Breadth-First Search (BFS)
 * - Depth-First Search (DFS)
 */

// Binary Search - O(log n)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Breadth-First Search (BFS) - Graph traversal
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }
    
    bfs(start, target) {
        const queue = [start];
        const visited = new Set([start]);
        const parent = {};
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            
            if (vertex === target) {
                // Reconstruct path
                const path = [];
                let current = target;
                while (current !== undefined) {
                    path.unshift(current);
                    current = parent[current];
                }
                return path;
            }
            
            for (const neighbor of this.adjacencyList[vertex] || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    parent[neighbor] = vertex;
                    queue.push(neighbor);
                }
            }
        }
        
        return null; // Path not found
    }
    
    dfs(start, target) {
        const visited = new Set();
        const path = [];
        
        const dfsHelper = (vertex) => {
            if (vertex === target) {
                path.push(vertex);
                return true;
            }
            
            visited.add(vertex);
            path.push(vertex);
            
            for (const neighbor of this.adjacencyList[vertex] || []) {
                if (!visited.has(neighbor)) {
                    if (dfsHelper(neighbor)) {
                        return true;
                    }
                }
            }
            
            path.pop();
            return false;
        };
        
        if (dfsHelper(start)) {
            return path;
        }
        
        return null;
    }
}

// Linear Search - O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Interpolation Search - O(log log n) average
function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        if (left === right) {
            if (arr[left] === target) return left;
            return -1;
        }
        
        const pos = left + Math.floor(
            ((target - arr[left]) * (right - left)) / (arr[right] - arr[left])
        );
        
        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
}

// Example usage
console.log('=== Search Algorithms ===\n');

// Binary Search
console.log('Binary Search:');
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log('Array:', sortedArray);
console.log('Search for 7:', binarySearch(sortedArray, 7));
console.log('Search for 12:', binarySearch(sortedArray, 12));

// Graph Search
console.log('\nGraph Search (BFS & DFS):');
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');

console.log('BFS path from A to E:', graph.bfs('A', 'E'));
console.log('DFS path from A to E:', graph.dfs('A', 'E'));

// Linear Search
console.log('\nLinear Search:');
const unsortedArray = [5, 2, 8, 1, 9, 3];
console.log('Array:', unsortedArray);
console.log('Search for 8:', linearSearch(unsortedArray, 8));

// Interpolation Search
console.log('\nInterpolation Search:');
const uniformArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log('Array:', uniformArray);
console.log('Search for 50:', interpolationSearch(uniformArray, 50));

module.exports = { binarySearch, Graph, linearSearch, interpolationSearch };

