"""
Tree Sort Implementation in Python

Tree sort inserts elements into a Binary Search Tree (BST), then performs
an in-order traversal to get the sorted order.

Time Complexity: O(n log n) average, O(n²) worst (unbalanced tree)
Space Complexity: O(n) - for the tree structure
"""


class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        self.root = self._insert(self.root, value)
    
    def _insert(self, node, value):
        if node is None:
            return TreeNode(value)
        
        if value < node.value:
            node.left = self._insert(node.left, value)
        else:
            node.right = self._insert(node.right, value)
        
        return node
    
    def in_order(self):
        result = []
        self._in_order(self.root, result)
        return result
    
    def _in_order(self, node, result):
        if node is not None:
            self._in_order(node.left, result)
            result.append(node.value)
            self._in_order(node.right, result)


def tree_sort(arr):
    bst = BST()
    for value in arr:
        bst.insert(value)
    return bst.in_order()


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Tree Sort:", tree_sort(arr))

