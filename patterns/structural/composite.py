"""
Composite Pattern - Python

Composes objects into tree structures to represent part-whole hierarchies.
Lets clients treat individual objects and compositions uniformly.

Use cases:
- File system structures
- UI component hierarchies
- Organization structures
"""

from abc import ABC, abstractmethod


# Component interface
class FileSystemComponent(ABC):
    def __init__(self, name):
        self.name = name
    
    @abstractmethod
    def get_size(self):
        pass
    
    @abstractmethod
    def display(self, indent=''):
        pass


# Leaf (individual file)
class File(FileSystemComponent):
    def __init__(self, name, size):
        super().__init__(name)
        self.size = size
    
    def get_size(self):
        return self.size
    
    def display(self, indent=''):
        print(f"{indent}📄 {self.name} ({self.size} bytes)")


# Composite (directory)
class Directory(FileSystemComponent):
    def __init__(self, name):
        super().__init__(name)
        self.children = []
    
    def add(self, component):
        self.children.append(component)
    
    def remove(self, component):
        if component in self.children:
            self.children.remove(component)
    
    def get_size(self):
        return sum(child.get_size() for child in self.children)
    
    def display(self, indent=''):
        print(f"{indent}📁 {self.name}/ ({self.get_size()} bytes)")
        for child in self.children:
            child.display(indent + '  ')


# Example usage
if __name__ == "__main__":
    print("=== Composite Pattern ===\n")
    
    # Create file system structure
    root = Directory('root')
    home = Directory('home')
    documents = Directory('documents')
    downloads = Directory('downloads')
    
    file1 = File('readme.txt', 1024)
    file2 = File('notes.txt', 2048)
    file3 = File('image.jpg', 15360)
    file4 = File('video.mp4', 1048576)
    
    root.add(home)
    home.add(documents)
    home.add(downloads)
    
    documents.add(file1)
    documents.add(file2)
    downloads.add(file3)
    downloads.add(file4)
    
    # Display structure
    root.display()
    
    print(f"\nTotal size: {root.get_size()} bytes")

