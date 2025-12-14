"""
CI/CD - Python

Continuous Integration and Continuous Deployment:
- Build pipeline
- Testing stages
- Deployment automation
"""

import asyncio
from typing import List, Callable, Dict, Any
from abc import ABC, abstractmethod


# CI/CD Pipeline
class CICDPipeline:
    def __init__(self, name: str):
        self.name = name
        self.stages: List['PipelineStage'] = []
        self.current_stage = None
    
    def add_stage(self, stage: 'PipelineStage'):
        self.stages.append(stage)
        return self
    
    async def execute(self):
        print(f"Starting pipeline: {self.name}")
        
        for stage in self.stages:
            self.current_stage = stage
            print(f"\nExecuting stage: {stage.name}")
            
            try:
                await stage.execute()
                print(f"✓ Stage {stage.name} completed")
            except Exception as error:
                print(f"✗ Stage {stage.name} failed: {error}")
                if stage.required:
                    raise
        
        print(f"\nPipeline {self.name} completed successfully")


# Pipeline Stage
class PipelineStage(ABC):
    def __init__(self, name: str, required: bool = True):
        self.name = name
        self.required = required
    
    @abstractmethod
    async def execute(self) -> Dict[str, Any]:
        pass


# Build Stage
class BuildStage(PipelineStage):
    def __init__(self, project_type: str = 'python'):
        super().__init__('Build')
        self.project_type = project_type
    
    async def execute(self) -> Dict[str, Any]:
        print(f"  Building {self.project_type} project...")
        await asyncio.sleep(1)  # Simulate build
        print("  Build artifacts created")
        return {'artifacts': ['dist/', 'build/']}


# Test Stage
class TestStage(PipelineStage):
    def __init__(self, test_types: List[str] = None):
        super().__init__('Test')
        self.test_types = test_types or ['unit', 'integration']
    
    async def execute(self) -> Dict[str, Any]:
        print(f"  Running tests: {', '.join(self.test_types)}")
        for test_type in self.test_types:
            print(f"    Running {test_type} tests...")
            await asyncio.sleep(0.5)
            print(f"    ✓ {test_type} tests passed")
        return {'passed': True, 'coverage': 85}


# Deploy Stage
class DeployStage(PipelineStage):
    def __init__(self, environment: str = 'staging'):
        super().__init__('Deploy')
        self.environment = environment
    
    async def execute(self) -> Dict[str, Any]:
        print(f"  Deploying to {self.environment}...")
        await asyncio.sleep(2)
        print(f"  Deployment to {self.environment} successful")
        return {'environment': self.environment, 'url': f'https://{self.environment}.example.com'}


# Example usage
async def main():
    print("=== CI/CD Pipeline ===\n")
    
    pipeline = CICDPipeline('Production Deployment')
    
    pipeline \
        .add_stage(BuildStage('python')) \
        .add_stage(TestStage(['unit', 'integration', 'e2e'])) \
        .add_stage(DeployStage('staging')) \
        .add_stage(DeployStage('production'))
    
    # Execute pipeline
    try:
        await pipeline.execute()
    except Exception as error:
        print(f"Pipeline failed: {error}")


if __name__ == "__main__":
    asyncio.run(main())

