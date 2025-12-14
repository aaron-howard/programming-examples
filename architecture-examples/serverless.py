"""
Serverless Architecture - Python

Architecture where code runs in stateless functions triggered by events,
managed by cloud providers (AWS Lambda, Azure Functions, etc.)
"""

import json
import asyncio
from typing import Dict, Callable, Any


# Simulated Serverless Function Handler
class ServerlessFunction:
    def __init__(self, name: str, handler: Callable):
        self.name = name
        self.handler = handler
        self.invocations = 0
        self.cold_starts = 0
    
    async def invoke(self, event: Dict, context: Dict) -> Dict:
        is_cold_start = self.invocations == 0
        if is_cold_start:
            self.cold_starts += 1
            print(f"[{self.name}] Cold start - initializing...")
            await self.initialize()
        
        self.invocations += 1
        print(f"[{self.name}] Invocation #{self.invocations}")
        
        try:
            result = await self.handler(event, context)
            return {
                'statusCode': 200,
                'body': json.dumps(result)
            }
        except Exception as error:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': str(error)})
            }
    
    async def initialize(self):
        # Simulate initialization (DB connections, etc.)
        await asyncio.sleep(0.1)


# API Gateway Handler
class APIGateway:
    def __init__(self):
        self.functions: Dict[str, ServerlessFunction] = {}
    
    def register_function(self, path: str, method: str, func: ServerlessFunction):
        key = f"{method}:{path}"
        self.functions[key] = func
    
    async def handle_request(self, method: str, path: str, body: str = None) -> Dict:
        key = f"{method}:{path}"
        func = self.functions.get(key)
        
        if not func:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Not found'})
            }
        
        event = {'path': path, 'method': method, 'body': json.loads(body or '{}')}
        context = {'requestId': str(int(__import__('time').time()))}
        
        return await func.invoke(event, context)


# Example Functions
async def user_handler(event: Dict, context: Dict) -> Dict:
    return {
        'message': 'User created',
        'userId': int(__import__('time').time()),
        'data': event['body']
    }


async def order_handler(event: Dict, context: Dict) -> Dict:
    return {
        'message': 'Order processed',
        'orderId': int(__import__('time').time()),
        'data': event['body']
    }


# Example usage
async def main():
    print("=== Serverless Architecture ===\n")
    
    gateway = APIGateway()
    
    create_user = ServerlessFunction('createUser', user_handler)
    process_order = ServerlessFunction('processOrder', order_handler)
    
    gateway.register_function('/users', 'POST', create_user)
    gateway.register_function('/orders', 'POST', process_order)
    
    print("Invoking functions:")
    print(await gateway.handle_request('POST', '/users', json.dumps({'name': 'John'})))
    print(await gateway.handle_request('POST', '/orders', json.dumps({'item': 'Book'})))


if __name__ == "__main__":
    asyncio.run(main())

