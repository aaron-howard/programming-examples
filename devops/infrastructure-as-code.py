"""
Infrastructure as Code - Python

Managing infrastructure through code:
- Resource definitions
- Configuration management
- Provisioning
"""

import asyncio
from typing import List, Dict, Any
from dataclasses import dataclass


# Infrastructure Resource
class InfrastructureResource:
    def __init__(self, resource_type: str, name: str, config: Dict = None):
        self.type = resource_type
        self.name = name
        self.config = config or {}
        self.state = 'pending'
    
    async def provision(self):
        print(f"Provisioning {self.type}: {self.name}")
        self.state = 'provisioning'
        
        # Simulate provisioning
        await asyncio.sleep(0.5)
        self.state = 'provisioned'
        
        print(f"✓ {self.type} {self.name} provisioned")
        return self
    
    async def destroy(self):
        print(f"Destroying {self.type}: {self.name}")
        self.state = 'destroying'
        await asyncio.sleep(0.3)
        self.state = 'destroyed'
        print(f"✓ {self.type} {self.name} destroyed")
    
    def get_info(self) -> Dict:
        return {
            'type': self.type,
            'name': self.name,
            'state': self.state
        }


# Infrastructure Stack
class InfrastructureStack:
    def __init__(self, name: str):
        self.name = name
        self.resources: List[InfrastructureResource] = []
    
    def add_resource(self, resource: InfrastructureResource):
        self.resources.append(resource)
        return self
    
    async def deploy(self):
        print(f"Deploying stack: {self.name}")
        print(f"Resources: {len(self.resources)}")
        
        for resource in self.resources:
            await resource.provision()
        
        print(f"\nStack {self.name} deployed successfully")
    
    async def destroy(self):
        print(f"Destroying stack: {self.name}")
        
        # Destroy in reverse order
        for resource in reversed(self.resources):
            await resource.destroy()
        
        print(f"\nStack {self.name} destroyed")
    
    def get_resources(self) -> List[Dict]:
        return [resource.get_info() for resource in self.resources]


# Resource Factory
class ResourceFactory:
    @staticmethod
    def create_server(name: str, config: Dict = None) -> InfrastructureResource:
        config = config or {}
        return InfrastructureResource('server', name, {
            'cpu': config.get('cpu', 2),
            'memory': config.get('memory', '4GB'),
            **config
        })
    
    @staticmethod
    def create_database(name: str, config: Dict = None) -> InfrastructureResource:
        config = config or {}
        return InfrastructureResource('database', name, {
            'engine': config.get('engine', 'postgresql'),
            'version': config.get('version', '14'),
            **config
        })
    
    @staticmethod
    def create_load_balancer(name: str, config: Dict = None) -> InfrastructureResource:
        config = config or {}
        return InfrastructureResource('load_balancer', name, {
            'type': config.get('type', 'application'),
            **config
        })


# Example usage
async def main():
    print("=== Infrastructure as Code ===\n")
    
    stack = InfrastructureStack('production')
    
    # Define infrastructure
    stack \
        .add_resource(ResourceFactory.create_server('web-server-1', {'cpu': 4, 'memory': '8GB'})) \
        .add_resource(ResourceFactory.create_server('web-server-2', {'cpu': 4, 'memory': '8GB'})) \
        .add_resource(ResourceFactory.create_database('main-db', {'engine': 'postgresql', 'version': '14'})) \
        .add_resource(ResourceFactory.create_load_balancer('app-lb', {'type': 'application'}))
    
    # Deploy stack
    await stack.deploy()
    
    # Show resources
    print("\nStack Resources:")
    for resource in stack.get_resources():
        print(f"  {resource['type']}: {resource['name']} ({resource['state']})")


if __name__ == "__main__":
    asyncio.run(main())

