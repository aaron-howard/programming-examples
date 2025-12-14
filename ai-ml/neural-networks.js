/**
 * Neural Networks - JavaScript
 * 
 * Basic neural network implementation:
 * - Perceptron
 * - Multi-layer perceptron
 * - Forward propagation
 * - Backpropagation (simplified)
 */

// Simple Perceptron
class Perceptron {
    constructor(inputSize, learningRate = 0.1) {
        this.weights = Array(inputSize).fill(0).map(() => Math.random() * 2 - 1);
        this.bias = Math.random() * 2 - 1;
        this.learningRate = learningRate;
    }
    
    // Activation function (sigmoid)
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    // Predict output
    predict(inputs) {
        let sum = this.bias;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        return this.sigmoid(sum);
    }
    
    // Train on a single example
    train(inputs, target) {
        const prediction = this.predict(inputs);
        const error = target - prediction;
        
        // Update weights
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += this.learningRate * error * inputs[i];
        }
        this.bias += this.learningRate * error;
        
        return error;
    }
}

// Multi-Layer Neural Network
class NeuralNetwork {
    constructor(layers) {
        this.layers = [];
        for (let i = 0; i < layers.length - 1; i++) {
            this.layers.push({
                weights: Array(layers[i + 1]).fill(0).map(() =>
                    Array(layers[i]).fill(0).map(() => Math.random() * 2 - 1)
                ),
                biases: Array(layers[i + 1]).fill(0).map(() => Math.random() * 2 - 1)
            });
        }
    }
    
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    sigmoidDerivative(x) {
        return x * (1 - x);
    }
    
    // Forward propagation
    forward(input) {
        let current = input;
        const activations = [input];
        
        for (const layer of this.layers) {
            const next = [];
            for (let i = 0; i < layer.weights.length; i++) {
                let sum = layer.biases[i];
                for (let j = 0; j < layer.weights[i].length; j++) {
                    sum += current[j] * layer.weights[i][j];
                }
                next.push(this.sigmoid(sum));
            }
            activations.push(next);
            current = next;
        }
        
        return { output: current, activations };
    }
    
    // Train on a single example (simplified backpropagation)
    train(input, target, learningRate = 0.1) {
        const { output, activations } = this.forward(input);
        
        // Calculate output error
        const outputError = target.map((t, i) => t - output[i]);
        
        // Simplified weight update (gradient descent)
        for (let i = this.layers.length - 1; i >= 0; i--) {
            const layer = this.layers[i];
            const layerOutput = activations[i + 1];
            const layerInput = activations[i];
            
            for (let j = 0; j < layer.weights.length; j++) {
                const error = outputError[j] * this.sigmoidDerivative(layerOutput[j]);
                for (let k = 0; k < layer.weights[j].length; k++) {
                    layer.weights[j][k] += learningRate * error * layerInput[k];
                }
                layer.biases[j] += learningRate * error;
            }
        }
        
        return outputError.reduce((sum, e) => sum + Math.abs(e), 0);
    }
}

// Example usage
console.log('=== Neural Networks ===\n');

// Perceptron - AND gate
console.log('Perceptron (AND Gate):');
const andPerceptron = new Perceptron(2, 0.1);
const andData = [
    { input: [0, 0], target: 0 },
    { input: [0, 1], target: 0 },
    { input: [1, 0], target: 0 },
    { input: [1, 1], target: 1 }
];

// Train
for (let epoch = 0; epoch < 100; epoch++) {
    andData.forEach(({ input, target }) => {
        andPerceptron.train(input, target);
    });
}

// Test
andData.forEach(({ input, target }) => {
    const prediction = andPerceptron.predict(input);
    console.log(`Input: [${input.join(', ')}], Target: ${target}, Prediction: ${prediction.toFixed(2)}`);
});

// Multi-layer network
console.log('\nMulti-Layer Neural Network:');
const nn = new NeuralNetwork([2, 3, 1]);

// XOR problem
const xorData = [
    { input: [0, 0], target: [0] },
    { input: [0, 1], target: [1] },
    { input: [1, 0], target: [1] },
    { input: [1, 1], target: [0] }
];

// Train
for (let epoch = 0; epoch < 1000; epoch++) {
    xorData.forEach(({ input, target }) => {
        nn.train(input, target, 0.5);
    });
}

// Test
console.log('\nXOR Problem Results:');
xorData.forEach(({ input, target }) => {
    const result = nn.forward(input);
    console.log(`Input: [${input.join(', ')}], Target: ${target[0]}, Output: ${result.output[0].toFixed(2)}`);
});

module.exports = { Perceptron, NeuralNetwork };

