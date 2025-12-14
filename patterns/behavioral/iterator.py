"""
Iterator Pattern - Python

Provides a way to access elements of an aggregate object sequentially
without exposing its underlying representation.

Use cases:
- Traversing collections
- Hiding implementation details
- Supporting multiple traversal methods
"""

from abc import ABC, abstractmethod


# Iterator interface
class Iterator(ABC):
    @abstractmethod
    def has_next(self):
        pass
    
    @abstractmethod
    def next(self):
        pass


# Aggregate interface
class Aggregate(ABC):
    @abstractmethod
    def create_iterator(self):
        pass


# Concrete aggregate
class BookCollection(Aggregate):
    def __init__(self):
        self.books = []
    
    def add(self, book):
        self.books.append(book)
    
    def create_iterator(self):
        return BookIterator(self.books)


# Concrete iterator
class BookIterator(Iterator):
    def __init__(self, books):
        self.books = books
        self.index = 0
    
    def has_next(self):
        return self.index < len(self.books)
    
    def next(self):
        if self.has_next():
            book = self.books[self.index]
            self.index += 1
            return book
        return None


# Reverse iterator
class ReverseBookIterator(Iterator):
    def __init__(self, books):
        self.books = books
        self.index = len(books) - 1
    
    def has_next(self):
        return self.index >= 0
    
    def next(self):
        if self.has_next():
            book = self.books[self.index]
            self.index -= 1
            return book
        return None


# Example usage
if __name__ == "__main__":
    print("=== Iterator Pattern ===\n")
    
    collection = BookCollection()
    collection.add('Book 1')
    collection.add('Book 2')
    collection.add('Book 3')
    collection.add('Book 4')
    
    iterator = collection.create_iterator()
    print("Forward iteration:")
    while iterator.has_next():
        print(iterator.next())
    
    print("\nReverse iteration:")
    reverse_iterator = ReverseBookIterator(collection.books)
    while reverse_iterator.has_next():
        print(reverse_iterator.next())

