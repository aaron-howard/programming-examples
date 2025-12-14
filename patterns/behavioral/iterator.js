/**
 * Iterator Pattern - JavaScript
 * 
 * Provides a way to access elements of an aggregate object sequentially
 * without exposing its underlying representation.
 * 
 * Use cases:
 * - Traversing collections
 * - Hiding implementation details
 * - Supporting multiple traversal methods
 */

// Iterator interface
class Iterator {
    hasNext() {
        throw new Error('Method must be implemented');
    }
    
    next() {
        throw new Error('Method must be implemented');
    }
}

// Aggregate interface
class Aggregate {
    createIterator() {
        throw new Error('Method must be implemented');
    }
}

// Concrete aggregate
class BookCollection extends Aggregate {
    constructor() {
        super();
        this.books = [];
    }
    
    add(book) {
        this.books.push(book);
    }
    
    createIterator() {
        return new BookIterator(this.books);
    }
}

// Concrete iterator
class BookIterator extends Iterator {
    constructor(books) {
        super();
        this.books = books;
        this.index = 0;
    }
    
    hasNext() {
        return this.index < this.books.length;
    }
    
    next() {
        if (this.hasNext()) {
            return this.books[this.index++];
        }
        return null;
    }
}

// Reverse iterator
class ReverseBookIterator extends Iterator {
    constructor(books) {
        super();
        this.books = books;
        this.index = books.length - 1;
    }
    
    hasNext() {
        return this.index >= 0;
    }
    
    next() {
        if (this.hasNext()) {
            return this.books[this.index--];
        }
        return null;
    }
}

// Example usage
console.log('=== Iterator Pattern ===\n');

const collection = new BookCollection();
collection.add('Book 1');
collection.add('Book 2');
collection.add('Book 3');
collection.add('Book 4');

const iterator = collection.createIterator();
console.log('Forward iteration:');
while (iterator.hasNext()) {
    console.log(iterator.next());
}

console.log('\nReverse iteration:');
const reverseIterator = new ReverseBookIterator(collection.books);
while (reverseIterator.hasNext()) {
    console.log(reverseIterator.next());
}

module.exports = { Iterator, Aggregate, BookCollection, BookIterator, ReverseBookIterator };

