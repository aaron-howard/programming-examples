/**
 * Infrastructure as Code - JavaScript
 * 
 * Managing infrastructure through code:
 * - Resource definitions
 * - Configuration management
 * - Provisioning
 */

// Infrastructure Resource
class InfrastructureResource {
    constructor(type, name, config = {}) {
        this.type = type;
        this.name = name;
        this.config = config;
        this.state = 'pending';
    }
    
    async provision() {
        console.log(`Provisioning ${this.type}: ${this.name}`);
        this.state = 'provisioning';
        
        // Simulate provisioning
        await this.delay(500);
        this.state = 'provisioned';
        
        console.log(`✓ ${this.type} ${this.name} provisioned`);
        return this;
    }
    
    async destroy() {
        console.log(`Destroying ${this.type}: ${this.name}`);
        this.state = 'destroying';
        await this.delay(300);
        this.state = 'destroyed';
        console.log(`✓ ${this.type} ${this.name} destroyed`);
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Infrastructure Stack
class InfrastructureStack {
    constructor(name) {
        this.name = name;
        this.resources = [];
    }
    
    addResource(resource) {
        this.resources.push(resource);
        return this;
    }
    
    async deploy() {
        console.log(`Deploying stack: ${this.name}`);
        console.log(`Resources: ${this.resources.length}`);
        
        for (const resource of this.resources) {
            await resource.provision();
        }
        
        console.log(`\nStack ${this.name} deployed successfully`);
    }
    
    async destroy() {
        console.log(`Destroying stack: ${this.name}`);
        
        // Destroy in reverse order
        for (let i = this.resources.length - 1; i >= 0; i--) {
            await this.resources[i].destroy();
        }
        
        console.log(`\nStack ${this.name} destroyed`);
    }
    
    getResources() {
        return this.resources.map(r => ({
            type: r.type,
            name: r.name,
            state: r.state
        }));
    }
}

// Resource Factory
class ResourceFactory {
    static createServer(name, config) {
        return new InfrastructureResource('server', name, {
            cpu: config.cpu || 2,
            memory: config.memory || '4GB',
            ...config
        });
    }
    
    static createDatabase(name, config) {
        return new InfrastructureResource('database', name, {
            engine: config.engine || 'postgresql',
            version: config.version || '14',
            ...config
        });
    }
    
    static createLoadBalancer(name, config) {
        return new InfrastructureResource('load_balancer', name, {
            type: config.type || 'application',
            ...config
        });
    }
}

// Example usage
console.log('=== Infrastructure as Code ===\n');

const stack = new InfrastructureStack('production');

// Define infrastructure
stack
    .addResource(ResourceFactory.createServer('web-server-1', { cpu: 4, memory: '8GB' }))
    .addResource(ResourceFactory.createServer('web-server-2', { cpu: 4, memory: '8GB' }))
    .addResource(ResourceFactory.createDatabase('main-db', { engine: 'postgresql', version: '14' }))
    .addResource(ResourceFactory.createLoadBalancer('app-lb', { type: 'application' }));

// Deploy stack
await stack.deploy();

// Show resources
console.log('\nStack Resources:');
stack.getResources().forEach(resource => {
    console.log(`  ${resource.type}: ${resource.name} (${resource.state})`);
});

module.exports = { InfrastructureResource, InfrastructureStack, ResourceFactory };

