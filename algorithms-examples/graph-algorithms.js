/**
 * Graph Algorithms - JavaScript
 * 
 * Algorithms for working with graphs:
 * - Dijkstra's Algorithm (shortest path)
 * - A* Algorithm (pathfinding with heuristics)
 * - Kruskal's Algorithm (minimum spanning tree)
 */

// Dijkstra's Algorithm - Shortest path
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(v1, v2, weight) {
        this.adjacencyList[v1].push({ node: v2, weight });
        this.adjacencyList[v2].push({ node: v1, weight });
    }
    
    dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        const path = [];
        let smallest;
        
        // Initialize distances
        for (const vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            
            if (smallest === finish) {
                // Build path
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                path.push(start);
                return path.reverse();
            }
            
            if (smallest || distances[smallest] !== Infinity) {
                for (const neighbor of this.adjacencyList[smallest]) {
                    const candidate = distances[smallest] + neighbor.weight;
                    const nextNeighbor = neighbor.node;
                    
                    if (candidate < distances[nextNeighbor]) {
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        
        return null;
    }
}

// Simple Priority Queue for Dijkstra
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }
    
    dequeue() {
        return this.values.shift();
    }
    
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

// A* Algorithm - Pathfinding with heuristics
class AStar {
    constructor(graph, heuristic) {
        this.graph = graph;
        this.heuristic = heuristic;
    }
    
    findPath(start, goal) {
        const openSet = [start];
        const cameFrom = {};
        const gScore = { [start]: 0 };
        const fScore = { [start]: this.heuristic(start, goal) };
        
        while (openSet.length > 0) {
            let current = openSet.reduce((min, node) => 
                fScore[node] < fScore[min] ? node : min
            );
            
            if (current === goal) {
                // Reconstruct path
                const path = [current];
                while (current in cameFrom) {
                    current = cameFrom[current];
                    path.unshift(current);
                }
                return path;
            }
            
            openSet.splice(openSet.indexOf(current), 1);
            
            for (const neighbor of this.graph.adjacencyList[current] || []) {
                const tentativeGScore = gScore[current] + neighbor.weight;
                
                if (!(neighbor.node in gScore) || tentativeGScore < gScore[neighbor.node]) {
                    cameFrom[neighbor.node] = current;
                    gScore[neighbor.node] = tentativeGScore;
                    fScore[neighbor.node] = gScore[neighbor.node] + this.heuristic(neighbor.node, goal);
                    
                    if (!openSet.includes(neighbor.node)) {
                        openSet.push(neighbor.node);
                    }
                }
            }
        }
        
        return null;
    }
}

// Kruskal's Algorithm - Minimum Spanning Tree
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        return true;
    }
}

function kruskalMST(vertices, edges) {
    edges.sort((a, b) => a.weight - b.weight);
    const uf = new UnionFind(vertices.length);
    const mst = [];
    
    for (const edge of edges) {
        const v1Index = vertices.indexOf(edge.v1);
        const v2Index = vertices.indexOf(edge.v2);
        
        if (uf.union(v1Index, v2Index)) {
            mst.push(edge);
            if (mst.length === vertices.length - 1) break;
        }
    }
    
    return mst;
}

// Example usage
console.log('=== Graph Algorithms ===\n');

// Dijkstra's Algorithm
console.log('Dijkstra\'s Algorithm:');
const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

console.log('Shortest path from A to E:', graph.dijkstra('A', 'E'));

// Kruskal's Algorithm
console.log('\nKruskal\'s Algorithm (MST):');
const vertices = ['A', 'B', 'C', 'D', 'E'];
const edges = [
    { v1: 'A', v2: 'B', weight: 4 },
    { v1: 'A', v2: 'C', weight: 2 },
    { v1: 'B', v2: 'C', weight: 1 },
    { v1: 'B', v2: 'D', weight: 5 },
    { v1: 'C', v2: 'D', weight: 8 },
    { v1: 'C', v2: 'E', weight: 10 },
    { v1: 'D', v2: 'E', weight: 2 }
];

const mst = kruskalMST(vertices, edges);
console.log('Minimum Spanning Tree edges:');
mst.forEach(edge => {
    console.log(`  ${edge.v1} - ${edge.v2} (weight: ${edge.weight})`);
});

module.exports = { WeightedGraph, AStar, kruskalMST, UnionFind };

