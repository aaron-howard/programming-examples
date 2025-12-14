"""
Graph Algorithms - Python

Algorithms for working with graphs:
- Dijkstra's Algorithm (shortest path)
- A* Algorithm (pathfinding with heuristics)
- Kruskal's Algorithm (minimum spanning tree)
"""

import heapq
from typing import Dict, List, Optional, Tuple


# Dijkstra's Algorithm - Shortest path
class WeightedGraph:
    def __init__(self):
        self.adjacency_list: Dict[str, List[Tuple[str, int]]] = {}
    
    def add_vertex(self, vertex: str):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []
    
    def add_edge(self, v1: str, v2: str, weight: int):
        self.adjacency_list[v1].append((v2, weight))
        self.adjacency_list[v2].append((v1, weight))
    
    def dijkstra(self, start: str, finish: str) -> Optional[List[str]]:
        nodes = [(0, start)]
        distances = {start: 0}
        previous = {start: None}
        visited = set()
        
        while nodes:
            current_distance, smallest = heapq.heappop(nodes)
            
            if smallest in visited:
                continue
            
            visited.add(smallest)
            
            if smallest == finish:
                # Build path
                path = []
                current = finish
                while current is not None:
                    path.append(current)
                    current = previous[current]
                return path[::-1]
            
            for neighbor, weight in self.adjacency_list.get(smallest, []):
                if neighbor in visited:
                    continue
                
                candidate = distances[smallest] + weight
                
                if neighbor not in distances or candidate < distances[neighbor]:
                    distances[neighbor] = candidate
                    previous[neighbor] = smallest
                    heapq.heappush(nodes, (candidate, neighbor))
        
        return None


# Kruskal's Algorithm - Minimum Spanning Tree
class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False
        
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True


def kruskal_mst(vertices: List[str], edges: List[Dict]) -> List[Dict]:
    edges_sorted = sorted(edges, key=lambda x: x['weight'])
    uf = UnionFind(len(vertices))
    mst = []
    
    for edge in edges_sorted:
        v1_index = vertices.index(edge['v1'])
        v2_index = vertices.index(edge['v2'])
        
        if uf.union(v1_index, v2_index):
            mst.append(edge)
            if len(mst) == len(vertices) - 1:
                break
    
    return mst


# Example usage
if __name__ == "__main__":
    print("=== Graph Algorithms ===\n")
    
    # Dijkstra's Algorithm
    print("Dijkstra's Algorithm:")
    graph = WeightedGraph()
    graph.add_vertex('A')
    graph.add_vertex('B')
    graph.add_vertex('C')
    graph.add_vertex('D')
    graph.add_vertex('E')
    graph.add_vertex('F')
    
    graph.add_edge('A', 'B', 4)
    graph.add_edge('A', 'C', 2)
    graph.add_edge('B', 'E', 3)
    graph.add_edge('C', 'D', 2)
    graph.add_edge('C', 'F', 4)
    graph.add_edge('D', 'E', 3)
    graph.add_edge('D', 'F', 1)
    graph.add_edge('E', 'F', 1)
    
    print("Shortest path from A to E:", graph.dijkstra('A', 'E'))
    
    # Kruskal's Algorithm
    print("\nKruskal's Algorithm (MST):")
    vertices = ['A', 'B', 'C', 'D', 'E']
    edges = [
        {'v1': 'A', 'v2': 'B', 'weight': 4},
        {'v1': 'A', 'v2': 'C', 'weight': 2},
        {'v1': 'B', 'v2': 'C', 'weight': 1},
        {'v1': 'B', 'v2': 'D', 'weight': 5},
        {'v1': 'C', 'v2': 'D', 'weight': 8},
        {'v1': 'C', 'v2': 'E', 'weight': 10},
        {'v1': 'D', 'v2': 'E', 'weight': 2}
    ]
    
    mst = kruskal_mst(vertices, edges)
    print("Minimum Spanning Tree edges:")
    for edge in mst:
        print(f"  {edge['v1']} - {edge['v2']} (weight: {edge['weight']})")

