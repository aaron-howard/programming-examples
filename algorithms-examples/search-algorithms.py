"""
Search Algorithms - Python

Algorithms for finding elements in data structures:
- Binary Search
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
"""

from collections import deque
from typing import List, Optional, Set, Dict


# Binary Search - O(log n)
def binary_search(arr: List[int], target: int) -> int:
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1


# Breadth-First Search (BFS) - Graph traversal
class Graph:
    def __init__(self):
        self.adjacency_list: Dict[str, List[str]] = {}
    
    def add_vertex(self, vertex: str):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []
    
    def add_edge(self, v1: str, v2: str):
        self.adjacency_list[v1].append(v2)
        self.adjacency_list[v2].append(v1)
    
    def bfs(self, start: str, target: str) -> Optional[List[str]]:
        queue = deque([start])
        visited: Set[str] = {start}
        parent: Dict[str, Optional[str]] = {start: None}
        
        while queue:
            vertex = queue.popleft()
            
            if vertex == target:
                # Reconstruct path
                path = []
                current = target
                while current is not None:
                    path.insert(0, current)
                    current = parent[current]
                return path
            
            for neighbor in self.adjacency_list.get(vertex, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    parent[neighbor] = vertex
                    queue.append(neighbor)
        
        return None  # Path not found
    
    def dfs(self, start: str, target: str) -> Optional[List[str]]:
        visited: Set[str] = set()
        path: List[str] = []
        
        def dfs_helper(vertex: str) -> bool:
            if vertex == target:
                path.append(vertex)
                return True
            
            visited.add(vertex)
            path.append(vertex)
            
            for neighbor in self.adjacency_list.get(vertex, []):
                if neighbor not in visited:
                    if dfs_helper(neighbor):
                        return True
            
            path.pop()
            return False
        
        if dfs_helper(start):
            return path
        
        return None


# Linear Search - O(n)
def linear_search(arr: List[int], target: int) -> int:
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1


# Interpolation Search - O(log log n) average
def interpolation_search(arr: List[int], target: int) -> int:
    left = 0
    right = len(arr) - 1
    
    while left <= right and arr[left] <= target <= arr[right]:
        if left == right:
            if arr[left] == target:
                return left
            return -1
        
        pos = left + int(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]))
        
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            left = pos + 1
        else:
            right = pos - 1
    
    return -1


# Example usage
if __name__ == "__main__":
    print("=== Search Algorithms ===\n")
    
    # Binary Search
    print("Binary Search:")
    sorted_array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    print("Array:", sorted_array)
    print("Search for 7:", binary_search(sorted_array, 7))
    print("Search for 12:", binary_search(sorted_array, 12))
    
    # Graph Search
    print("\nGraph Search (BFS & DFS):")
    graph = Graph()
    graph.add_vertex('A')
    graph.add_vertex('B')
    graph.add_vertex('C')
    graph.add_vertex('D')
    graph.add_vertex('E')
    graph.add_edge('A', 'B')
    graph.add_edge('A', 'C')
    graph.add_edge('B', 'D')
    graph.add_edge('C', 'E')
    graph.add_edge('D', 'E')
    
    print("BFS path from A to E:", graph.bfs('A', 'E'))
    print("DFS path from A to E:", graph.dfs('A', 'E'))
    
    # Linear Search
    print("\nLinear Search:")
    unsorted_array = [5, 2, 8, 1, 9, 3]
    print("Array:", unsorted_array)
    print("Search for 8:", linear_search(unsorted_array, 8))
    
    # Interpolation Search
    print("\nInterpolation Search:")
    uniform_array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    print("Array:", uniform_array)
    print("Search for 50:", interpolation_search(uniform_array, 50))

