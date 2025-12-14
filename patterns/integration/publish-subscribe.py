"""
Publish-Subscribe Pattern - Python

Messaging pattern where publishers send messages to topics/channels
and subscribers receive messages from topics they're interested in.
"""


class PubSub:
    def __init__(self):
        self.subscribers = {}
    
    def subscribe(self, topic, callback):
        if topic not in self.subscribers:
            self.subscribers[topic] = []
        self.subscribers[topic].append(callback)
        
        # Return unsubscribe function
        def unsubscribe():
            self.subscribers[topic] = [cb for cb in self.subscribers[topic] if cb != callback]
        return unsubscribe
    
    def publish(self, topic, data):
        if topic in self.subscribers:
            for callback in self.subscribers[topic]:
                callback(data)
    
    def unsubscribe(self, topic, callback):
        if topic in self.subscribers:
            self.subscribers[topic] = [cb for cb in self.subscribers[topic] if cb != callback]


# Example usage
if __name__ == "__main__":
    print("=== Publish-Subscribe Pattern ===\n")
    
    pubsub = PubSub()
    
    # Subscribers
    unsubscribe1 = pubsub.subscribe('news', lambda data: print(f"Subscriber 1 received news: {data}"))
    pubsub.subscribe('news', lambda data: print(f"Subscriber 2 received news: {data}"))
    pubsub.subscribe('sports', lambda data: print(f"Subscriber received sports: {data}"))
    
    # Publishers
    pubsub.publish('news', 'Breaking: New technology announced')
    pubsub.publish('sports', 'Game result: Team A wins')
    
    # Unsubscribe
    unsubscribe1()
    pubsub.publish('news', "This message won't reach subscriber 1")

