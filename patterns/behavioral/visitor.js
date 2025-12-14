/**
 * Visitor Pattern - JavaScript
 * 
 * Separates algorithms from the objects on which they operate. Lets you define
 * a new operation without changing the classes of the elements on which it operates.
 * 
 * Use cases:
 * - Operations on object structures
 * - Adding new operations without modifying classes
 * - Complex object hierarchies
 */

// Visitor interface
class Visitor {
    visitElementA(element) {
        throw new Error('Method must be implemented');
    }
    
    visitElementB(element) {
        throw new Error('Method must be implemented');
    }
}

// Element interface
class Element {
    accept(visitor) {
        throw new Error('Method must be implemented');
    }
}

// Concrete elements
class ElementA extends Element {
    constructor(value) {
        super();
        this.value = value;
    }
    
    accept(visitor) {
        return visitor.visitElementA(this);
    }
    
    operationA() {
        return `ElementA operation with value: ${this.value}`;
    }
}

class ElementB extends Element {
    constructor(value) {
        super();
        this.value = value;
    }
    
    accept(visitor) {
        return visitor.visitElementB(this);
    }
    
    operationB() {
        return `ElementB operation with value: ${this.value}`;
    }
}

// Concrete visitors
class ConcreteVisitor1 extends Visitor {
    visitElementA(element) {
        return `Visitor1: ${element.operationA()}`;
    }
    
    visitElementB(element) {
        return `Visitor1: ${element.operationB()}`;
    }
}

class ConcreteVisitor2 extends Visitor {
    visitElementA(element) {
        return `Visitor2: Processing ${element.value} from ElementA`;
    }
    
    visitElementB(element) {
        return `Visitor2: Processing ${element.value} from ElementB`;
    }
}

// Object structure
class ObjectStructure {
    constructor() {
        this.elements = [];
    }
    
    add(element) {
        this.elements.push(element);
    }
    
    accept(visitor) {
        return this.elements.map(element => element.accept(visitor));
    }
}

// Example usage
console.log('=== Visitor Pattern ===\n');

const structure = new ObjectStructure();
structure.add(new ElementA('A1'));
structure.add(new ElementB('B1'));
structure.add(new ElementA('A2'));

const visitor1 = new ConcreteVisitor1();
const visitor2 = new ConcreteVisitor2();

console.log('Visitor 1:');
structure.accept(visitor1).forEach(result => console.log(result));

console.log('\nVisitor 2:');
structure.accept(visitor2).forEach(result => console.log(result));

module.exports = { Visitor, Element, ElementA, ElementB, ConcreteVisitor1, ConcreteVisitor2, ObjectStructure };

