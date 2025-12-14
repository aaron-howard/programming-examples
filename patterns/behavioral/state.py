"""
State Pattern - Python

Allows an object to alter its behavior when its internal state changes.
The object will appear to change its class.

Use cases:
- Object behavior depends on its state
- Operations have large conditional statements based on state
- State transitions are complex
"""

from abc import ABC, abstractmethod


# State interface
class State(ABC):
    @abstractmethod
    def handle(self, context):
        pass


# Concrete states
class IdleState(State):
    def handle(self, context):
        print("Player is idle")
        context.set_state(WalkingState())


class WalkingState(State):
    def handle(self, context):
        print("Player is walking")
        context.set_state(RunningState())


class RunningState(State):
    def handle(self, context):
        print("Player is running")
        context.set_state(IdleState())


# Context
class Player:
    def __init__(self):
        self.state = IdleState()
    
    def set_state(self, state):
        self.state = state
    
    def action(self):
        self.state.handle(self)


# Example usage
if __name__ == "__main__":
    print("=== State Pattern ===\n")
    
    player = Player()
    
    player.action()  # Idle -> Walking
    player.action()  # Walking -> Running
    player.action()  # Running -> Idle
    player.action()  # Idle -> Walking

