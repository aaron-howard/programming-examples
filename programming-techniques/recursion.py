"""
Recursion - Python

Programming technique where a function calls itself to solve problems.
"""


# Factorial
def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)


# Fibonacci
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


# Binary Search Tree Traversal
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def in_order_traversal(node, result=None):
    if result is None:
        result = []
    if node:
        in_order_traversal(node.left, result)
        result.append(node.value)
        in_order_traversal(node.right, result)
    return result


# Tower of Hanoi
def tower_of_hanoi(n, source, destination, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    tower_of_hanoi(n - 1, source, auxiliary, destination)
    print(f"Move disk {n} from {source} to {destination}")
    tower_of_hanoi(n - 1, auxiliary, destination, source)


# Example usage
if __name__ == "__main__":
    print("=== Recursion ===\n")
    print("Factorial(5):", factorial(5))
    print("Fibonacci(7):", fibonacci(7))
    
    tree = TreeNode(4)
    tree.left = TreeNode(2)
    tree.right = TreeNode(6)
    tree.left.left = TreeNode(1)
    tree.left.right = TreeNode(3)
    print("In-order traversal:", in_order_traversal(tree))
    
    print("\nTower of Hanoi (3 disks):")
    tower_of_hanoi(3, 'A', 'C', 'B')

