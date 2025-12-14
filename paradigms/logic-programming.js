/**
 * Logic Programming - JavaScript
 * 
 * Programming paradigm based on formal logic (rules and facts).
 * Simulates Prolog-style logic programming in JavaScript.
 */

// Simple Logic Engine
class LogicEngine {
    constructor() {
        this.facts = [];
        this.rules = [];
    }
    
    // Add a fact
    fact(predicate, ...args) {
        this.facts.push({ predicate, args });
    }
    
    // Add a rule (if conditions then conclusion)
    rule(conclusion, ...conditions) {
        this.rules.push({ conclusion, conditions });
    }
    
    // Query the knowledge base
    query(predicate, ...args) {
        // Check facts
        for (const fact of this.facts) {
            if (this.match(fact, { predicate, args })) {
                return true;
            }
        }
        
        // Check rules
        for (const rule of this.rules) {
            if (this.matchRule(rule, { predicate, args })) {
                return true;
            }
        }
        
        return false;
    }
    
    // Match a fact or query
    match(fact1, fact2) {
        if (fact1.predicate !== fact2.predicate) return false;
        if (fact1.args.length !== fact2.args.length) return false;
        
        for (let i = 0; i < fact1.args.length; i++) {
            if (fact1.args[i] !== fact2.args[i]) return false;
        }
        
        return true;
    }
    
    // Match a rule
    matchRule(rule, query) {
        if (rule.conclusion.predicate !== query.predicate) return false;
        
        // Check if all conditions are satisfied
        for (const condition of rule.conditions) {
            if (!this.query(condition.predicate, ...condition.args)) {
                return false;
            }
        }
        
        return true;
    }
    
    // Find all solutions
    findAll(predicate, ...args) {
        const results = [];
        
        // Check facts
        for (const fact of this.facts) {
            if (fact.predicate === predicate && fact.args.length === args.length) {
                results.push(fact.args);
            }
        }
        
        return results;
    }
}

// Family tree example
class FamilyTree {
    constructor() {
        this.engine = new LogicEngine();
        this.setupFamily();
    }
    
    setupFamily() {
        // Facts
        this.engine.fact('parent', 'alice', 'bob');
        this.engine.fact('parent', 'alice', 'charlie');
        this.engine.fact('parent', 'bob', 'diana');
        this.engine.fact('parent', 'bob', 'eve');
        this.engine.fact('male', 'bob');
        this.engine.fact('male', 'charlie');
        this.engine.fact('female', 'alice');
        this.engine.fact('female', 'diana');
        this.engine.fact('female', 'eve');
        
        // Rules
        this.engine.rule(
            { predicate: 'father', args: ['X', 'Y'] },
            { predicate: 'parent', args: ['X', 'Y'] },
            { predicate: 'male', args: ['X'] }
        );
        
        this.engine.rule(
            { predicate: 'mother', args: ['X', 'Y'] },
            { predicate: 'parent', args: ['X', 'Y'] },
            { predicate: 'female', args: ['X'] }
        );
        
        this.engine.rule(
            { predicate: 'grandparent', args: ['X', 'Y'] },
            { predicate: 'parent', args: ['X', 'Z'] },
            { predicate: 'parent', args: ['Z', 'Y'] }
        );
        
        this.engine.rule(
            { predicate: 'sibling', args: ['X', 'Y'] },
            { predicate: 'parent', args: ['Z', 'X'] },
            { predicate: 'parent', args: ['Z', 'Y'] }
        );
    }
    
    query(relation, person1, person2) {
        return this.engine.query(relation, person1, person2);
    }
    
    findAll(relation, person) {
        return this.engine.findAll(relation, person);
    }
}

// Example usage
console.log('=== Logic Programming ===\n');

const family = new FamilyTree();

console.log('Family Relationships:');
console.log('Is Alice a parent of Bob?', family.query('parent', 'alice', 'bob'));
console.log('Is Bob a father of Diana?', family.query('father', 'bob', 'diana'));
console.log('Is Alice a mother of Charlie?', family.query('mother', 'alice', 'charlie'));
console.log('Is Alice a grandparent of Diana?', family.query('grandparent', 'alice', 'diana'));
console.log('Are Bob and Charlie siblings?', family.query('sibling', 'bob', 'charlie'));

console.log('\nFinding all children of Alice:');
const children = family.findAll('parent', 'alice');
children.forEach(child => {
    console.log(`  - ${child[1]}`);
});

module.exports = { LogicEngine, FamilyTree };

