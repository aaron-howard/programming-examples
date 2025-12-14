"""
Event-Driven Architecture Pattern - Python

Architecture where components communicate through events.
Decouples producers and consumers of events.
"""


# Event Bus
class EventBus:
    def __init__(self):
        self.listeners = {}
    
    def on(self, event, callback):
        if event not in self.listeners:
            self.listeners[event] = []
        self.listeners[event].append(callback)
    
    def off(self, event, callback):
        if event in self.listeners:
            self.listeners[event] = [cb for cb in self.listeners[event] if cb != callback]
    
    def emit(self, event, data):
        if event in self.listeners:
            for callback in self.listeners[event]:
                callback(data)


# Event Producers
class OrderService:
    def __init__(self, event_bus):
        self.event_bus = event_bus
        self.orders = []
    
    def create_order(self, order_data):
        import time
        order = {
            'id': int(time.time()),
            **order_data,
            'status': 'created'
        }
        self.orders.append(order)
        
        # Emit event
        self.event_bus.emit('order.created', order)
        return order
    
    def complete_order(self, order_id):
        order = next((o for o in self.orders if o['id'] == order_id), None)
        if order:
            order['status'] = 'completed'
            self.event_bus.emit('order.completed', order)


# Event Consumers
class EmailService:
    def __init__(self, event_bus):
        self.event_bus = event_bus
        self.setup_listeners()
    
    def setup_listeners(self):
        self.event_bus.on('order.created', self.send_order_confirmation)
        self.event_bus.on('order.completed', self.send_order_completion)
    
    def send_order_confirmation(self, order):
        print(f"Email: Order {order['id']} confirmation sent to {order['customer_email']}")
    
    def send_order_completion(self, order):
        print(f"Email: Order {order['id']} completion notification sent to {order['customer_email']}")


class InventoryService:
    def __init__(self, event_bus):
        self.event_bus = event_bus
        self.inventory = {'item1': 100, 'item2': 50}
        self.setup_listeners()
    
    def setup_listeners(self):
        self.event_bus.on('order.created', self.reserve_items)
    
    def reserve_items(self, order):
        for item in order['items']:
            if item['id'] in self.inventory:
                self.inventory[item['id']] -= item['quantity']
                print(f"Inventory: Reserved {item['quantity']} of {item['id']}")


# Example usage
if __name__ == "__main__":
    print("=== Event-Driven Architecture Pattern ===\n")
    
    event_bus = EventBus()
    order_service = OrderService(event_bus)
    email_service = EmailService(event_bus)
    inventory_service = InventoryService(event_bus)
    
    order = order_service.create_order({
        'customer_email': 'customer@example.com',
        'items': [
            {'id': 'item1', 'quantity': 2},
            {'id': 'item2', 'quantity': 1}
        ]
    })
    
    print()
    order_service.complete_order(order['id'])

