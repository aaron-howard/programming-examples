"""
Entity-Component-System (ECS) - Python

Game architecture pattern:
- Entities: Game objects (just IDs)
- Components: Data containers
- Systems: Logic that operates on components
"""

from typing import Dict, Set, List, Any
from abc import ABC, abstractmethod


# Entity Manager
class EntityManager:
    def __init__(self):
        self.entities: Set[int] = set()
        self.next_id = 0
    
    def create_entity(self) -> int:
        entity_id = self.next_id
        self.next_id += 1
        self.entities.add(entity_id)
        return entity_id
    
    def destroy_entity(self, entity_id: int):
        self.entities.discard(entity_id)


# Component Manager
class ComponentManager:
    def __init__(self):
        self.components: Dict[str, Dict[int, Any]] = {}
    
    def add_component(self, entity: int, component_type: str, data: Any):
        if component_type not in self.components:
            self.components[component_type] = {}
        self.components[component_type][entity] = data
    
    def remove_component(self, entity: int, component_type: str):
        if component_type in self.components:
            self.components[component_type].pop(entity, None)
    
    def get_component(self, entity: int, component_type: str) -> Any:
        return self.components.get(component_type, {}).get(entity)
    
    def get_entities_with_component(self, component_type: str) -> List[int]:
        return list(self.components.get(component_type, {}).keys())


# System Base
class System(ABC):
    def __init__(self, component_manager: ComponentManager):
        self.component_manager = component_manager
    
    @abstractmethod
    def update(self, delta_time: float):
        pass


# Movement System
class MovementSystem(System):
    def update(self, delta_time: float):
        entities = self.component_manager.get_entities_with_component('Position')
        
        for entity in entities:
            position = self.component_manager.get_component(entity, 'Position')
            velocity = self.component_manager.get_component(entity, 'Velocity')
            
            if position and velocity:
                position['x'] += velocity['x'] * delta_time
                position['y'] += velocity['y'] * delta_time


# Render System
class RenderSystem(System):
    def update(self, delta_time: float):
        entities = self.component_manager.get_entities_with_component('Position')
        
        for entity in entities:
            position = self.component_manager.get_component(entity, 'Position')
            sprite = self.component_manager.get_component(entity, 'Sprite')
            
            if position and sprite:
                print(f"Rendering {sprite['name']} at ({position['x']:.1f}, {position['y']:.1f})")


# Health System
class HealthSystem(System):
    def update(self, delta_time: float):
        entities = self.component_manager.get_entities_with_component('Health')
        
        for entity in entities:
            health = self.component_manager.get_component(entity, 'Health')
            
            if health and health['current'] <= 0:
                print(f"Entity {entity} has died")


# ECS Manager
class ECSManager:
    def __init__(self):
        self.entity_manager = EntityManager()
        self.component_manager = ComponentManager()
        self.systems: List[System] = []
    
    def add_system(self, system: System):
        self.systems.append(system)
    
    def update(self, delta_time: float):
        for system in self.systems:
            system.update(delta_time)
    
    def create_entity(self, components: Dict = None) -> int:
        if components is None:
            components = {}
        entity = self.entity_manager.create_entity()
        for component_type, data in components.items():
            self.component_manager.add_component(entity, component_type, data)
        return entity


# Example usage
if __name__ == "__main__":
    print("=== Entity-Component-System ===\n")
    
    ecs = ECSManager()
    
    # Add systems
    ecs.add_system(MovementSystem(ecs.component_manager))
    ecs.add_system(RenderSystem(ecs.component_manager))
    ecs.add_system(HealthSystem(ecs.component_manager))
    
    # Create entities
    player = ecs.create_entity({
        'Position': {'x': 100, 'y': 100},
        'Velocity': {'x': 50, 'y': 30},
        'Sprite': {'name': 'Player', 'color': 'blue'},
        'Health': {'current': 100, 'max': 100}
    })
    
    enemy = ecs.create_entity({
        'Position': {'x': 200, 'y': 150},
        'Velocity': {'x': -20, 'y': 10},
        'Sprite': {'name': 'Enemy', 'color': 'red'},
        'Health': {'current': 50, 'max': 50}
    })
    
    print("Initial state:")
    ecs.update(0)
    
    print("\nAfter 1 second:")
    ecs.update(1.0)
    
    print("\nAfter 2 seconds:")
    ecs.update(1.0)

