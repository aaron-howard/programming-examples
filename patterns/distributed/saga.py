"""
Saga Pattern - Python

Manages distributed transactions by breaking them into a series of
local transactions with compensating actions.
"""

import asyncio


class SagaStep:
    def __init__(self, name, action, compensation):
        self.name = name
        self.action = action
        self.compensation = compensation
        self.executed = False
    
    async def execute(self):
        try:
            result = await self.action()
            self.executed = True
            return result
        except Exception as error:
            raise error
    
    async def compensate(self):
        if self.executed and self.compensation:
            await self.compensation()
            self.executed = False


class Saga:
    def __init__(self):
        self.steps = []
    
    def add_step(self, step):
        self.steps.append(step)
    
    async def execute(self):
        executed_steps = []
        
        try:
            for step in self.steps:
                await step.execute()
                executed_steps.append(step)
            return {'success': True}
        except Exception as error:
            # Compensate in reverse order
            for step in reversed(executed_steps):
                await step.compensate()
            return {'success': False, 'error': str(error)}


# Example usage
if __name__ == "__main__":
    async def main():
        saga = Saga()
        
        saga.add_step(SagaStep(
            'Reserve Inventory',
            lambda: asyncio.sleep(0.1) or print("Reserving inventory..."),
            lambda: asyncio.sleep(0.1) or print("Releasing inventory...")
        ))
        
        saga.add_step(SagaStep(
            'Charge Payment',
            lambda: asyncio.sleep(0.1) or print("Charging payment..."),
            lambda: asyncio.sleep(0.1) or print("Refunding payment...")
        ))
        
        saga.add_step(SagaStep(
            'Create Order',
            lambda: (_ for _ in ()).throw(Exception("Order creation failed")),
            lambda: asyncio.sleep(0.1) or print("Cancelling order...")
        ))
        
        result = await saga.execute()
        print("Saga result:", result)
    
    asyncio.run(main())

