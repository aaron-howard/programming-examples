/**
 * Entity-Component-System (ECS) - JavaScript
 * 
 * Game architecture pattern:
 * - Entities: Game objects (just IDs)
 * - Components: Data containers
 * - Systems: Logic that operates on components
 */

// Entity Manager
class EntityManager {
    constructor() {
        this.entities = new Set();
        this.nextId = 0;
    }
    
    createEntity() {
        const id = this.nextId++;
        this.entities.add(id);
        return id;
    }
    
    destroyEntity(id) {
        this.entities.delete(id);
    }
}

// Component Manager
class ComponentManager {
    constructor() {
        this.components = {};
    }
    
    addComponent(entity, componentType, data) {
        if (!this.components[componentType]) {
            this.components[componentType] = new Map();
        }
        this.components[componentType].set(entity, data);
    }
    
    removeComponent(entity, componentType) {
        if (this.components[componentType]) {
            this.components[componentType].delete(entity);
        }
    }
    
    getComponent(entity, componentType) {
        return this.components[componentType]?.get(entity);
    }
    
    getEntitiesWithComponent(componentType) {
        return Array.from(this.components[componentType]?.keys() || []);
    }
}

// System Base
class System {
    constructor(componentManager) {
        this.componentManager = componentManager;
    }
    
    update(deltaTime) {
        throw new Error('Update method must be implemented');
    }
}

// Movement System
class MovementSystem extends System {
    update(deltaTime) {
        const entities = this.componentManager.getEntitiesWithComponent('Position');
        
        for (const entity of entities) {
            const position = this.componentManager.getComponent(entity, 'Position');
            const velocity = this.componentManager.getComponent(entity, 'Velocity');
            
            if (position && velocity) {
                position.x += velocity.x * deltaTime;
                position.y += velocity.y * deltaTime;
            }
        }
    }
}

// Render System
class RenderSystem extends System {
    update(deltaTime) {
        const entities = this.componentManager.getEntitiesWithComponent('Position');
        
        for (const entity of entities) {
            const position = this.componentManager.getComponent(entity, 'Position');
            const sprite = this.componentManager.getComponent(entity, 'Sprite');
            
            if (position && sprite) {
                console.log(`Rendering ${sprite.name} at (${position.x.toFixed(1)}, ${position.y.toFixed(1)})`);
            }
        }
    }
}

// Health System
class HealthSystem extends System {
    update(deltaTime) {
        const entities = this.componentManager.getEntitiesWithComponent('Health');
        
        for (const entity of entities) {
            const health = this.componentManager.getComponent(entity, 'Health');
            
            if (health && health.current <= 0) {
                console.log(`Entity ${entity} has died`);
                // Could trigger death event here
            }
        }
    }
}

// ECS Manager
class ECSManager {
    constructor() {
        this.entityManager = new EntityManager();
        this.componentManager = new ComponentManager();
        this.systems = [];
    }
    
    addSystem(system) {
        this.systems.push(system);
    }
    
    update(deltaTime) {
        for (const system of this.systems) {
            system.update(deltaTime);
        }
    }
    
    createEntity(components = {}) {
        const entity = this.entityManager.createEntity();
        for (const [type, data] of Object.entries(components)) {
            this.componentManager.addComponent(entity, type, data);
        }
        return entity;
    }
}

// Example usage
console.log('=== Entity-Component-System ===\n');

const ecs = new ECSManager();

// Add systems
ecs.addSystem(new MovementSystem(ecs.componentManager));
ecs.addSystem(new RenderSystem(ecs.componentManager));
ecs.addSystem(new HealthSystem(ecs.componentManager));

// Create entities
const player = ecs.createEntity({
    Position: { x: 100, y: 100 },
    Velocity: { x: 50, y: 30 },
    Sprite: { name: 'Player', color: 'blue' },
    Health: { current: 100, max: 100 }
});

const enemy = ecs.createEntity({
    Position: { x: 200, y: 150 },
    Velocity: { x: -20, y: 10 },
    Sprite: { name: 'Enemy', color: 'red' },
    Health: { current: 50, max: 50 }
});

console.log('Initial state:');
ecs.update(0);

console.log('\nAfter 1 second:');
ecs.update(1.0);

console.log('\nAfter 2 seconds:');
ecs.update(1.0);

module.exports = { EntityManager, ComponentManager, System, MovementSystem, RenderSystem, ECSManager };

