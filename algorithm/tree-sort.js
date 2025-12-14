/**
 * Tree Sort Implementation in JavaScript
 * 
 * Tree sort inserts elements into a Binary Search Tree (BST), then performs
 * an in-order traversal to get the sorted order.
 * 
 * Time Complexity: O(n log n) average, O(n²) worst (unbalanced tree)
 * Space Complexity: O(n) - for the tree structure
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    
    insert(value) {
        this.root = this._insert(this.root, value);
    }
    
    _insert(node, value) {
        if (node === null) {
            return new TreeNode(value);
        }
        
        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else {
            node.right = this._insert(node.right, value);
        }
        
        return node;
    }
    
    inOrder() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }
    
    _inOrder(node, result) {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.value);
            this._inOrder(node.right, result);
        }
    }
}

function treeSort(arr) {
    const bst = new BST();
    for (const value of arr) {
        bst.insert(value);
    }
    return bst.inOrder();
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log('Tree Sort:', treeSort(arr));
}

module.exports = { treeSort };

