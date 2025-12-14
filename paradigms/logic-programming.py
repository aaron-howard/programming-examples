"""
Logic Programming - Python

Programming paradigm based on formal logic (rules and facts).
Simulates Prolog-style logic programming in Python.
"""


# Simple Logic Engine
class LogicEngine:
    def __init__(self):
        self.facts = []
        self.rules = []
    
    # Add a fact
    def fact(self, predicate, *args):
        self.facts.append({'predicate': predicate, 'args': args})
    
    # Add a rule (if conditions then conclusion)
    def rule(self, conclusion, *conditions):
        self.rules.append({'conclusion': conclusion, 'conditions': conditions})
    
    # Query the knowledge base
    def query(self, predicate, *args):
        query_fact = {'predicate': predicate, 'args': args}
        
        # Check facts
        for fact in self.facts:
            if self.match(fact, query_fact):
                return True
        
        # Check rules
        for rule in self.rules:
            if self.match_rule(rule, query_fact):
                return True
        
        return False
    
    # Match a fact or query
    def match(self, fact1, fact2):
        if fact1['predicate'] != fact2['predicate']:
            return False
        if len(fact1['args']) != len(fact2['args']):
            return False
        
        for i in range(len(fact1['args'])):
            if fact1['args'][i] != fact2['args'][i]:
                return False
        
        return True
    
    # Match a rule
    def match_rule(self, rule, query):
        if rule['conclusion']['predicate'] != query['predicate']:
            return False
        
        # Check if all conditions are satisfied
        for condition in rule['conditions']:
            if not self.query(condition['predicate'], *condition['args']):
                return False
        
        return True
    
    # Find all solutions
    def find_all(self, predicate, *args):
        results = []
        
        # Check facts
        for fact in self.facts:
            if fact['predicate'] == predicate and len(fact['args']) == len(args):
                results.append(fact['args'])
        
        return results


# Family tree example
class FamilyTree:
    def __init__(self):
        self.engine = LogicEngine()
        self.setup_family()
    
    def setup_family(self):
        # Facts
        self.engine.fact('parent', 'alice', 'bob')
        self.engine.fact('parent', 'alice', 'charlie')
        self.engine.fact('parent', 'bob', 'diana')
        self.engine.fact('parent', 'bob', 'eve')
        self.engine.fact('male', 'bob')
        self.engine.fact('male', 'charlie')
        self.engine.fact('female', 'alice')
        self.engine.fact('female', 'diana')
        self.engine.fact('female', 'eve')
        
        # Rules
        self.engine.rule(
            {'predicate': 'father', 'args': ['X', 'Y']},
            {'predicate': 'parent', 'args': ['X', 'Y']},
            {'predicate': 'male', 'args': ['X']}
        )
        
        self.engine.rule(
            {'predicate': 'mother', 'args': ['X', 'Y']},
            {'predicate': 'parent', 'args': ['X', 'Y']},
            {'predicate': 'female', 'args': ['X']}
        )
        
        self.engine.rule(
            {'predicate': 'grandparent', 'args': ['X', 'Y']},
            {'predicate': 'parent', 'args': ['X', 'Z']},
            {'predicate': 'parent', 'args': ['Z', 'Y']}
        )
        
        self.engine.rule(
            {'predicate': 'sibling', 'args': ['X', 'Y']},
            {'predicate': 'parent', 'args': ['Z', 'X']},
            {'predicate': 'parent', 'args': ['Z', 'Y']}
        )
    
    def query(self, relation, person1, person2):
        return self.engine.query(relation, person1, person2)
    
    def find_all(self, relation, person):
        return self.engine.find_all(relation, person)


# Example usage
if __name__ == "__main__":
    print("=== Logic Programming ===\n")
    
    family = FamilyTree()
    
    print("Family Relationships:")
    print("Is Alice a parent of Bob?", family.query('parent', 'alice', 'bob'))
    print("Is Bob a father of Diana?", family.query('father', 'bob', 'diana'))
    print("Is Alice a mother of Charlie?", family.query('mother', 'alice', 'charlie'))
    print("Is Alice a grandparent of Diana?", family.query('grandparent', 'alice', 'diana'))
    print("Are Bob and Charlie siblings?", family.query('sibling', 'bob', 'charlie'))
    
    print("\nFinding all children of Alice:")
    children = family.find_all('parent', 'alice')
    for child in children:
        print(f"  - {child[1]}")

