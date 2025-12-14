"""
Template Method Pattern - Python

Defines the skeleton of an algorithm in a method, deferring some steps
to subclasses. Lets subclasses redefine certain steps without changing
the algorithm's structure.

Use cases:
- Code reuse
- Framework design
- Algorithm families with common structure
"""

from abc import ABC, abstractmethod


# Abstract class
class DataProcessor(ABC):
    # Template method
    def process(self, data):
        validated = self.validate(data)
        if not validated:
            return "Validation failed"
        
        processed = self.transform(validated)
        saved = self.save(processed)
        return self.notify(saved)
    
    # Abstract methods (to be implemented by subclasses)
    @abstractmethod
    def validate(self, data):
        pass
    
    @abstractmethod
    def transform(self, data):
        pass
    
    @abstractmethod
    def save(self, data):
        pass
    
    def notify(self, result):
        return f"Processing complete: {result}"


# Concrete implementations
class CSVProcessor(DataProcessor):
    def validate(self, data):
        print("Validating CSV data...")
        return data and ',' in data
    
    def transform(self, data):
        print("Transforming CSV data...")
        return [item.strip() for item in data.split(',')]
    
    def save(self, data):
        print("Saving CSV data...")
        return f"Saved {len(data)} CSV records"


class JSONProcessor(DataProcessor):
    def validate(self, data):
        print("Validating JSON data...")
        try:
            import json
            json.loads(data)
            return True
        except:
            return False
    
    def transform(self, data):
        print("Transforming JSON data...")
        import json
        return json.loads(data)
    
    def save(self, data):
        print("Saving JSON data...")
        return f"Saved JSON object with {len(data)} keys"


# Example usage
if __name__ == "__main__":
    print("=== Template Method Pattern ===\n")
    
    csv_processor = CSVProcessor()
    print(csv_processor.process("name,age,city"))
    
    print("\n")
    
    json_processor = JSONProcessor()
    print(json_processor.process('{"name":"John","age":30,"city":"NYC"}'))

