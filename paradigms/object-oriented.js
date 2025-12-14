/**
 * Object-Oriented Programming - JavaScript
 * 
 * Programming paradigm based on classes, objects, inheritance, polymorphism, and encapsulation.
 */

// Class definition
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    // Method
    speak() {
        return `${this.name} makes a sound`;
    }
    
    // Getter
    getInfo() {
        return `${this.name} is a ${this.species}`;
    }
}

// Inheritance
class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Dog');
        this.breed = breed;
    }
    
    // Method overriding (polymorphism)
    speak() {
        return `${this.name} barks: Woof!`;
    }
    
    // Additional method
    fetch() {
        return `${this.name} fetches the ball`;
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name, 'Cat');
        this.color = color;
    }
    
    speak() {
        return `${this.name} meows: Meow!`;
    }
    
    purr() {
        return `${this.name} purrs contentedly`;
    }
}

// Encapsulation with private fields (ES2022)
class BankAccount {
    #balance = 0; // Private field
    
    constructor(owner) {
        this.owner = owner;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return `Deposited $${amount}. New balance: $${this.#balance}`;
        }
        return 'Invalid deposit amount';
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return `Withdrew $${amount}. New balance: $${this.#balance}`;
        }
        return 'Insufficient funds or invalid amount';
    }
    
    getBalance() {
        return this.#balance;
    }
}

// Abstraction - Interface-like pattern
class Shape {
    area() {
        throw new Error('Method must be implemented');
    }
    
    perimeter() {
        throw new Error('Method must be implemented');
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
    
    perimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius ** 2;
    }
    
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

// Example usage
console.log('=== Object-Oriented Programming ===\n');

// Inheritance and Polymorphism
const dog = new Dog('Buddy', 'Golden Retriever');
const cat = new Cat('Whiskers', 'Orange');

console.log('Inheritance & Polymorphism:');
console.log(dog.getInfo());
console.log(dog.speak());
console.log(cat.getInfo());
console.log(cat.speak());

console.log('\nEncapsulation:');
const account = new BankAccount('John Doe');
console.log(account.deposit(100));
console.log(account.deposit(50));
console.log(account.withdraw(30));
console.log(`Balance: $${account.getBalance()}`);

console.log('\nAbstraction:');
const rectangle = new Rectangle(5, 10);
const circle = new Circle(5);
console.log(`Rectangle area: ${rectangle.area()}, perimeter: ${rectangle.perimeter()}`);
console.log(`Circle area: ${circle.area().toFixed(2)}, perimeter: ${circle.perimeter().toFixed(2)}`);

module.exports = { Animal, Dog, Cat, BankAccount, Shape, Rectangle, Circle };

