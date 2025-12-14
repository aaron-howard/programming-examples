"""
Rendering Pipeline - Python

Graphics rendering concepts:
- 2D rendering
- Sprite batching
- Camera/viewport
- Z-ordering
"""

from typing import List, Dict, Tuple


# 2D Renderer
class Renderer2D:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self.sprites: List['Sprite'] = []
        self.camera = {'x': 0, 'y': 0, 'zoom': 1}
    
    def add_sprite(self, sprite: 'Sprite'):
        self.sprites.append(sprite)
    
    def sort_by_depth(self):
        self.sprites.sort(key=lambda s: s.z or 0)
    
    def render(self) -> List[Dict]:
        self.sort_by_depth()
        rendered = []
        
        for sprite in self.sprites:
            # Apply camera transform
            screen_x = (sprite.x - self.camera['x']) * self.camera['zoom']
            screen_y = (sprite.y - self.camera['y']) * self.camera['zoom']
            
            # Culling - only render if in viewport
            if self.is_in_viewport(screen_x, screen_y, sprite.width, sprite.height):
                rendered.append({
                    **sprite.__dict__,
                    'screen_x': screen_x,
                    'screen_y': screen_y
                })
        
        return rendered
    
    def is_in_viewport(self, x: float, y: float, width: float, height: float) -> bool:
        return not (x + width < 0 or x > self.width or y + height < 0 or y > self.height)
    
    def set_camera(self, x: float, y: float, zoom: float = 1):
        self.camera = {'x': x, 'y': y, 'zoom': zoom}


# Sprite
class Sprite:
    def __init__(self, x: float, y: float, width: float, height: float, texture: str, z: int = 0):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.texture = texture
        self.z = z


# Sprite Batch (for efficient rendering)
class SpriteBatch:
    def __init__(self):
        self.sprites: List[Sprite] = []
    
    def add(self, sprite: Sprite):
        self.sprites.append(sprite)
    
    def clear(self):
        self.sprites = []
    
    def render(self) -> Dict[str, List[Sprite]]:
        batches = {}
        
        for sprite in self.sprites:
            if sprite.texture not in batches:
                batches[sprite.texture] = []
            batches[sprite.texture].append(sprite)
        
        return batches


# Example usage
if __name__ == "__main__":
    print("=== Rendering Pipeline ===\n")
    
    renderer = Renderer2D(800, 600)
    
    # Add sprites
    renderer.add_sprite(Sprite(100, 100, 32, 32, 'player.png', 1))
    renderer.add_sprite(Sprite(200, 150, 32, 32, 'enemy.png', 0))
    renderer.add_sprite(Sprite(150, 120, 64, 64, 'background.png', -1))
    renderer.add_sprite(Sprite(300, 200, 32, 32, 'player.png', 1))
    
    print("Rendering with default camera:")
    rendered = renderer.render()
    for sprite in rendered:
        print(f"  {sprite['texture']} at screen ({sprite['screen_x']}, {sprite['screen_y']}), z: {sprite['z']}")
    
    print("\nRendering with camera offset:")
    renderer.set_camera(50, 50)
    rendered2 = renderer.render()
    for sprite in rendered2:
        print(f"  {sprite['texture']} at screen ({sprite['screen_x']}, {sprite['screen_y']})")
    
    # Sprite batching
    print("\nSprite Batching:")
    batch = SpriteBatch()
    batch.add(Sprite(0, 0, 32, 32, 'tile.png'))
    batch.add(Sprite(32, 0, 32, 32, 'tile.png'))
    batch.add(Sprite(64, 0, 32, 32, 'tile.png'))
    batch.add(Sprite(0, 32, 32, 32, 'grass.png'))
    
    batches = batch.render()
    for texture, sprites in batches.items():
        print(f"  Texture: {texture}, Sprites: {len(sprites)}")

