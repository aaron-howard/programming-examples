"""
Functional Programming - Python

Programming paradigm emphasizing pure functions, immutability, and higher-order functions.
"""

from functools import reduce, lru_cache
from typing import Callable, List, Any


# Pure functions - no side effects, same input = same output
def add(a: int, b: int) -> int:
    return a + b


def multiply(a: int, b: int) -> int:
    return a * b


# Higher-order functions
def map_func(arr: List[Any], fn: Callable) -> List[Any]:
    return [fn(x) for x in arr]


def filter_func(arr: List[Any], predicate: Callable) -> List[Any]:
    return [x for x in arr if predicate(x)]


# Function composition
def compose(*fns):
    def composed(value):
        result = value
        for fn in reversed(fns):
            result = fn(result)
        return result
    return composed


def pipe(*fns):
    def piped(value):
        result = value
        for fn in fns:
            result = fn(result)
        return result
    return piped


# Currying
def curry(fn):
    def curried(*args):
        if len(args) >= fn.__code__.co_argcount:
            return fn(*args)
        return lambda *next_args: curried(*(args + next_args))
    return curried


# Immutability - creating new objects instead of mutating
def add_item(lst: List[Any], item: Any) -> List[Any]:
    return lst + [item]


def update_item(lst: List[Any], index: int, new_item: Any) -> List[Any]:
    return lst[:index] + [new_item] + lst[index + 1:]


def remove_item(lst: List[Any], index: int) -> List[Any]:
    return lst[:index] + lst[index + 1:]


# Recursive functions
def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)


@lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


# Closures
def create_counter():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    def decrement():
        nonlocal count
        count -= 1
        return count
    
    def get_count():
        return count
    
    return {'increment': increment, 'decrement': decrement, 'get_count': get_count}


# Example usage
if __name__ == "__main__":
    print("=== Functional Programming ===\n")
    
    # Pure functions
    print("Pure functions:")
    print(f"add(5, 3) = {add(5, 3)}")
    print(f"multiply(4, 7) = {multiply(4, 7)}")
    
    # Higher-order functions
    print("\nHigher-order functions:")
    numbers = [1, 2, 3, 4, 5]
    print("Original:", numbers)
    print("Mapped (x2):", map_func(numbers, lambda x: x * 2))
    print("Filtered (even):", filter_func(numbers, lambda x: x % 2 == 0))
    print("Reduced (sum):", reduce(lambda acc, x: acc + x, numbers, 0))
    
    # Function composition
    print("\nFunction composition:")
    double = lambda x: x * 2
    add_one = lambda x: x + 1
    square = lambda x: x * x
    
    composed = compose(square, add_one, double)
    piped = pipe(double, add_one, square)
    print(f"compose(square, add_one, double)(3) = {composed(3)}")
    print(f"pipe(double, add_one, square)(3) = {piped(3)}")
    
    # Currying
    print("\nCurrying:")
    curried_add = curry(lambda a, b, c: a + b + c)
    print(f"curried_add(1)(2)(3) = {curried_add(1)(2)(3)}")
    
    # Immutability
    print("\nImmutability:")
    original_list = [1, 2, 3]
    new_list = add_item(original_list, 4)
    print("Original:", original_list)
    print("New list:", new_list)
    print("Original unchanged:", original_list)
    
    # Recursion
    print("\nRecursion:")
    print(f"factorial(5) = {factorial(5)}")
    print(f"fibonacci(7) = {fibonacci(7)}")
    print(f"fibonacci(40) = {fibonacci(40)}")
    
    # Closures
    print("\nClosures:")
    counter = create_counter()
    counter['increment']()
    counter['increment']()
    print("Counter:", counter['get_count']())

