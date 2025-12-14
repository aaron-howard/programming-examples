"""
Cloud Services - Python

Cloud computing concepts:
- Service abstraction
- Auto-scaling
- Load balancing
"""

import asyncio
from typing import List, Dict, Optional
from dataclasses import dataclass
from datetime import datetime


# Cloud Service
class CloudService:
    def __init__(self, name: str, service_type: str, config: Dict = None):
        self.name = name
        self.type = service_type
        self.config = config or {}
        self.status = 'stopped'
        self.instances: List[Dict] = []
    
    async def provision(self):
        print(f"Provisioning {self.type} service: {self.name}")
        self.status = 'provisioning'
        await asyncio.sleep(1)
        self.status = 'running'
        print(f"✓ Service {self.name} provisioned")
    
    async def scale(self, desired_instances: int):
        current = len(self.instances)
        print(f"Scaling {self.name} from {current} to {desired_instances} instances")
        
        if desired_instances > current:
            # Scale up
            for i in range(current, desired_instances):
                instance = await self.create_instance()
                self.instances.append(instance)
        elif desired_instances < current:
            # Scale down
            to_remove = current - desired_instances
            for i in range(to_remove):
                instance = self.instances.pop()
                await self.destroy_instance(instance)
        
        print(f"✓ Scaled to {len(self.instances)} instances")
    
    async def create_instance(self) -> Dict:
        await asyncio.sleep(0.5)
        return {
            'id': f"instance-{int(datetime.now().timestamp() * 1000)}",
            'status': 'running',
            'created_at': datetime.now()
        }
    
    async def destroy_instance(self, instance: Dict):
        print(f"  Destroying instance {instance['id']}")
        await asyncio.sleep(0.3)


# Auto Scaler
class AutoScaler:
    def __init__(self, service: CloudService, config: Dict):
        self.service = service
        self.min_instances = config.get('min_instances', 1)
        self.max_instances = config.get('max_instances', 10)
        self.target_cpu = config.get('target_cpu', 70)
        self.scale_up_threshold = config.get('scale_up_threshold', 80)
        self.scale_down_threshold = config.get('scale_down_threshold', 30)
    
    async def evaluate(self, cpu_usage: float):
        current_instances = len(self.service.instances)
        
        if cpu_usage > self.scale_up_threshold and current_instances < self.max_instances:
            await self.service.scale(current_instances + 1)
        elif cpu_usage < self.scale_down_threshold and current_instances > self.min_instances:
            await self.service.scale(current_instances - 1)


# Load Balancer
class LoadBalancer:
    def __init__(self, strategy: str = 'round-robin'):
        self.strategy = strategy
        self.backends: List[Dict] = []
        self.current_index = 0
    
    def add_backend(self, backend: Dict):
        self.backends.append({
            **backend,
            'health': 'healthy',
            'requests': 0
        })
    
    def select_backend(self) -> Dict:
        if not self.backends:
            raise ValueError("No backends available")
        
        healthy_backends = [b for b in self.backends if b['health'] == 'healthy']
        if not healthy_backends:
            raise ValueError("No healthy backends available")
        
        if self.strategy == 'round-robin':
            backend = healthy_backends[self.current_index % len(healthy_backends)]
            self.current_index += 1
            backend['requests'] += 1
            return backend
        elif self.strategy == 'least-connections':
            backend = min(healthy_backends, key=lambda b: b['requests'])
            backend['requests'] += 1
            return backend
        else:
            return healthy_backends[0]
    
    def get_stats(self) -> Dict:
        return {
            'total_backends': len(self.backends),
            'healthy_backends': len([b for b in self.backends if b['health'] == 'healthy']),
            'total_requests': sum(b['requests'] for b in self.backends)
        }


# Example usage
async def main():
    print("=== Cloud Services ===\n")
    
    # Auto-scaling service
    web_service = CloudService('web-app', 'compute')
    await web_service.provision()
    await web_service.scale(2)
    
    auto_scaler = AutoScaler(web_service, {
        'min_instances': 1,
        'max_instances': 5,
        'target_cpu': 70,
        'scale_up_threshold': 80,
        'scale_down_threshold': 30
    })
    
    print("\nAuto-scaling evaluation:")
    await auto_scaler.evaluate(85)  # High CPU - should scale up
    await auto_scaler.evaluate(25)  # Low CPU - should scale down
    
    # Load balancing
    print("\nLoad Balancing:")
    load_balancer = LoadBalancer('round-robin')
    
    load_balancer.add_backend({'id': 'backend-1', 'url': 'http://backend1.example.com'})
    load_balancer.add_backend({'id': 'backend-2', 'url': 'http://backend2.example.com'})
    load_balancer.add_backend({'id': 'backend-3', 'url': 'http://backend3.example.com'})
    
    print("Request routing:")
    for i in range(5):
        backend = load_balancer.select_backend()
        print(f"  Request {i + 1} -> {backend['id']}")
    
    print("\nLoad balancer stats:")
    print(load_balancer.get_stats())


if __name__ == "__main__":
    asyncio.run(main())

