"""
Message Router Pattern - Python

Routes messages to different handlers based on message content,
type, or routing rules.
"""


class MessageRouter:
    def __init__(self):
        self.routes = []
    
    def add_route(self, condition, handler):
        self.routes.append({'condition': condition, 'handler': handler})
    
    def route(self, message):
        for route in self.routes:
            if route['condition'](message):
                return route['handler'](message)
        return self.default_handler(message)
    
    def default_handler(self, message):
        print(f"No route found for message: {message}")


# Example usage
if __name__ == "__main__":
    print("=== Message Router Pattern ===\n")
    
    router = MessageRouter()
    
    # Define routes
    router.add_route(
        lambda msg: msg.get('type') == 'order',
        lambda msg: print(f"Order handler: Processing order {msg.get('id')}")
    )
    
    router.add_route(
        lambda msg: msg.get('type') == 'payment',
        lambda msg: print(f"Payment handler: Processing payment {msg.get('id')}")
    )
    
    router.add_route(
        lambda msg: msg.get('priority') == 'high',
        lambda msg: print(f"High priority handler: {msg.get('content')}")
    )
    
    # Route messages
    router.route({'type': 'order', 'id': '123'})
    router.route({'type': 'payment', 'id': '456'})
    router.route({'type': 'notification', 'priority': 'high', 'content': 'Urgent message'})
    router.route({'type': 'unknown', 'id': '999'})

