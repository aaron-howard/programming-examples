/**
 * GraphQL - JavaScript
 * 
 * Query language and runtime for APIs that allows clients to request
 * exactly the data they need.
 */

// Simple GraphQL implementation
class GraphQLSchema {
    constructor() {
        this.types = {};
        this.queries = {};
        this.mutations = {};
    }
    
    addType(name, type) {
        this.types[name] = type;
    }
    
    addQuery(name, resolver) {
        this.queries[name] = resolver;
    }
    
    addMutation(name, resolver) {
        this.mutations[name] = resolver;
    }
    
    execute(query, variables = {}) {
        try {
            const parsed = this.parseQuery(query);
            if (parsed.operation === 'query') {
                return this.executeQuery(parsed, variables);
            } else if (parsed.operation === 'mutation') {
                return this.executeMutation(parsed, variables);
            }
        } catch (error) {
            return { errors: [{ message: error.message }] };
        }
    }
    
    parseQuery(query) {
        // Simplified parser - in real implementation, use a proper GraphQL parser
        const trimmed = query.trim();
        const isMutation = trimmed.startsWith('mutation');
        const operation = isMutation ? 'mutation' : 'query';
        
        // Extract field names (simplified)
        const fields = [];
        const fieldRegex = /(\w+)\s*\{/g;
        let match;
        while ((match = fieldRegex.exec(query)) !== null) {
            fields.push(match[1]);
        }
        
        return { operation, fields };
    }
    
    executeQuery(parsed, variables) {
        const data = {};
        for (const field of parsed.fields) {
            const resolver = this.queries[field];
            if (resolver) {
                data[field] = resolver(variables);
            }
        }
        return { data };
    }
    
    executeMutation(parsed, variables) {
        const data = {};
        for (const field of parsed.fields) {
            const resolver = this.mutations[field];
            if (resolver) {
                data[field] = resolver(variables);
            }
        }
        return { data };
    }
}

// Example usage
console.log('=== GraphQL ===\n');

const schema = new GraphQLSchema();

// Define queries
schema.addQuery('users', () => {
    return [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
});

schema.addQuery('user', (variables) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    return users.find(u => u.id === variables.id);
});

schema.addQuery('posts', () => {
    return [
        { id: 1, title: 'First Post', content: 'Hello World', authorId: 1 },
        { id: 2, title: 'Second Post', content: 'GraphQL Example', authorId: 1 }
    ];
});

// Define mutations
schema.addMutation('createUser', (variables) => {
    return {
        id: Date.now(),
        name: variables.name,
        email: variables.email
    };
});

schema.addMutation('updateUser', (variables) => {
    return {
        id: variables.id,
        name: variables.name || 'Updated Name',
        email: variables.email || 'updated@example.com'
    };
});

// Execute queries
console.log('Query: users');
const query1 = `
    query {
        users {
            id
            name
            email
        }
    }
`;
console.log(JSON.stringify(schema.execute(query1), null, 2));

console.log('\nQuery: user with ID');
const query2 = `
    query {
        user(id: 1) {
            id
            name
            email
        }
    }
`;
console.log(JSON.stringify(schema.execute(query2, { id: 1 }), null, 2));

console.log('\nMutation: createUser');
const mutation1 = `
    mutation {
        createUser(name: "Bob", email: "bob@example.com") {
            id
            name
            email
        }
    }
`;
console.log(JSON.stringify(schema.execute(mutation1, { name: 'Bob', email: 'bob@example.com' }), null, 2));

module.exports = { GraphQLSchema };

