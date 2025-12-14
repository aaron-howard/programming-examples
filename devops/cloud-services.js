/**
 * Cloud Services - JavaScript
 * 
 * Cloud computing concepts:
 * - Service abstraction
 * - Auto-scaling
 * - Load balancing
 */

// Cloud Service
class CloudService {
    constructor(name, type, config = {}) {
        this.name = name;
        this.type = type;
        this.config = config;
        this.status = 'stopped';
        this.instances = [];
    }
    
    async provision() {
        console.log(`Provisioning ${this.type} service: ${this.name}`);
        this.status = 'provisioning';
        await this.delay(1000);
        this.status = 'running';
        console.log(`✓ Service ${this.name} provisioned`);
    }
    
    async scale(desiredInstances) {
        const current = this.instances.length;
        console.log(`Scaling ${this.name} from ${current} to ${desiredInstances} instances`);
        
        if (desiredInstances > current) {
            // Scale up
            for (let i = current; i < desiredInstances; i++) {
                const instance = await this.createInstance();
                this.instances.push(instance);
            }
        } else if (desiredInstances < current) {
            // Scale down
            const toRemove = current - desiredInstances;
            for (let i = 0; i < toRemove; i++) {
                const instance = this.instances.pop();
                await this.destroyInstance(instance);
            }
        }
        
        console.log(`✓ Scaled to ${this.instances.length} instances`);
    }
    
    async createInstance() {
        await this.delay(500);
        return {
            id: `instance-${Date.now()}`,
            status: 'running',
            createdAt: new Date()
        };
    }
    
    async destroyInstance(instance) {
        console.log(`  Destroying instance ${instance.id}`);
        await this.delay(300);
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Auto Scaler
class AutoScaler {
    constructor(service, config) {
        this.service = service;
        this.minInstances = config.minInstances || 1;
        this.maxInstances = config.maxInstances || 10;
        this.targetCPU = config.targetCPU || 70;
        this.scaleUpThreshold = config.scaleUpThreshold || 80;
        this.scaleDownThreshold = config.scaleDownThreshold || 30;
    }
    
    async evaluate(cpuUsage) {
        const currentInstances = this.service.instances.length;
        
        if (cpuUsage > this.scaleUpThreshold && currentInstances < this.maxInstances) {
            await this.service.scale(currentInstances + 1);
        } else if (cpuUsage < this.scaleDownThreshold && currentInstances > this.minInstances) {
            await this.service.scale(currentInstances - 1);
        }
    }
}

// Load Balancer
class LoadBalancer {
    constructor(strategy = 'round-robin') {
        this.strategy = strategy;
        this.backends = [];
        this.currentIndex = 0;
    }
    
    addBackend(backend) {
        this.backends.push({
            ...backend,
            health: 'healthy',
            requests: 0
        });
    }
    
    selectBackend() {
        if (this.backends.length === 0) {
            throw new Error('No backends available');
        }
        
        const healthyBackends = this.backends.filter(b => b.health === 'healthy');
        if (healthyBackends.length === 0) {
            throw new Error('No healthy backends available');
        }
        
        switch (this.strategy) {
            case 'round-robin':
                const backend = healthyBackends[this.currentIndex % healthyBackends.length];
                this.currentIndex++;
                backend.requests++;
                return backend;
            
            case 'least-connections':
                return healthyBackends.reduce((min, b) => 
                    b.requests < min.requests ? b : min
                );
            
            default:
                return healthyBackends[0];
        }
    }
    
    getStats() {
        return {
            totalBackends: this.backends.length,
            healthyBackends: this.backends.filter(b => b.health === 'healthy').length,
            totalRequests: this.backends.reduce((sum, b) => sum + b.requests, 0)
        };
    }
}

// Example usage
console.log('=== Cloud Services ===\n');

// Auto-scaling service
const webService = new CloudService('web-app', 'compute');
await webService.provision();
await webService.scale(2);

const autoScaler = new AutoScaler(webService, {
    minInstances: 1,
    maxInstances: 5,
    targetCPU: 70,
    scaleUpThreshold: 80,
    scaleDownThreshold: 30
});

console.log('\nAuto-scaling evaluation:');
await autoScaler.evaluate(85); // High CPU - should scale up
await autoScaler.evaluate(25); // Low CPU - should scale down

// Load balancing
console.log('\nLoad Balancing:');
const loadBalancer = new LoadBalancer('round-robin');

loadBalancer.addBackend({ id: 'backend-1', url: 'http://backend1.example.com' });
loadBalancer.addBackend({ id: 'backend-2', url: 'http://backend2.example.com' });
loadBalancer.addBackend({ id: 'backend-3', url: 'http://backend3.example.com' });

console.log('Request routing:');
for (let i = 0; i < 5; i++) {
    const backend = loadBalancer.selectBackend();
    console.log(`  Request ${i + 1} -> ${backend.id}`);
}

console.log('\nLoad balancer stats:');
console.log(loadBalancer.getStats());

module.exports = { CloudService, AutoScaler, LoadBalancer };

