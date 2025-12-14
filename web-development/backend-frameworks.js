/**
 * Backend Frameworks - JavaScript
 * 
 * Examples of Express.js, Django (Python), and Laravel patterns:
 * - Routing
 * - Middleware
 * - Request/Response handling
 */

// Express.js-like Framework
class Express {
    constructor() {
        this.routes = [];
        this.middleware = [];
    }
    
    use(fn) {
        this.middleware.push(fn);
    }
    
    get(path, ...handlers) {
        this.routes.push({ method: 'GET', path, handlers });
    }
    
    post(path, ...handlers) {
        this.routes.push({ method: 'POST', path, handlers });
    }
    
    put(path, ...handlers) {
        this.routes.push({ method: 'PUT', path, handlers });
    }
    
    delete(path, ...handlers) {
        this.routes.push({ method: 'DELETE', path, handlers });
    }
    
    async handleRequest(method, path, req = {}) {
        // Run middleware
        for (const mw of this.middleware) {
            await mw(req, {}, () => {});
        }
        
        // Find matching route
        const route = this.routes.find(r => r.method === method && r.path === path);
        if (!route) {
            return { status: 404, body: { error: 'Not found' } };
        }
        
        // Execute handlers
        let result = null;
        for (const handler of route.handlers) {
            result = await handler(req, { json: (data) => data }, () => {});
            if (result) break;
        }
        
        return { status: 200, body: result || {} };
    }
}

// Middleware examples
function logger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
}

function jsonParser(req, res, next) {
    if (req.body) {
        req.body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    }
    next();
}

function authMiddleware(req, res, next) {
    const token = req.headers?.authorization;
    if (!token) {
        return res.json({ error: 'Unauthorized' });
    }
    req.user = { id: 1, name: 'User' };
    next();
}

// Example usage
console.log('=== Backend Frameworks (Express.js-like) ===\n');

const app = new Express();

// Middleware
app.use(logger);
app.use(jsonParser);

// Routes
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ]);
});

app.get('/api/users/:id', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    const user = users.find(u => u.id === parseInt(req.params?.id));
    res.json(user || { error: 'Not found' });
});

app.post('/api/users', authMiddleware, (req, res) => {
    res.json({
        id: Date.now(),
        ...req.body,
        created: new Date()
    });
});

// Test requests
console.log('GET /api/users:');
console.log(await app.handleRequest('GET', '/api/users', { method: 'GET', path: '/api/users' }));

console.log('\nGET /api/users/1:');
console.log(await app.handleRequest('GET', '/api/users/1', {
    method: 'GET',
    path: '/api/users/1',
    params: { id: '1' }
}));

console.log('\nPOST /api/users:');
console.log(await app.handleRequest('POST', '/api/users', {
    method: 'POST',
    path: '/api/users',
    body: { name: 'Bob', email: 'bob@example.com' },
    headers: { authorization: 'Bearer token123' }
}));

module.exports = { Express, logger, jsonParser, authMiddleware };

