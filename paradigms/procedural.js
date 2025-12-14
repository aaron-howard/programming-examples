/**
 * Procedural Programming - JavaScript
 * 
 * Programming paradigm based on step-by-step instructions and procedures/functions.
 */

// Procedures/Functions that perform specific tasks
function calculateArea(length, width) {
    return length * width;
}

function calculatePerimeter(length, width) {
    return 2 * (length + width);
}

function displayRectangleInfo(length, width) {
    const area = calculateArea(length, width);
    const perimeter = calculatePerimeter(length, width);
    console.log(`Rectangle: ${length}x${width}`);
    console.log(`Area: ${area}`);
    console.log(`Perimeter: ${perimeter}`);
}

// Step-by-step algorithm
function findMaximum(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

function findMinimum(numbers) {
    let min = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    return min;
}

function calculateAverage(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum / numbers.length;
}

// Sequential processing
function processStudentGrades(students) {
    const results = [];
    
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const average = calculateAverage(student.grades);
        let status;
        
        if (average >= 90) {
            status = 'Excellent';
        } else if (average >= 70) {
            status = 'Good';
        } else if (average >= 50) {
            status = 'Pass';
        } else {
            status = 'Fail';
        }
        
        results.push({
            name: student.name,
            average: average.toFixed(2),
            status: status
        });
    }
    
    return results;
}

// Data structures (arrays, objects)
function createInventory() {
    return [];
}

function addItem(inventory, item, quantity) {
    inventory.push({ item, quantity });
}

function removeItem(inventory, itemName) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].item === itemName) {
            inventory.splice(i, 1);
            return true;
        }
    }
    return false;
}

function getTotalItems(inventory) {
    let total = 0;
    for (let i = 0; i < inventory.length; i++) {
        total += inventory[i].quantity;
    }
    return total;
}

// Example usage
console.log('=== Procedural Programming ===\n');

// Rectangle calculations
console.log('Rectangle Calculations:');
displayRectangleInfo(5, 10);

// Number processing
console.log('\nNumber Processing:');
const numbers = [23, 45, 12, 67, 34, 89, 56];
console.log('Numbers:', numbers);
console.log('Maximum:', findMaximum(numbers));
console.log('Minimum:', findMinimum(numbers));
console.log('Average:', calculateAverage(numbers).toFixed(2));

// Student processing
console.log('\nStudent Grade Processing:');
const students = [
    { name: 'Alice', grades: [85, 90, 92, 88] },
    { name: 'Bob', grades: [75, 80, 78, 82] },
    { name: 'Charlie', grades: [45, 50, 48, 52] },
    { name: 'Diana', grades: [95, 98, 97, 96] }
];

const results = processStudentGrades(students);
results.forEach(result => {
    console.log(`${result.name}: ${result.average} - ${result.status}`);
});

// Inventory management
console.log('\nInventory Management:');
const inventory = createInventory();
addItem(inventory, 'Apples', 50);
addItem(inventory, 'Bananas', 30);
addItem(inventory, 'Oranges', 25);
console.log('Inventory:', inventory);
console.log('Total items:', getTotalItems(inventory));
removeItem(inventory, 'Bananas');
console.log('After removing Bananas:', inventory);
console.log('Total items:', getTotalItems(inventory));

module.exports = {
    calculateArea, calculatePerimeter, displayRectangleInfo,
    findMaximum, findMinimum, calculateAverage,
    processStudentGrades,
    createInventory, addItem, removeItem, getTotalItems
};

