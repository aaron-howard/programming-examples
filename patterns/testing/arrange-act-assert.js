/**
 * Arrange-Act-Assert Pattern - JavaScript
 * 
 * Three-phase test structure:
 * - Arrange: Set up test data and conditions
 * - Act: Execute the code under test
 * - Assert: Verify the results
 */

// Example test framework structure
class TestFramework {
    constructor() {
        this.tests = [];
    }
    
    test(name, fn) {
        this.tests.push({ name, fn });
    }
    
    async run() {
        for (const test of this.tests) {
            try {
                await test.fn();
                console.log(`✓ ${test.name}`);
            } catch (error) {
                console.log(`✗ ${test.name}: ${error.message}`);
            }
        }
    }
}

// Example: Calculator
class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
    
    multiply(a, b) {
        return a * b;
    }
}

// Test examples using AAA pattern
const framework = new TestFramework();

framework.test('Calculator.add should return sum of two numbers', () => {
    // Arrange
    const calculator = new Calculator();
    const a = 5;
    const b = 3;
    
    // Act
    const result = calculator.add(a, b);
    
    // Assert
    if (result !== 8) {
        throw new Error(`Expected 8, got ${result}`);
    }
});

framework.test('Calculator.subtract should return difference', () => {
    // Arrange
    const calculator = new Calculator();
    
    // Act
    const result = calculator.subtract(10, 4);
    
    // Assert
    if (result !== 6) {
        throw new Error(`Expected 6, got ${result}`);
    }
});

// Example usage
console.log('=== Arrange-Act-Assert Pattern ===\n');
framework.run();

module.exports = { TestFramework, Calculator };

