"""
Flyweight Pattern - Python

Shares common parts of state between multiple objects to save memory.
Stores intrinsic state (shared) separately from extrinsic state (unique).

Use cases:
- When you need to create a large number of similar objects
- When memory usage is a concern
- When most object state can be made extrinsic
"""


# Flyweight (intrinsic state - shared)
class TreeType:
    def __init__(self, name, color, texture):
        self.name = name
        self.color = color
        self.texture = texture
    
    def render(self, canvas, x, y):
        return f"Rendering {self.name} tree ({self.color}, {self.texture}) at ({x}, {y})"


# Flyweight Factory
class TreeFactory:
    def __init__(self):
        self.tree_types = {}
    
    def get_tree_type(self, name, color, texture):
        key = f"{name}_{color}_{texture}"
        
        if key not in self.tree_types:
            self.tree_types[key] = TreeType(name, color, texture)
            print(f"Creating new tree type: {key}")
        else:
            print(f"Reusing existing tree type: {key}")
        
        return self.tree_types[key]
    
    def get_tree_type_count(self):
        return len(self.tree_types)


# Context (extrinsic state - unique)
class Tree:
    def __init__(self, x, y, tree_type):
        self.x = x
        self.y = y
        self.tree_type = tree_type
    
    def render(self, canvas):
        return self.tree_type.render(canvas, self.x, self.y)


# Forest (manages trees)
class Forest:
    def __init__(self):
        self.trees = []
        self.factory = TreeFactory()
    
    def plant_tree(self, x, y, name, color, texture):
        tree_type = self.factory.get_tree_type(name, color, texture)
        tree = Tree(x, y, tree_type)
        self.trees.append(tree)
    
    def render(self, canvas):
        return [tree.render(canvas) for tree in self.trees]


# Example usage
if __name__ == "__main__":
    print("=== Flyweight Pattern ===\n")
    
    forest = Forest()
    
    # Plant many trees (many will share the same type)
    forest.plant_tree(1, 1, 'Oak', 'Green', 'Rough')
    forest.plant_tree(2, 2, 'Oak', 'Green', 'Rough')  # Reuses type
    forest.plant_tree(3, 3, 'Pine', 'Dark Green', 'Smooth')
    forest.plant_tree(4, 4, 'Oak', 'Green', 'Rough')  # Reuses type
    forest.plant_tree(5, 5, 'Pine', 'Dark Green', 'Smooth')  # Reuses type
    
    print(f"\nTotal trees: {len(forest.trees)}")
    print(f"Unique tree types: {forest.factory.get_tree_type_count()}")
    
    print("\nRendering forest:")
    renderings = forest.render('canvas')
    for rendering in renderings:
        print(rendering)

