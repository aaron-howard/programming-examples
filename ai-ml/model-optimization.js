/**
 * Model Optimization - JavaScript
 * 
 * Techniques for improving model performance:
 * - Hyperparameter tuning
 * - Model pruning (simplified)
 * - Learning rate scheduling
 */

// Hyperparameter Tuning
class HyperparameterTuner {
    constructor(modelFactory) {
        this.modelFactory = modelFactory;
        this.bestParams = null;
        this.bestScore = -Infinity;
    }
    
    // Grid search
    gridSearch(paramGrid, trainingData, validationData) {
        const combinations = this.generateCombinations(paramGrid);
        const results = [];
        
        for (const params of combinations) {
            const model = this.modelFactory(params);
            const score = this.evaluateModel(model, trainingData, validationData);
            results.push({ params, score });
            
            if (score > this.bestScore) {
                this.bestScore = score;
                this.bestParams = params;
            }
        }
        
        return { bestParams: this.bestParams, bestScore: this.bestScore, results };
    }
    
    generateCombinations(paramGrid) {
        const keys = Object.keys(paramGrid);
        const values = keys.map(key => paramGrid[key]);
        const combinations = [];
        
        function generate(index, current) {
            if (index === keys.length) {
                combinations.push({ ...current });
                return;
            }
            
            for (const value of values[index]) {
                current[keys[index]] = value;
                generate(index + 1, current);
            }
        }
        
        generate(0, {});
        return combinations;
    }
    
    evaluateModel(model, trainingData, validationData) {
        // Train model
        model.train(trainingData);
        
        // Evaluate on validation data
        let correct = 0;
        for (const example of validationData) {
            const prediction = model.predict(example.input);
            if (Math.abs(prediction - example.target) < 0.1) {
                correct++;
            }
        }
        
        return correct / validationData.length;
    }
}

// Learning Rate Scheduler
class LearningRateScheduler {
    constructor(initialRate, schedule) {
        this.initialRate = initialRate;
        this.schedule = schedule; // 'constant', 'step', 'exponential', 'cosine'
        this.currentRate = initialRate;
        this.epoch = 0;
    }
    
    getLearningRate(epoch = null) {
        if (epoch !== null) {
            this.epoch = epoch;
        }
        
        switch (this.schedule) {
            case 'constant':
                return this.initialRate;
            
            case 'step':
                // Reduce by factor every N epochs
                const stepSize = 10;
                const factor = 0.5;
                return this.initialRate * Math.pow(factor, Math.floor(this.epoch / stepSize));
            
            case 'exponential':
                // Exponential decay
                const decayRate = 0.95;
                return this.initialRate * Math.pow(decayRate, this.epoch);
            
            case 'cosine':
                // Cosine annealing
                const maxEpochs = 100;
                return this.initialRate * 0.5 * (1 + Math.cos(Math.PI * this.epoch / maxEpochs));
            
            default:
                return this.initialRate;
        }
    }
    
    step() {
        this.epoch++;
        this.currentRate = this.getLearningRate();
        return this.currentRate;
    }
}

// Model Pruning (Simplified)
class ModelPruner {
    constructor(pruningRatio = 0.2) {
        this.pruningRatio = pruningRatio;
    }
    
    prune(model) {
        // Prune smallest weights
        const weights = this.collectWeights(model);
        const threshold = this.calculateThreshold(weights);
        
        let prunedCount = 0;
        for (const weight of weights) {
            if (Math.abs(weight.value) < threshold) {
                weight.value = 0;
                prunedCount++;
            }
        }
        
        return {
            prunedCount,
            totalWeights: weights.length,
            pruningRatio: prunedCount / weights.length
        };
    }
    
    collectWeights(model) {
        // Simplified - collect all weights
        const weights = [];
        if (model.weights) {
            if (Array.isArray(model.weights)) {
                model.weights.forEach(w => weights.push({ value: w }));
            } else {
                Object.values(model.weights).forEach(w => {
                    if (Array.isArray(w)) {
                        w.forEach(v => weights.push({ value: v }));
                    } else {
                        weights.push({ value: w });
                    }
                });
            }
        }
        return weights;
    }
    
    calculateThreshold(weights) {
        const sorted = weights.map(w => Math.abs(w.value)).sort((a, b) => a - b);
        const index = Math.floor(sorted.length * this.pruningRatio);
        return sorted[index] || 0;
    }
}

// Example usage
console.log('=== Model Optimization ===\n');

// Learning Rate Scheduling
console.log('Learning Rate Scheduling:');
const schedulers = {
    constant: new LearningRateScheduler(0.1, 'constant'),
    step: new LearningRateScheduler(0.1, 'step'),
    exponential: new LearningRateScheduler(0.1, 'exponential'),
    cosine: new LearningRateScheduler(0.1, 'cosine')
};

console.log('Learning rates over epochs:');
for (let epoch = 0; epoch < 20; epoch += 5) {
    const rates = {};
    for (const [name, scheduler] of Object.entries(schedulers)) {
        rates[name] = scheduler.getLearningRate(epoch).toFixed(4);
    }
    console.log(`Epoch ${epoch}:`, rates);
}

// Model Pruning
console.log('\nModel Pruning:');
const simpleModel = {
    weights: [0.1, 0.05, 0.8, 0.02, 0.9, 0.01, 0.7, 0.03]
};

const pruner = new ModelPruner(0.3);
const result = pruner.prune(simpleModel);
console.log('Pruning result:', result);
console.log('Pruned weights:', simpleModel.weights);

module.exports = { HyperparameterTuner, LearningRateScheduler, ModelPruner };

