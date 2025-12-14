"""
Pathfinding - Python

Finding paths in game worlds:
- A* Algorithm (game-specific)
- Navigation mesh
- Grid-based pathfinding
"""

from typing import List, Tuple, Optional, Dict, Set
import heapq


# Grid-based A* Pathfinding
class GridPathfinder:
    def __init__(self, grid: List[List[int]]):
        self.grid = grid  # 2D array: 0 = walkable, 1 = obstacle
        self.width = len(grid[0])
        self.height = len(grid)
    
    def heuristic(self, a: Tuple[int, int], b: Tuple[int, int]) -> float:
        # Manhattan distance
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    
    def get_neighbors(self, node: Tuple[int, int]) -> List[Tuple[int, int]]:
        neighbors = []
        directions = [
            (0, -1),  # Up
            (1, 0),   # Right
            (0, 1),   # Down
            (-1, 0)   # Left
        ]
        
        for dx, dy in directions:
            x = node[0] + dx
            y = node[1] + dy
            
            if 0 <= x < self.width and 0 <= y < self.height:
                if self.grid[y][x] == 0:  # Walkable
                    neighbors.append((x, y))
        
        return neighbors
    
    def find_path(self, start: Tuple[int, int], goal: Tuple[int, int]) -> Optional[List[Tuple[int, int]]]:
        open_set = [(0, start)]
        came_from: Dict[Tuple[int, int], Optional[Tuple[int, int]]] = {}
        g_score: Dict[Tuple[int, int], float] = {start: 0}
        f_score: Dict[Tuple[int, int], float] = {start: self.heuristic(start, goal)}
        visited: Set[Tuple[int, int]] = set()
        
        while open_set:
            current_f, current = heapq.heappop(open_set)
            
            if current in visited:
                continue
            
            visited.add(current)
            
            if current == goal:
                # Reconstruct path
                path = []
                node = current
                while node is not None:
                    path.append(node)
                    node = came_from.get(node)
                return path[::-1]
            
            for neighbor in self.get_neighbors(current):
                if neighbor in visited:
                    continue
                
                tentative_g = g_score[current] + 1
                
                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + self.heuristic(neighbor, goal)
                    heapq.heappush(open_set, (f_score[neighbor], neighbor))
        
        return None  # No path found


# Navigation Mesh (simplified)
class NavMesh:
    def __init__(self):
        self.nodes: List[Dict] = []
        self.edges: List[Dict] = []
    
    def add_node(self, x: float, y: float) -> Dict:
        node = {'id': len(self.nodes), 'x': x, 'y': y}
        self.nodes.append(node)
        return node
    
    def add_edge(self, node1: Dict, node2: Dict):
        self.edges.append({'from': node1['id'], 'to': node2['id']})
    
    def find_path(self, start_node: Dict, end_node: Dict) -> Optional[List[Dict]]:
        # Simplified pathfinding on nav mesh
        path = [start_node]
        
        # In real implementation, use A* or Dijkstra on the graph
        if self.has_connection(start_node['id'], end_node['id']):
            path.append(end_node)
            return path
        
        return None
    
    def has_connection(self, node1_id: int, node2_id: int) -> bool:
        return any(
            (e['from'] == node1_id and e['to'] == node2_id) or
            (e['from'] == node2_id and e['to'] == node1_id)
            for e in self.edges
        )


# Example usage
if __name__ == "__main__":
    print("=== Pathfinding ===\n")
    
    # Grid-based pathfinding
    grid = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ]
    
    pathfinder = GridPathfinder(grid)
    start = (0, 0)
    goal = (4, 4)
    
    print("Grid-based A* Pathfinding:")
    print("Grid (0=walkable, 1=obstacle):")
    for y, row in enumerate(grid):
        display_row = []
        for x, cell in enumerate(row):
            if (x, y) == start:
                display_row.append('S')
            elif (x, y) == goal:
                display_row.append('G')
            else:
                display_row.append(str(cell))
        print(f"  {' '.join(display_row)}")
    
    path = pathfinder.find_path(start, goal)
    if path:
        print("\nPath found:")
        for i, node in enumerate(path):
            print(f"  Step {i}: {node}")
    else:
        print("\nNo path found")
    
    # Navigation Mesh
    print("\nNavigation Mesh:")
    nav_mesh = NavMesh()
    node1 = nav_mesh.add_node(0, 0)
    node2 = nav_mesh.add_node(2, 2)
    node3 = nav_mesh.add_node(4, 4)
    nav_mesh.add_edge(node1, node2)
    nav_mesh.add_edge(node2, node3)
    
    nav_path = nav_mesh.find_path(node1, node3)
    if nav_path:
        path_str = " -> ".join(f"({n['x']}, {n['y']})" for n in nav_path)
        print(f"Nav mesh path: {path_str}")

