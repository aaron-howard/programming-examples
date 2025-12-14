/**
 * Flyweight Pattern - JavaScript
 * 
 * Shares common parts of state between multiple objects to save memory.
 * Stores intrinsic state (shared) separately from extrinsic state (unique).
 * 
 * Use cases:
 * - When you need to create a large number of similar objects
 * - When memory usage is a concern
 * - When most object state can be made extrinsic
 */

// Flyweight (intrinsic state - shared)
class TreeType {
    constructor(name, color, texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }
    
    render(canvas, x, y) {
        return `Rendering ${this.name} tree (${this.color}, ${this.texture}) at (${x}, ${y})`;
    }
}

// Flyweight Factory
class TreeFactory {
    constructor() {
        this.treeTypes = {};
    }
    
    getTreeType(name, color, texture) {
        const key = `${name}_${color}_${texture}`;
        
        if (!this.treeTypes[key]) {
            this.treeTypes[key] = new TreeType(name, color, texture);
            console.log(`Creating new tree type: ${key}`);
        } else {
            console.log(`Reusing existing tree type: ${key}`);
        }
        
        return this.treeTypes[key];
    }
    
    getTreeTypeCount() {
        return Object.keys(this.treeTypes).length;
    }
}

// Context (extrinsic state - unique)
class Tree {
    constructor(x, y, treeType) {
        this.x = x;
        this.y = y;
        this.treeType = treeType;
    }
    
    render(canvas) {
        return this.treeType.render(canvas, this.x, this.y);
    }
}

// Forest (manages trees)
class Forest {
    constructor() {
        this.trees = [];
        this.factory = new TreeFactory();
    }
    
    plantTree(x, y, name, color, texture) {
        const treeType = this.factory.getTreeType(name, color, texture);
        const tree = new Tree(x, y, treeType);
        this.trees.push(tree);
    }
    
    render(canvas) {
        return this.trees.map(tree => tree.render(canvas));
    }
}

// Example usage
console.log('=== Flyweight Pattern ===\n');

const forest = new Forest();

// Plant many trees (many will share the same type)
forest.plantTree(1, 1, 'Oak', 'Green', 'Rough');
forest.plantTree(2, 2, 'Oak', 'Green', 'Rough'); // Reuses type
forest.plantTree(3, 3, 'Pine', 'Dark Green', 'Smooth');
forest.plantTree(4, 4, 'Oak', 'Green', 'Rough'); // Reuses type
forest.plantTree(5, 5, 'Pine', 'Dark Green', 'Smooth'); // Reuses type

console.log(`\nTotal trees: ${forest.trees.length}`);
console.log(`Unique tree types: ${forest.factory.getTreeTypeCount()}`);

console.log('\nRendering forest:');
const renderings = forest.render('canvas');
renderings.forEach(rendering => console.log(rendering));

module.exports = { TreeType, TreeFactory, Tree, Forest };

