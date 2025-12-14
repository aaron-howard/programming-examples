/**
 * Message Router Pattern - JavaScript
 * 
 * Routes messages to different handlers based on message content,
 * type, or routing rules.
 */

class MessageRouter {
    constructor() {
        this.routes = [];
    }
    
    addRoute(condition, handler) {
        this.routes.push({ condition, handler });
    }
    
    route(message) {
        for (const route of this.routes) {
            if (route.condition(message)) {
                return route.handler(message);
            }
        }
        return this.defaultHandler(message);
    }
    
    defaultHandler(message) {
        console.log(`No route found for message: ${JSON.stringify(message)}`);
    }
}

// Example usage
console.log('=== Message Router Pattern ===\n');

const router = new MessageRouter();

// Define routes
router.addRoute(
    (msg) => msg.type === 'order',
    (msg) => console.log(`Order handler: Processing order ${msg.id}`)
);

router.addRoute(
    (msg) => msg.type === 'payment',
    (msg) => console.log(`Payment handler: Processing payment ${msg.id}`)
);

router.addRoute(
    (msg) => msg.priority === 'high',
    (msg) => console.log(`High priority handler: ${msg.content}`)
);

// Route messages
router.route({ type: 'order', id: '123' });
router.route({ type: 'payment', id: '456' });
router.route({ type: 'notification', priority: 'high', content: 'Urgent message' });
router.route({ type: 'unknown', id: '999' });

module.exports = { MessageRouter };

