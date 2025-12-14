/**
 * Serverless Architecture - JavaScript
 * 
 * Architecture where code runs in stateless functions triggered by events,
 * managed by cloud providers (AWS Lambda, Azure Functions, etc.)
 */

// Simulated Serverless Function Handler
class ServerlessFunction {
    constructor(name, handler) {
        this.name = name;
        this.handler = handler;
        this.invocations = 0;
        this.coldStarts = 0;
    }
    
    async invoke(event, context) {
        const isColdStart = this.invocations === 0;
        if (isColdStart) {
            this.coldStarts++;
            console.log(`[${this.name}] Cold start - initializing...`);
            await this.initialize();
        }
        
        this.invocations++;
        console.log(`[${this.name}] Invocation #${this.invocations}`);
        
        try {
            const result = await this.handler(event, context);
            return {
                statusCode: 200,
                body: JSON.stringify(result)
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            };
        }
    }
    
    async initialize() {
        // Simulate initialization (DB connections, etc.)
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// API Gateway Handler
class APIGateway {
    constructor() {
        this.functions = {};
    }
    
    registerFunction(path, method, func) {
        const key = `${method}:${path}`;
        this.functions[key] = func;
    }
    
    async handleRequest(method, path, body) {
        const key = `${method}:${path}`;
        const func = this.functions[key];
        
        if (!func) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Not found' })
            };
        }
        
        const event = { path, method, body: JSON.parse(body || '{}') };
        const context = { requestId: Date.now().toString() };
        
        return await func.invoke(event, context);
    }
}

// Example Functions
const userHandler = async (event, context) => {
    return {
        message: 'User created',
        userId: Date.now(),
        data: event.body
    };
};

const orderHandler = async (event, context) => {
    return {
        message: 'Order processed',
        orderId: Date.now(),
        data: event.body
    };
};

// Example usage
console.log('=== Serverless Architecture ===\n');

const gateway = new APIGateway();

const createUser = new ServerlessFunction('createUser', userHandler);
const processOrder = new ServerlessFunction('processOrder', orderHandler);

gateway.registerFunction('/users', 'POST', createUser);
gateway.registerFunction('/orders', 'POST', processOrder);

console.log('Invoking functions:');
console.log(await gateway.handleRequest('POST', '/users', JSON.stringify({ name: 'John' })));
console.log(await gateway.handleRequest('POST', '/orders', JSON.stringify({ item: 'Book' })));

module.exports = { ServerlessFunction, APIGateway };

