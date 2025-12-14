/**
 * Containers - JavaScript
 * 
 * Container orchestration concepts:
 * - Container lifecycle
 * - Service discovery
 * - Health checks
 */

// Container
class Container {
    constructor(name, image, config = {}) {
        this.name = name;
        this.image = image;
        this.config = {
            ports: config.ports || [],
            env: config.env || {},
            healthCheck: config.healthCheck || null,
            ...config
        };
        this.status = 'stopped';
        this.health = 'unknown';
    }
    
    async start() {
        console.log(`Starting container: ${this.name}`);
        this.status = 'starting';
        
        // Simulate container startup
        await this.delay(1000);
        this.status = 'running';
        
        // Start health check if configured
        if (this.config.healthCheck) {
            this.startHealthCheck();
        }
        
        console.log(`Container ${this.name} is running`);
    }
    
    async stop() {
        console.log(`Stopping container: ${this.name}`);
        this.status = 'stopping';
        await this.delay(500);
        this.status = 'stopped';
        console.log(`Container ${this.name} stopped`);
    }
    
    async restart() {
        await this.stop();
        await this.start();
    }
    
    startHealthCheck() {
        if (this.config.healthCheck) {
            setInterval(async () => {
                this.health = await this.checkHealth();
            }, this.config.healthCheck.interval || 5000);
        }
    }
    
    async checkHealth() {
        // Simulate health check
        return Math.random() > 0.1 ? 'healthy' : 'unhealthy';
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    getStatus() {
        return {
            name: this.name,
            status: this.status,
            health: this.health,
            image: this.image
        };
    }
}

// Container Orchestrator
class ContainerOrchestrator {
    constructor() {
        this.containers = new Map();
        this.services = new Map();
    }
    
    deployContainer(container) {
        this.containers.set(container.name, container);
        return container;
    }
    
    async startContainer(name) {
        const container = this.containers.get(name);
        if (container) {
            await container.start();
        } else {
            throw new Error(`Container ${name} not found`);
        }
    }
    
    async stopContainer(name) {
        const container = this.containers.get(name);
        if (container) {
            await container.stop();
        }
    }
    
    // Service discovery
    registerService(name, container, port) {
        this.services.set(name, {
            container: container.name,
            port: port,
            endpoint: `http://${container.name}:${port}`
        });
    }
    
    discoverService(name) {
        return this.services.get(name);
    }
    
    listContainers() {
        return Array.from(this.containers.values()).map(c => c.getStatus());
    }
}

// Example usage
console.log('=== Containers ===\n');

const orchestrator = new ContainerOrchestrator();

// Deploy containers
const webContainer = new Container('web-server', 'nginx:latest', {
    ports: [80, 443],
    env: { NODE_ENV: 'production' },
    healthCheck: { interval: 5000 }
});

const apiContainer = new Container('api-server', 'node:18', {
    ports: [3000],
    env: { PORT: '3000' },
    healthCheck: { interval: 5000 }
});

orchestrator.deployContainer(webContainer);
orchestrator.deployContainer(apiContainer);

// Register services
orchestrator.registerService('web', webContainer, 80);
orchestrator.registerService('api', apiContainer, 3000);

// Start containers
console.log('Starting containers...');
await orchestrator.startContainer('web-server');
await orchestrator.startContainer('api-server');

// Service discovery
console.log('\nService Discovery:');
const webService = orchestrator.discoverService('web');
console.log('Web service:', webService);

const apiService = orchestrator.discoverService('api');
console.log('API service:', apiService);

// List containers
console.log('\nContainer Status:');
orchestrator.listContainers().forEach(container => {
    console.log(`  ${container.name}: ${container.status} (${container.health})`);
});

module.exports = { Container, ContainerOrchestrator };

