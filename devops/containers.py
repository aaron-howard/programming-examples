"""
Containers - Python

Container orchestration concepts:
- Container lifecycle
- Service discovery
- Health checks
"""

import asyncio
import random
from typing import Dict, Optional, List
from dataclasses import dataclass


# Container
class Container:
    def __init__(self, name: str, image: str, config: Dict = None):
        self.name = name
        self.image = image
        self.config = config or {}
        self.ports = self.config.get('ports', [])
        self.env = self.config.get('env', {})
        self.health_check = self.config.get('health_check')
        self.status = 'stopped'
        self.health = 'unknown'
        self._health_task = None
    
    async def start(self):
        print(f"Starting container: {self.name}")
        self.status = 'starting'
        
        # Simulate container startup
        await asyncio.sleep(1)
        self.status = 'running'
        
        # Start health check if configured
        if self.health_check:
            self.start_health_check()
        
        print(f"Container {self.name} is running")
    
    async def stop(self):
        print(f"Stopping container: {self.name}")
        self.status = 'stopping'
        await asyncio.sleep(0.5)
        self.status = 'stopped'
        if self._health_task:
            self._health_task.cancel()
        print(f"Container {self.name} stopped")
    
    async def restart(self):
        await self.stop()
        await self.start()
    
    def start_health_check(self):
        async def health_check_loop():
            while True:
                self.health = await self.check_health()
                await asyncio.sleep(self.health_check.get('interval', 5))
        
        self._health_task = asyncio.create_task(health_check_loop())
    
    async def check_health(self) -> str:
        # Simulate health check
        return 'healthy' if random.random() > 0.1 else 'unhealthy'
    
    def get_status(self) -> Dict:
        return {
            'name': self.name,
            'status': self.status,
            'health': self.health,
            'image': self.image
        }


# Container Orchestrator
class ContainerOrchestrator:
    def __init__(self):
        self.containers: Dict[str, Container] = {}
        self.services: Dict[str, Dict] = {}
    
    def deploy_container(self, container: Container):
        self.containers[container.name] = container
        return container
    
    async def start_container(self, name: str):
        container = self.containers.get(name)
        if container:
            await container.start()
        else:
            raise ValueError(f"Container {name} not found")
    
    async def stop_container(self, name: str):
        container = self.containers.get(name)
        if container:
            await container.stop()
    
    def register_service(self, name: str, container: Container, port: int):
        self.services[name] = {
            'container': container.name,
            'port': port,
            'endpoint': f"http://{container.name}:{port}"
        }
    
    def discover_service(self, name: str) -> Optional[Dict]:
        return self.services.get(name)
    
    def list_containers(self) -> List[Dict]:
        return [container.get_status() for container in self.containers.values()]


# Example usage
async def main():
    print("=== Containers ===\n")
    
    orchestrator = ContainerOrchestrator()
    
    # Deploy containers
    web_container = Container('web-server', 'nginx:latest', {
        'ports': [80, 443],
        'env': {'NODE_ENV': 'production'},
        'health_check': {'interval': 5}
    })
    
    api_container = Container('api-server', 'node:18', {
        'ports': [3000],
        'env': {'PORT': '3000'},
        'health_check': {'interval': 5}
    })
    
    orchestrator.deploy_container(web_container)
    orchestrator.deploy_container(api_container)
    
    # Register services
    orchestrator.register_service('web', web_container, 80)
    orchestrator.register_service('api', api_container, 3000)
    
    # Start containers
    print("Starting containers...")
    await orchestrator.start_container('web-server')
    await orchestrator.start_container('api-server')
    
    # Service discovery
    print("\nService Discovery:")
    web_service = orchestrator.discover_service('web')
    print("Web service:", web_service)
    
    api_service = orchestrator.discover_service('api')
    print("API service:", api_service)
    
    # List containers
    print("\nContainer Status:")
    for container in orchestrator.list_containers():
        print(f"  {container['name']}: {container['status']} ({container['health']})")


if __name__ == "__main__":
    asyncio.run(main())

