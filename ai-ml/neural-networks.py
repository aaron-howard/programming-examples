"""
Neural Networks - Python

Basic neural network implementation:
- Perceptron
- Multi-layer perceptron
- Forward propagation
- Backpropagation (simplified)
"""

import numpy as np
from typing import List


# Simple Perceptron
class Perceptron:
    def __init__(self, input_size: int, learning_rate: float = 0.1):
        self.weights = np.random.uniform(-1, 1, input_size)
        self.bias = np.random.uniform(-1, 1)
        self.learning_rate = learning_rate
    
    def sigmoid(self, x: float) -> float:
        return 1 / (1 + np.exp(-x))
    
    def predict(self, inputs: List[float]) -> float:
        sum_val = self.bias + np.dot(inputs, self.weights)
        return self.sigmoid(sum_val)
    
    def train(self, inputs: List[float], target: float) -> float:
        prediction = self.predict(inputs)
        error = target - prediction
        
        # Update weights
        self.weights += self.learning_rate * error * np.array(inputs)
        self.bias += self.learning_rate * error
        
        return error


# Multi-Layer Neural Network
class NeuralNetwork:
    def __init__(self, layers: List[int]):
        self.layers = []
        for i in range(len(layers) - 1):
            self.layers.append({
                'weights': np.random.uniform(-1, 1, (layers[i + 1], layers[i])),
                'biases': np.random.uniform(-1, 1, layers[i + 1])
            })
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def forward(self, input_data: List[float]):
        current = np.array(input_data)
        activations = [current]
        
        for layer in self.layers:
            next_layer = self.sigmoid(np.dot(layer['weights'], current) + layer['biases'])
            activations.append(next_layer)
            current = next_layer
        
        return {'output': current, 'activations': activations}
    
    def train(self, input_data: List[float], target: List[float], learning_rate: float = 0.1):
        result = self.forward(input_data)
        output = result['output']
        activations = result['activations']
        
        # Calculate output error
        output_error = np.array(target) - output
        
        # Simplified weight update (gradient descent)
        for i in range(len(self.layers) - 1, -1, -1):
            layer = self.layers[i]
            layer_output = activations[i + 1]
            layer_input = activations[i]
            
            error = output_error * self.sigmoid_derivative(layer_output)
            
            layer['weights'] += learning_rate * np.outer(error, layer_input)
            layer['biases'] += learning_rate * error
            
            if i > 0:
                output_error = np.dot(layer['weights'].T, error)
        
        return np.sum(np.abs(output_error))


# Example usage
if __name__ == "__main__":
    print("=== Neural Networks ===\n")
    
    # Perceptron - AND gate
    print("Perceptron (AND Gate):")
    and_perceptron = Perceptron(2, 0.1)
    and_data = [
        {'input': [0, 0], 'target': 0},
        {'input': [0, 1], 'target': 0},
        {'input': [1, 0], 'target': 0},
        {'input': [1, 1], 'target': 1}
    ]
    
    # Train
    for epoch in range(100):
        for example in and_data:
            and_perceptron.train(example['input'], example['target'])
    
    # Test
    for example in and_data:
        prediction = and_perceptron.predict(example['input'])
        print(f"Input: {example['input']}, Target: {example['target']}, Prediction: {prediction:.2f}")
    
    # Multi-layer network
    print("\nMulti-Layer Neural Network:")
    nn = NeuralNetwork([2, 3, 1])
    
    # XOR problem
    xor_data = [
        {'input': [0, 0], 'target': [0]},
        {'input': [0, 1], 'target': [1]},
        {'input': [1, 0], 'target': [1]},
        {'input': [1, 1], 'target': [0]}
    ]
    
    # Train
    for epoch in range(1000):
        for example in xor_data:
            nn.train(example['input'], example['target'], 0.5)
    
    # Test
    print("\nXOR Problem Results:")
    for example in xor_data:
        result = nn.forward(example['input'])
        print(f"Input: {example['input']}, Target: {example['target'][0]}, Output: {result['output'][0]:.2f}")

