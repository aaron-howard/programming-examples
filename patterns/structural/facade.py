"""
Facade Pattern - Python

Provides a simplified interface to a complex subsystem.
Hides the complexity of the subsystem behind a simple interface.

Use cases:
- Simplifying complex APIs
- Creating a unified interface for multiple subsystems
- Reducing dependencies between clients and subsystems
"""


# Complex subsystem classes
class CPU:
    def freeze(self):
        return "CPU: Freezing..."
    
    def jump(self, position):
        return f"CPU: Jumping to position {position}"
    
    def execute(self):
        return "CPU: Executing..."


class Memory:
    def load(self, position, data):
        return f"Memory: Loading data \"{data}\" at position {position}"


class HardDrive:
    def read(self, lba, size):
        return f"HardDrive: Reading {size} bytes from LBA {lba}"


# Facade
class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hard_drive = HardDrive()
    
    def start(self):
        steps = []
        steps.append(self.cpu.freeze())
        steps.append(self.memory.load(0, "BOOT_SECTOR"))
        steps.append(self.cpu.jump(0))
        steps.append(self.cpu.execute())
        return steps
    
    def shutdown(self):
        return "Computer: Shutting down..."


# Example usage
if __name__ == "__main__":
    print("=== Facade Pattern ===\n")
    
    computer = ComputerFacade()
    
    print("Starting computer:")
    boot_steps = computer.start()
    for step in boot_steps:
        print(step)
    
    print("\nShutting down:")
    print(computer.shutdown())

