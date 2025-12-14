"""
Game Loop - Python

Core game loop pattern:
- Update-render cycle
- Frame timing
- Delta time calculation
"""

import time
from typing import Callable


class GameLoop:
    def __init__(self, update_fn: Callable, render_fn: Callable):
        self.update_fn = update_fn
        self.render_fn = render_fn
        self.running = False
        self.last_time = 0
        self.fps = 0
        self.frame_count = 0
        self.fps_time = 0
    
    def start(self):
        self.running = True
        self.last_time = time.time()
        self.game_loop()
    
    def stop(self):
        self.running = False
    
    def game_loop(self):
        if not self.running:
            return
        
        current_time = time.time()
        delta_time = current_time - self.last_time
        self.last_time = current_time
        
        # Update FPS counter
        self.fps_time += delta_time
        self.frame_count += 1
        if self.fps_time >= 1.0:
            self.fps = self.frame_count
            self.frame_count = 0
            self.fps_time = 0
        
        # Update game state
        self.update_fn(delta_time)
        
        # Render
        self.render_fn()
        
        # Continue loop (simplified - in real game use threading or async)
        if self.running:
            time.sleep(0.016)  # ~60 FPS
            self.game_loop()
    
    def get_fps(self) -> int:
        return self.fps


# Fixed timestep game loop
class FixedTimestepLoop:
    def __init__(self, update_fn: Callable, render_fn: Callable, fixed_delta: float = 1/60):
        self.update_fn = update_fn
        self.render_fn = render_fn
        self.fixed_delta = fixed_delta
        self.running = False
        self.last_time = 0
        self.accumulator = 0
    
    def start(self):
        self.running = True
        self.last_time = time.time()
        self.game_loop()
    
    def stop(self):
        self.running = False
    
    def game_loop(self):
        if not self.running:
            return
        
        current_time = time.time()
        delta_time = current_time - self.last_time
        self.last_time = current_time
        
        # Cap delta time
        delta_time = min(delta_time, 0.25)
        
        self.accumulator += delta_time
        
        # Fixed timestep updates
        while self.accumulator >= self.fixed_delta:
            self.update_fn(self.fixed_delta)
            self.accumulator -= self.fixed_delta
        
        # Render with interpolation
        alpha = self.accumulator / self.fixed_delta
        self.render_fn(alpha)
        
        if self.running:
            time.sleep(0.001)
            self.game_loop()


# Example usage
if __name__ == "__main__":
    print("=== Game Loop ===\n")
    
    position = {'x': 0, 'y': 0}
    velocity = {'x': 50, 'y': 30}
    
    def update(delta_time):
        position['x'] += velocity['x'] * delta_time
        position['y'] += velocity['y'] * delta_time
        
        # Bounce off walls (simplified)
        if position['x'] > 800 or position['x'] < 0:
            velocity['x'] *= -1
        if position['y'] > 600 or position['y'] < 0:
            velocity['y'] *= -1
    
    def render():
        print(f"Position: ({position['x']:.1f}, {position['y']:.1f})")
    
    game_loop = GameLoop(update, render)
    
    # Simulate a few frames
    print("Game Loop Simulation:")
    for i in range(3):
        start = time.time()
        update(0.016)  # ~60 FPS
        render()
        end = time.time()
        print(f"Frame time: {(end - start) * 1000:.2f}ms")

