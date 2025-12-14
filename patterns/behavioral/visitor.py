"""
Visitor Pattern - Python

Separates algorithms from the objects on which they operate. Lets you define
a new operation without changing the classes of the elements on which it operates.

Use cases:
- Operations on object structures
- Adding new operations without modifying classes
- Complex object hierarchies
"""

from abc import ABC, abstractmethod


# Visitor interface
class Visitor(ABC):
    @abstractmethod
    def visit_element_a(self, element):
        pass
    
    @abstractmethod
    def visit_element_b(self, element):
        pass


# Element interface
class Element(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass


# Concrete elements
class ElementA(Element):
    def __init__(self, value):
        self.value = value
    
    def accept(self, visitor):
        return visitor.visit_element_a(self)
    
    def operation_a(self):
        return f"ElementA operation with value: {self.value}"


class ElementB(Element):
    def __init__(self, value):
        self.value = value
    
    def accept(self, visitor):
        return visitor.visit_element_b(self)
    
    def operation_b(self):
        return f"ElementB operation with value: {self.value}"


# Concrete visitors
class ConcreteVisitor1(Visitor):
    def visit_element_a(self, element):
        return f"Visitor1: {element.operation_a()}"
    
    def visit_element_b(self, element):
        return f"Visitor1: {element.operation_b()}"


class ConcreteVisitor2(Visitor):
    def visit_element_a(self, element):
        return f"Visitor2: Processing {element.value} from ElementA"
    
    def visit_element_b(self, element):
        return f"Visitor2: Processing {element.value} from ElementB"


# Object structure
class ObjectStructure:
    def __init__(self):
        self.elements = []
    
    def add(self, element):
        self.elements.append(element)
    
    def accept(self, visitor):
        return [element.accept(visitor) for element in self.elements]


# Example usage
if __name__ == "__main__":
    print("=== Visitor Pattern ===\n")
    
    structure = ObjectStructure()
    structure.add(ElementA('A1'))
    structure.add(ElementB('B1'))
    structure.add(ElementA('A2'))
    
    visitor1 = ConcreteVisitor1()
    visitor2 = ConcreteVisitor2()
    
    print("Visitor 1:")
    for result in structure.accept(visitor1):
        print(result)
    
    print("\nVisitor 2:")
    for result in structure.accept(visitor2):
        print(result)

