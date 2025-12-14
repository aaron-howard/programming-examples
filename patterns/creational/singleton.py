"""
Singleton Pattern - Python

Ensures a class has only one instance and provides a global point of access to it.

Use cases:
- Database connections
- Logger instances
- Configuration managers
- Cache managers
"""


class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__new__(cls)
            cls._instance.data = "Singleton instance data"
        return cls._instance
    
    def get_data(self):
        return self.data
    
    def set_data(self, data):
        self.data = data


# Alternative: Using a decorator
def singleton(cls):
    instances = {}
    
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    
    return get_instance


@singleton
class DatabaseConnection:
    def __init__(self):
        self.connection_string = "database://localhost"
    
    def connect(self):
        return f"Connected to {self.connection_string}"


# Example usage
if __name__ == "__main__":
    print("=== Singleton Pattern ===\n")
    
    singleton1 = Singleton()
    singleton2 = Singleton()
    
    print("Are both instances the same?", singleton1 is singleton2)  # True
    print("Instance 1 data:", singleton1.get_data())
    singleton2.set_data("Modified data")
    print("Instance 1 data after modifying instance 2:", singleton1.get_data())
    
    # Decorator-based singleton
    db1 = DatabaseConnection()
    db2 = DatabaseConnection()
    print("Database instances are the same:", db1 is db2)  # True
    print(db1.connect())

