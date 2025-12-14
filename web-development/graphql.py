"""
GraphQL - Python

Query language and runtime for APIs that allows clients to request
exactly the data they need.
"""

import json
from typing import Dict, List, Optional, Any, Callable


# Simple GraphQL implementation
class GraphQLSchema:
    def __init__(self):
        self.types: Dict[str, Any] = {}
        self.queries: Dict[str, Callable] = {}
        self.mutations: Dict[str, Callable] = {}
    
    def add_type(self, name: str, type_def: Any):
        self.types[name] = type_def
    
    def add_query(self, name: str, resolver: Callable):
        self.queries[name] = resolver
    
    def add_mutation(self, name: str, resolver: Callable):
        self.mutations[name] = resolver
    
    def execute(self, query: str, variables: Optional[Dict] = None) -> Dict:
        if variables is None:
            variables = {}
        try:
            parsed = self.parse_query(query)
            if parsed['operation'] == 'query':
                return self.execute_query(parsed, variables)
            elif parsed['operation'] == 'mutation':
                return self.execute_mutation(parsed, variables)
        except Exception as error:
            return {'errors': [{'message': str(error)}]}
    
    def parse_query(self, query: str) -> Dict:
        # Simplified parser - in real implementation, use a proper GraphQL parser
        trimmed = query.strip()
        is_mutation = trimmed.startswith('mutation')
        operation = 'mutation' if is_mutation else 'query'
        
        # Extract field names (simplified)
        import re
        fields = []
        field_pattern = r'(\w+)\s*\{'
        for match in re.finditer(field_pattern, query):
            fields.append(match.group(1))
        
        return {'operation': operation, 'fields': fields}
    
    def execute_query(self, parsed: Dict, variables: Dict) -> Dict:
        data = {}
        for field in parsed['fields']:
            resolver = self.queries.get(field)
            if resolver:
                data[field] = resolver(variables)
        return {'data': data}
    
    def execute_mutation(self, parsed: Dict, variables: Dict) -> Dict:
        data = {}
        for field in parsed['fields']:
            resolver = self.mutations.get(field)
            if resolver:
                data[field] = resolver(variables)
        return {'data': data}


# Example usage
if __name__ == "__main__":
    print("=== GraphQL ===\n")
    
    schema = GraphQLSchema()
    
    # Define queries
    schema.add_query('users', lambda vars: [
        {'id': 1, 'name': 'John Doe', 'email': 'john@example.com'},
        {'id': 2, 'name': 'Jane Smith', 'email': 'jane@example.com'}
    ])
    
    schema.add_query('user', lambda vars: next((
        u for u in [
            {'id': 1, 'name': 'John Doe', 'email': 'john@example.com'},
            {'id': 2, 'name': 'Jane Smith', 'email': 'jane@example.com'}
        ] if u['id'] == vars.get('id')
    ), None))
    
    schema.add_query('posts', lambda vars: [
        {'id': 1, 'title': 'First Post', 'content': 'Hello World', 'authorId': 1},
        {'id': 2, 'title': 'Second Post', 'content': 'GraphQL Example', 'authorId': 1}
    ])
    
    # Define mutations
    schema.add_mutation('createUser', lambda vars: {
        'id': int(__import__('time').time()),
        'name': vars.get('name'),
        'email': vars.get('email')
    })
    
    schema.add_mutation('updateUser', lambda vars: {
        'id': vars.get('id'),
        'name': vars.get('name', 'Updated Name'),
        'email': vars.get('email', 'updated@example.com')
    })
    
    # Execute queries
    print("Query: users")
    query1 = """
        query {
            users {
                id
                name
                email
            }
        }
    """
    print(json.dumps(schema.execute(query1), indent=2))
    
    print("\nQuery: user with ID")
    query2 = """
        query {
            user(id: 1) {
                id
                name
                email
            }
        }
    """
    print(json.dumps(schema.execute(query2, {'id': 1}), indent=2))
    
    print("\nMutation: createUser")
    mutation1 = """
        mutation {
            createUser(name: "Bob", email: "bob@example.com") {
                id
                name
                email
            }
        }
    """
    print(json.dumps(schema.execute(mutation1, {'name': 'Bob', 'email': 'bob@example.com'}), indent=2))

