/**
 * Composite Pattern - JavaScript
 * 
 * Composes objects into tree structures to represent part-whole hierarchies.
 * Lets clients treat individual objects and compositions uniformly.
 * 
 * Use cases:
 * - File system structures
 * - UI component hierarchies
 * - Organization structures
 */

// Component interface
class FileSystemComponent {
    constructor(name) {
        this.name = name;
    }
    
    getSize() {
        throw new Error('Method must be implemented');
    }
    
    display(indent = '') {
        throw new Error('Method must be implemented');
    }
}

// Leaf (individual file)
class File extends FileSystemComponent {
    constructor(name, size) {
        super(name);
        this.size = size;
    }
    
    getSize() {
        return this.size;
    }
    
    display(indent = '') {
        console.log(`${indent}📄 ${this.name} (${this.size} bytes)`);
    }
}

// Composite (directory)
class Directory extends FileSystemComponent {
    constructor(name) {
        super(name);
        this.children = [];
    }
    
    add(component) {
        this.children.push(component);
    }
    
    remove(component) {
        const index = this.children.indexOf(component);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    
    getSize() {
        return this.children.reduce((total, child) => total + child.getSize(), 0);
    }
    
    display(indent = '') {
        console.log(`${indent}📁 ${this.name}/ (${this.getSize()} bytes)`);
        this.children.forEach(child => child.display(indent + '  '));
    }
}

// Example usage
console.log('=== Composite Pattern ===\n');

// Create file system structure
const root = new Directory('root');
const home = new Directory('home');
const documents = new Directory('documents');
const downloads = new Directory('downloads');

const file1 = new File('readme.txt', 1024);
const file2 = new File('notes.txt', 2048);
const file3 = new File('image.jpg', 15360);
const file4 = new File('video.mp4', 1048576);

root.add(home);
home.add(documents);
home.add(downloads);

documents.add(file1);
documents.add(file2);
downloads.add(file3);
downloads.add(file4);

// Display structure
root.display();

console.log(`\nTotal size: ${root.getSize()} bytes`);

module.exports = { FileSystemComponent, File, Directory };

