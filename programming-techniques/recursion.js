/**
 * Recursion - JavaScript
 * 
 * Programming technique where a function calls itself to solve problems.
 */

// Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Binary Search Tree Traversal
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function inOrderTraversal(node, result = []) {
    if (node) {
        inOrderTraversal(node.left, result);
        result.push(node.value);
        inOrderTraversal(node.right, result);
    }
    return result;
}

// Tower of Hanoi
function towerOfHanoi(n, source, destination, auxiliary) {
    if (n === 1) {
        console.log(`Move disk 1 from ${source} to ${destination}`);
        return;
    }
    towerOfHanoi(n - 1, source, auxiliary, destination);
    console.log(`Move disk ${n} from ${source} to ${destination}`);
    towerOfHanoi(n - 1, auxiliary, destination, source);
}

// Example usage
console.log('=== Recursion ===\n');
console.log('Factorial(5):', factorial(5));
console.log('Fibonacci(7):', fibonacci(7));

const tree = new TreeNode(4);
tree.left = new TreeNode(2);
tree.right = new TreeNode(6);
tree.left.left = new TreeNode(1);
tree.left.right = new TreeNode(3);
console.log('In-order traversal:', inOrderTraversal(tree));

console.log('\nTower of Hanoi (3 disks):');
towerOfHanoi(3, 'A', 'C', 'B');

module.exports = { factorial, fibonacci, TreeNode, inOrderTraversal, towerOfHanoi };

