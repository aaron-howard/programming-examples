"""
Command Pattern - Python

Encapsulates a request as an object, allowing you to parameterize clients
with different requests, queue operations, and support undo operations.

Use cases:
- Undo/Redo functionality
- Queuing requests
- Logging requests
- Remote procedure calls
"""

from abc import ABC, abstractmethod


# Command interface
class Command(ABC):
    @abstractmethod
    def execute(self):
        pass
    
    @abstractmethod
    def undo(self):
        pass


# Receiver
class Light:
    def __init__(self):
        self.is_on = False
    
    def turn_on(self):
        self.is_on = True
        return "Light is ON"
    
    def turn_off(self):
        self.is_on = False
        return "Light is OFF"


# Concrete commands
class TurnOnCommand(Command):
    def __init__(self, light):
        self.light = light
    
    def execute(self):
        return self.light.turn_on()
    
    def undo(self):
        return self.light.turn_off()


class TurnOffCommand(Command):
    def __init__(self, light):
        self.light = light
    
    def execute(self):
        return self.light.turn_off()
    
    def undo(self):
        return self.light.turn_on()


# Invoker
class RemoteControl:
    def __init__(self):
        self.history = []
    
    def execute_command(self, command):
        result = command.execute()
        self.history.append(command)
        return result
    
    def undo(self):
        if self.history:
            command = self.history.pop()
            return command.undo()
        return "Nothing to undo"


# Example usage
if __name__ == "__main__":
    print("=== Command Pattern ===\n")
    
    light = Light()
    turn_on = TurnOnCommand(light)
    turn_off = TurnOffCommand(light)
    
    remote = RemoteControl()
    
    print(remote.execute_command(turn_on))
    print(remote.execute_command(turn_off))
    print("Undo:", remote.undo())
    print("Undo:", remote.undo())

