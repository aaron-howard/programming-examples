/**
 * Chain of Responsibility Pattern - JavaScript
 * 
 * Passes requests along a chain of handlers. Each handler decides either to
 * process the request or pass it to the next handler in the chain.
 * 
 * Use cases:
 * - Request processing pipelines
 * - Event handling
 * - Middleware
 * - Validation chains
 */

// Handler interface
class Handler {
    constructor() {
        this.next = null;
    }
    
    setNext(handler) {
        this.next = handler;
        return handler;
    }
    
    handle(request) {
        if (this.next) {
            return this.next.handle(request);
        }
        return null;
    }
}

// Concrete handlers
class AuthenticationHandler extends Handler {
    handle(request) {
        if (request.user && request.user.authenticated) {
            console.log('Authentication: OK');
            return super.handle(request);
        }
        console.log('Authentication: FAILED');
        return 'Authentication failed';
    }
}

class AuthorizationHandler extends Handler {
    handle(request) {
        if (request.user && request.user.role === 'admin') {
            console.log('Authorization: OK');
            return super.handle(request);
        }
        console.log('Authorization: FAILED');
        return 'Authorization failed';
    }
}

class ValidationHandler extends Handler {
    handle(request) {
        if (request.data && request.data.length > 0) {
            console.log('Validation: OK');
            return super.handle(request);
        }
        console.log('Validation: FAILED');
        return 'Validation failed';
    }
}

class RequestProcessor extends Handler {
    handle(request) {
        console.log('Processing request:', request);
        return 'Request processed successfully';
    }
}

// Example usage
console.log('=== Chain of Responsibility Pattern ===\n');

// Build chain
const auth = new AuthenticationHandler();
const authz = new AuthorizationHandler();
const validation = new ValidationHandler();
const processor = new RequestProcessor();

auth.setNext(authz).setNext(validation).setNext(processor);

// Test requests
console.log('Request 1 (authenticated, admin, valid data):');
const request1 = {
    user: { authenticated: true, role: 'admin' },
    data: 'some data'
};
console.log('Result:', auth.handle(request1));

console.log('\nRequest 2 (not authenticated):');
const request2 = {
    user: { authenticated: false },
    data: 'some data'
};
console.log('Result:', auth.handle(request2));

console.log('\nRequest 3 (authenticated, but not admin):');
const request3 = {
    user: { authenticated: true, role: 'user' },
    data: 'some data'
};
console.log('Result:', auth.handle(request3));

module.exports = { Handler, AuthenticationHandler, AuthorizationHandler, ValidationHandler, RequestProcessor };

