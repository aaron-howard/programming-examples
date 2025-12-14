/**
 * Saga Pattern - JavaScript
 * 
 * Manages distributed transactions by breaking them into a series of
 * local transactions with compensating actions.
 */

class SagaStep {
    constructor(name, action, compensation) {
        this.name = name;
        this.action = action;
        this.compensation = compensation;
        this.executed = false;
    }
    
    async execute() {
        try {
            const result = await this.action();
            this.executed = true;
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async compensate() {
        if (this.executed && this.compensation) {
            await this.compensation();
            this.executed = false;
        }
    }
}

class Saga {
    constructor() {
        this.steps = [];
    }
    
    addStep(step) {
        this.steps.push(step);
    }
    
    async execute() {
        const executedSteps = [];
        
        try {
            for (const step of this.steps) {
                await step.execute();
                executedSteps.push(step);
            }
            return { success: true };
        } catch (error) {
            // Compensate in reverse order
            for (let i = executedSteps.length - 1; i >= 0; i--) {
                await executedSteps[i].compensate();
            }
            return { success: false, error: error.message };
        }
    }
}

// Example usage
console.log('=== Saga Pattern ===\n');

const saga = new Saga();

saga.addStep(new SagaStep(
    'Reserve Inventory',
    async () => {
        console.log('Reserving inventory...');
        return 'Inventory reserved';
    },
    async () => console.log('Releasing inventory...')
));

saga.addStep(new SagaStep(
    'Charge Payment',
    async () => {
        console.log('Charging payment...');
        return 'Payment charged';
    },
    async () => console.log('Refunding payment...')
));

saga.addStep(new SagaStep(
    'Create Order',
    async () => {
        console.log('Creating order...');
        // Simulate failure
        throw new Error('Order creation failed');
    },
    async () => console.log('Cancelling order...')
));

saga.execute().then(result => {
    console.log('Saga result:', result);
});

module.exports = { Saga, SagaStep };

