/**
 * REST API - JavaScript
 * 
 * Representational State Transfer API using HTTP methods:
 * - GET: Retrieve resources
 * - POST: Create resources
 * - PUT: Update resources
 * - DELETE: Remove resources
 */

// Simple REST API Server (using Express.js pattern)
class RESTAPI {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {}
        };
        this.data = {
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ],
            posts: [
                { id: 1, title: 'First Post', content: 'Hello World', userId: 1 },
                { id: 2, title: 'Second Post', content: 'REST API Example', userId: 1 }
            ]
        };
        this.nextUserId = 3;
        this.nextPostId = 3;
    }
    
    // Register routes
    get(path, handler) {
        this.routes.GET[path] = handler;
    }
    
    post(path, handler) {
        this.routes.POST[path] = handler;
    }
    
    put(path, handler) {
        this.routes.PUT[path] = handler;
    }
    
    delete(path, handler) {
        this.routes.DELETE[path] = handler;
    }
    
    // Handle request
    handleRequest(method, path, body = null) {
        const handler = this.routes[method]?.[path];
        if (!handler) {
            return { status: 404, data: { error: 'Not found' } };
        }
        return handler({ body, params: this.extractParams(path) });
    }
    
    extractParams(path) {
        // Simple parameter extraction
        const params = {};
        const pathParts = path.split('/');
        if (pathParts.length > 2 && pathParts[2]) {
            params.id = parseInt(pathParts[2]);
        }
        return params;
    }
}

// API Handlers
function setupAPI(api) {
    // GET /users - List all users
    api.get('/users', () => {
        return { status: 200, data: api.data.users };
    });
    
    // GET /users/:id - Get user by ID
    api.get('/users/:id', ({ params }) => {
        const user = api.data.users.find(u => u.id === params.id);
        if (!user) {
            return { status: 404, data: { error: 'User not found' } };
        }
        return { status: 200, data: user };
    });
    
    // POST /users - Create new user
    api.post('/users', ({ body }) => {
        if (!body.name || !body.email) {
            return { status: 400, data: { error: 'Name and email required' } };
        }
        const newUser = {
            id: api.nextUserId++,
            name: body.name,
            email: body.email
        };
        api.data.users.push(newUser);
        return { status: 201, data: newUser };
    });
    
    // PUT /users/:id - Update user
    api.put('/users/:id', ({ params, body }) => {
        const userIndex = api.data.users.findIndex(u => u.id === params.id);
        if (userIndex === -1) {
            return { status: 404, data: { error: 'User not found' } };
        }
        api.data.users[userIndex] = { ...api.data.users[userIndex], ...body };
        return { status: 200, data: api.data.users[userIndex] };
    });
    
    // DELETE /users/:id - Delete user
    api.delete('/users/:id', ({ params }) => {
        const userIndex = api.data.users.findIndex(u => u.id === params.id);
        if (userIndex === -1) {
            return { status: 404, data: { error: 'User not found' } };
        }
        api.data.users.splice(userIndex, 1);
        return { status: 204, data: null };
    });
    
    // GET /posts - List all posts
    api.get('/posts', () => {
        return { status: 200, data: api.data.posts };
    });
    
    // GET /posts/:id - Get post by ID
    api.get('/posts/:id', ({ params }) => {
        const post = api.data.posts.find(p => p.id === params.id);
        if (!post) {
            return { status: 404, data: { error: 'Post not found' } };
        }
        return { status: 200, data: post };
    });
}

// Example usage
console.log('=== REST API ===\n');

const api = new RESTAPI();
setupAPI(api);

// GET requests
console.log('GET /users:');
console.log(api.handleRequest('GET', '/users'));

console.log('\nGET /users/1:');
console.log(api.handleRequest('GET', '/users/1'));

// POST request
console.log('\nPOST /users:');
console.log(api.handleRequest('POST', '/users', {
    name: 'Bob Johnson',
    email: 'bob@example.com'
}));

// PUT request
console.log('\nPUT /users/1:');
console.log(api.handleRequest('PUT', '/users/1', {
    email: 'john.updated@example.com'
}));

// GET posts
console.log('\nGET /posts:');
console.log(api.handleRequest('GET', '/posts'));

module.exports = { RESTAPI, setupAPI };

