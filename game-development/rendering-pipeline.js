/**
 * Rendering Pipeline - JavaScript
 * 
 * Graphics rendering concepts:
 * - 2D rendering
 * - Sprite batching
 * - Camera/viewport
 * - Z-ordering
 */

// 2D Renderer
class Renderer2D {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.sprites = [];
        this.camera = { x: 0, y: 0, zoom: 1 };
    }
    
    addSprite(sprite) {
        this.sprites.push(sprite);
    }
    
    // Sort by z-order (depth)
    sortByDepth() {
        this.sprites.sort((a, b) => (a.z || 0) - (b.z || 0));
    }
    
    // Render all sprites
    render() {
        this.sortByDepth();
        const rendered = [];
        
        for (const sprite of this.sprites) {
            // Apply camera transform
            const screenX = (sprite.x - this.camera.x) * this.camera.zoom;
            const screenY = (sprite.y - this.camera.y) * this.camera.zoom;
            
            // Culling - only render if in viewport
            if (this.isInViewport(screenX, screenY, sprite.width, sprite.height)) {
                rendered.push({
                    ...sprite,
                    screenX,
                    screenY
                });
            }
        }
        
        return rendered;
    }
    
    isInViewport(x, y, width, height) {
        return !(x + width < 0 || x > this.width || y + height < 0 || y > this.height);
    }
    
    setCamera(x, y, zoom = 1) {
        this.camera = { x, y, zoom };
    }
}

// Sprite
class Sprite {
    constructor(x, y, width, height, texture, z = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.texture = texture;
        this.z = z;
    }
}

// Sprite Batch (for efficient rendering)
class SpriteBatch {
    constructor() {
        this.sprites = [];
    }
    
    add(sprite) {
        this.sprites.push(sprite);
    }
    
    clear() {
        this.sprites = [];
    }
    
    // Batch render (group by texture for efficiency)
    render() {
        const batches = {};
        
        for (const sprite of this.sprites) {
            if (!batches[sprite.texture]) {
                batches[sprite.texture] = [];
            }
            batches[sprite.texture].push(sprite);
        }
        
        return batches;
    }
}

// Example usage
console.log('=== Rendering Pipeline ===\n');

const renderer = new Renderer2D(800, 600);

// Add sprites
renderer.addSprite(new Sprite(100, 100, 32, 32, 'player.png', 1));
renderer.addSprite(new Sprite(200, 150, 32, 32, 'enemy.png', 0));
renderer.addSprite(new Sprite(150, 120, 64, 64, 'background.png', -1));
renderer.addSprite(new Sprite(300, 200, 32, 32, 'player.png', 1));

console.log('Rendering with default camera:');
const rendered = renderer.render();
rendered.forEach(sprite => {
    console.log(`  ${sprite.texture} at screen (${sprite.screenX}, ${sprite.screenY}), z: ${sprite.z}`);
});

console.log('\nRendering with camera offset:');
renderer.setCamera(50, 50);
const rendered2 = renderer.render();
rendered2.forEach(sprite => {
    console.log(`  ${sprite.texture} at screen (${sprite.screenX}, ${sprite.screenY})`);
});

// Sprite batching
console.log('\nSprite Batching:');
const batch = new SpriteBatch();
batch.add(new Sprite(0, 0, 32, 32, 'tile.png'));
batch.add(new Sprite(32, 0, 32, 32, 'tile.png'));
batch.add(new Sprite(64, 0, 32, 32, 'tile.png'));
batch.add(new Sprite(0, 32, 32, 32, 'grass.png'));

const batches = batch.render();
for (const [texture, sprites] of Object.entries(batches)) {
    console.log(`  Texture: ${texture}, Sprites: ${sprites.length}`);
}

module.exports = { Renderer2D, Sprite, SpriteBatch };

