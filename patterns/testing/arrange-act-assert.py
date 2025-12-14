"""
Arrange-Act-Assert Pattern - Python

Three-phase test structure:
- Arrange: Set up test data and conditions
- Act: Execute the code under test
- Assert: Verify the results
"""

import unittest


# Example: Calculator
class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b


# Test examples using AAA pattern
class TestCalculator(unittest.TestCase):
    def test_add_should_return_sum_of_two_numbers(self):
        # Arrange
        calculator = Calculator()
        a = 5
        b = 3
        
        # Act
        result = calculator.add(a, b)
        
        # Assert
        self.assertEqual(result, 8)
    
    def test_subtract_should_return_difference(self):
        # Arrange
        calculator = Calculator()
        
        # Act
        result = calculator.subtract(10, 4)
        
        # Assert
        self.assertEqual(result, 6)


# Example usage
if __name__ == "__main__":
    print("=== Arrange-Act-Assert Pattern ===\n")
    unittest.main(verbosity=2)

