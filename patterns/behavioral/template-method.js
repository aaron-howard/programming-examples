/**
 * Template Method Pattern - JavaScript
 * 
 * Defines the skeleton of an algorithm in a method, deferring some steps
 * to subclasses. Lets subclasses redefine certain steps without changing
 * the algorithm's structure.
 * 
 * Use cases:
 * - Code reuse
 * - Framework design
 * - Algorithm families with common structure
 */

// Abstract class
class DataProcessor {
    // Template method
    process(data) {
        const validated = this.validate(data);
        if (!validated) {
            return 'Validation failed';
        }
        
        const processed = this.transform(validated);
        const saved = this.save(processed);
        return this.notify(saved);
    }
    
    // Abstract methods (to be implemented by subclasses)
    validate(data) {
        throw new Error('Method must be implemented');
    }
    
    transform(data) {
        throw new Error('Method must be implemented');
    }
    
    save(data) {
        throw new Error('Method must be implemented');
    }
    
    notify(result) {
        return `Processing complete: ${result}`;
    }
}

// Concrete implementations
class CSVProcessor extends DataProcessor {
    validate(data) {
        console.log('Validating CSV data...');
        return data && data.includes(',');
    }
    
    transform(data) {
        console.log('Transforming CSV data...');
        return data.split(',').map(item => item.trim());
    }
    
    save(data) {
        console.log('Saving CSV data...');
        return `Saved ${data.length} CSV records`;
    }
}

class JSONProcessor extends DataProcessor {
    validate(data) {
        console.log('Validating JSON data...');
        try {
            JSON.parse(data);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    transform(data) {
        console.log('Transforming JSON data...');
        return JSON.parse(data);
    }
    
    save(data) {
        console.log('Saving JSON data...');
        return `Saved JSON object with ${Object.keys(data).length} keys`;
    }
}

// Example usage
console.log('=== Template Method Pattern ===\n');

const csvProcessor = new CSVProcessor();
console.log(csvProcessor.process('name,age,city'));

console.log('\n');

const jsonProcessor = new JSONProcessor();
console.log(jsonProcessor.process('{"name":"John","age":30,"city":"NYC"}'));

module.exports = { DataProcessor, CSVProcessor, JSONProcessor };

