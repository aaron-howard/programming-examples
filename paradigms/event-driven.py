"""
Event-Driven Programming - Python

Programming paradigm where the flow of the program is determined by events
(user actions, sensor outputs, messages, etc.)
"""

import asyncio
import threading
import time
from typing import Callable, Dict, List, Any


# Event Emitter pattern
class EventEmitter:
    def __init__(self):
        self.events: Dict[str, List[Callable]] = {}
    
    def on(self, event: str, callback: Callable):
        if event not in self.events:
            self.events[event] = []
        self.events[event].append(callback)
    
    def off(self, event: str, callback: Callable):
        if event in self.events:
            self.events[event] = [cb for cb in self.events[event] if cb != callback]
    
    def emit(self, event: str, data: Any):
        if event in self.events:
            for callback in self.events[event]:
                callback(data)
    
    def once(self, event: str, callback: Callable):
        def wrapper(data):
            callback(data)
            self.off(event, wrapper)
        self.on(event, wrapper)


# UI Event Handler (simulated)
class Button:
    def __init__(self, button_id: str):
        self.id = button_id
        self.click_handlers: List[Callable] = []
    
    def on_click(self, handler: Callable):
        self.click_handlers.append(handler)
    
    def click(self):
        print(f"Button {self.id} clicked!")
        for handler in self.click_handlers:
            handler({
                'button_id': self.id,
                'timestamp': time.time()
            })


# Server Event Handler (simulated)
class Server:
    def __init__(self):
        self.event_emitter = EventEmitter()
        self.connections = 0
    
    def on_connection(self, handler: Callable):
        self.event_emitter.on('connection', handler)
    
    def on_request(self, handler: Callable):
        self.event_emitter.on('request', handler)
    
    def on_error(self, handler: Callable):
        self.event_emitter.on('error', handler)
    
    def handle_connection(self, client_id: str):
        self.connections += 1
        self.event_emitter.emit('connection', {
            'client_id': client_id,
            'connections': self.connections,
            'timestamp': time.time()
        })
    
    def handle_request(self, client_id: str, path: str):
        self.event_emitter.emit('request', {
            'client_id': client_id,
            'path': path,
            'timestamp': time.time()
        })
    
    def handle_error(self, error: Exception):
        self.event_emitter.emit('error', {
            'error': str(error),
            'timestamp': time.time()
        })


# Timer-based events
class Timer:
    def __init__(self, interval: float):
        self.interval = interval
        self.handlers: List[Callable] = []
        self.timer_thread = None
        self.running = False
    
    def on_tick(self, handler: Callable):
        self.handlers.append(handler)
    
    def start(self):
        self.running = True
        self.timer_thread = threading.Thread(target=self._run)
        self.timer_thread.daemon = True
        self.timer_thread.start()
    
    def _run(self):
        while self.running:
            time.sleep(self.interval)
            if self.running:
                for handler in self.handlers:
                    handler({
                        'timestamp': time.time(),
                        'tick': time.time()
                    })
    
    def stop(self):
        self.running = False


# Async event processing
class AsyncEventProcessor:
    def __init__(self):
        self.queue: List[Dict] = []
        self.processing = False
    
    async def add_event(self, event: Dict):
        self.queue.append(event)
        if not self.processing:
            self.processing = True
            await self.process_queue()
    
    async def process_queue(self):
        while self.queue:
            event = self.queue.pop(0)
            await self.process_event(event)
        self.processing = False
    
    async def process_event(self, event: Dict):
        await asyncio.sleep(0.1)
        print(f"Processed event: {event['type']}", event.get('data'))


# Example usage
if __name__ == "__main__":
    print("=== Event-Driven Programming ===\n")
    
    # UI Events
    print("UI Events:")
    button = Button('submit-btn')
    button.on_click(lambda event: print("Button click handler:", event))
    button.click()
    
    # Server Events
    print("\nServer Events:")
    server = Server()
    server.on_connection(lambda event: print(f"New connection from {event['client_id']}. Total: {event['connections']}"))
    server.on_request(lambda event: print(f"Request from {event['client_id']}: {event['path']}"))
    server.on_error(lambda event: print(f"Error occurred: {event['error']}"))
    
    server.handle_connection('client-1')
    server.handle_connection('client-2')
    server.handle_request('client-1', '/api/users')
    server.handle_error(Exception("Database connection failed"))
    
    # Timer Events
    print("\nTimer Events:")
    timer = Timer(1.0)
    tick_count = [0]  # Use list to allow modification in closure
    
    def on_tick(event):
        tick_count[0] += 1
        print(f"Tick {tick_count[0]}: {event['timestamp']}")
        if tick_count[0] >= 3:
            timer.stop()
            print("Timer stopped")
    
    timer.on_tick(on_tick)
    timer.start()
    time.sleep(3.5)
    
    # Async Event Processing
    async def main():
        print("\nAsync Event Processing:")
        processor = AsyncEventProcessor()
        await processor.add_event({'type': 'user-login', 'data': {'user_id': 123}})
        await processor.add_event({'type': 'data-update', 'data': {'record_id': 456}})
        await processor.add_event({'type': 'notification', 'data': {'message': 'Hello'}})
    
    asyncio.run(main())

