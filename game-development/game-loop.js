/**
 * Game Loop - JavaScript
 * 
 * Core game loop pattern:
 * - Update-render cycle
 * - Frame timing
 * - Delta time calculation
 */

class GameLoop {
    constructor(updateFn, renderFn) {
        this.updateFn = updateFn;
        this.renderFn = renderFn;
        this.running = false;
        this.lastTime = 0;
        this.accumulator = 0;
        this.fps = 0;
        this.frameCount = 0;
        this.fpsTime = 0;
    }
    
    start() {
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    stop() {
        this.running = false;
    }
    
    gameLoop() {
        if (!this.running) return;
        
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;
        
        // Update FPS counter
        this.fpsTime += deltaTime;
        this.frameCount++;
        if (this.fpsTime >= 1.0) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.fpsTime = 0;
        }
        
        // Update game state
        this.updateFn(deltaTime);
        
        // Render
        this.renderFn();
        
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    getFPS() {
        return this.fps;
    }
}

// Fixed timestep game loop
class FixedTimestepLoop {
    constructor(updateFn, renderFn, fixedDelta = 1/60) {
        this.updateFn = updateFn;
        this.renderFn = renderFn;
        this.fixedDelta = fixedDelta;
        this.running = false;
        this.lastTime = 0;
        this.accumulator = 0;
    }
    
    start() {
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    stop() {
        this.running = false;
    }
    
    gameLoop() {
        if (!this.running) return;
        
        const currentTime = performance.now();
        let deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        // Cap delta time
        deltaTime = Math.min(deltaTime, 0.25);
        
        this.accumulator += deltaTime;
        
        // Fixed timestep updates
        while (this.accumulator >= this.fixedDelta) {
            this.updateFn(this.fixedDelta);
            this.accumulator -= this.fixedDelta;
        }
        
        // Render with interpolation
        const alpha = this.accumulator / this.fixedDelta;
        this.renderFn(alpha);
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Example usage
console.log('=== Game Loop ===\n');

let position = { x: 0, y: 0 };
let velocity = { x: 50, y: 30 };

const update = (deltaTime) => {
    position.x += velocity.x * deltaTime;
    position.y += velocity.y * deltaTime;
    
    // Bounce off walls (simplified)
    if (position.x > 800 || position.x < 0) velocity.x *= -1;
    if (position.y > 600 || position.y < 0) velocity.y *= -1;
};

const render = () => {
    // In a real game, this would render to canvas
    console.log(`Position: (${position.x.toFixed(1)}, ${position.y.toFixed(1)})`);
};

const gameLoop = new GameLoop(update, render);

// Simulate a few frames
console.log('Game Loop Simulation:');
for (let i = 0; i < 3; i++) {
    const start = performance.now();
    update(0.016); // ~60 FPS
    render();
    const end = performance.now();
    console.log(`Frame time: ${(end - start).toFixed(2)}ms`);
}

module.exports = { GameLoop, FixedTimestepLoop };

