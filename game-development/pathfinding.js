/**
 * Pathfinding - JavaScript
 * 
 * Finding paths in game worlds:
 * - A* Algorithm (already in graph-algorithms, but game-specific)
 * - Navigation mesh
 * - Grid-based pathfinding
 */

// Grid-based A* Pathfinding
class GridPathfinder {
    constructor(grid) {
        this.grid = grid; // 2D array: 0 = walkable, 1 = obstacle
        this.width = grid[0].length;
        this.height = grid.length;
    }
    
    // Heuristic function (Manhattan distance)
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    
    // Get neighbors
    getNeighbors(node) {
        const neighbors = [];
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 1, y: 0 },  // Right
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }  // Left
        ];
        
        for (const dir of directions) {
            const x = node.x + dir.x;
            const y = node.y + dir.y;
            
            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                if (this.grid[y][x] === 0) { // Walkable
                    neighbors.push({ x, y });
                }
            }
        }
        
        return neighbors;
    }
    
    // A* pathfinding
    findPath(start, goal) {
        const openSet = [start];
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();
        
        const startKey = `${start.x},${start.y}`;
        const goalKey = `${goal.x},${goal.y}`;
        
        gScore.set(startKey, 0);
        fScore.set(startKey, this.heuristic(start, goal));
        
        while (openSet.length > 0) {
            // Find node with lowest fScore
            let current = openSet.reduce((min, node) => {
                const nodeKey = `${node.x},${node.y}`;
                const minKey = `${min.x},${min.y}`;
                return fScore.get(nodeKey) < fScore.get(minKey) ? node : min;
            });
            
            const currentKey = `${current.x},${current.y}`;
            
            if (currentKey === goalKey) {
                // Reconstruct path
                const path = [];
                let node = current;
                while (node) {
                    path.unshift(node);
                    const nodeKey = `${node.x},${node.y}`;
                    node = cameFrom.get(nodeKey);
                }
                return path;
            }
            
            openSet.splice(openSet.indexOf(current), 1);
            
            for (const neighbor of this.getNeighbors(current)) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                const tentativeGScore = gScore.get(currentKey) + 1;
                
                if (!gScore.has(neighborKey) || tentativeGScore < gScore.get(neighborKey)) {
                    cameFrom.set(neighborKey, current);
                    gScore.set(neighborKey, tentativeGScore);
                    fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, goal));
                    
                    if (!openSet.find(n => `${n.x},${n.y}` === neighborKey)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        
        return null; // No path found
    }
}

// Navigation Mesh (simplified)
class NavMesh {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }
    
    addNode(x, y) {
        const node = { id: this.nodes.length, x, y };
        this.nodes.push(node);
        return node;
    }
    
    addEdge(node1, node2) {
        this.edges.push({ from: node1.id, to: node2.id });
    }
    
    findPath(startNode, endNode) {
        // Simplified pathfinding on nav mesh
        const path = [startNode];
        const visited = new Set([startNode.id]);
        
        const current = startNode;
        // In real implementation, use A* or Dijkstra on the graph
        if (this.hasConnection(current.id, endNode.id)) {
            path.push(endNode);
            return path;
        }
        
        return null;
    }
    
    hasConnection(node1Id, node2Id) {
        return this.edges.some(e => 
            (e.from === node1Id && e.to === node2Id) ||
            (e.from === node2Id && e.to === node1Id)
        );
    }
}

// Example usage
console.log('=== Pathfinding ===\n');

// Grid-based pathfinding
const grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0]
];

const pathfinder = new GridPathfinder(grid);
const start = { x: 0, y: 0 };
const goal = { x: 4, y: 4 };

console.log('Grid-based A* Pathfinding:');
console.log('Grid (0=walkable, 1=obstacle):');
grid.forEach((row, y) => {
    console.log(`  ${row.map((cell, x) => {
        if (x === start.x && y === start.y) return 'S';
        if (x === goal.x && y === goal.y) return 'G';
        return cell;
    }).join(' ')}`);
});

const path = pathfinder.findPath(start, goal);
if (path) {
    console.log('\nPath found:');
    path.forEach((node, i) => {
        console.log(`  Step ${i}: (${node.x}, ${node.y})`);
    });
} else {
    console.log('\nNo path found');
}

// Navigation Mesh
console.log('\nNavigation Mesh:');
const navMesh = new NavMesh();
const node1 = navMesh.addNode(0, 0);
const node2 = navMesh.addNode(2, 2);
const node3 = navMesh.addNode(4, 4);
navMesh.addEdge(node1, node2);
navMesh.addEdge(node2, node3);

const navPath = navMesh.findPath(node1, node3);
if (navPath) {
    console.log('Nav mesh path:', navPath.map(n => `(${n.x}, ${n.y})`).join(' -> '));
}

module.exports = { GridPathfinder, NavMesh };

