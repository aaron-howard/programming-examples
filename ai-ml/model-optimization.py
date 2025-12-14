"""
Model Optimization - Python

Techniques for improving model performance:
- Hyperparameter tuning
- Model pruning (simplified)
- Learning rate scheduling
"""

import math
from typing import Dict, List, Callable, Any
from itertools import product


# Learning Rate Scheduler
class LearningRateScheduler:
    def __init__(self, initial_rate: float, schedule: str):
        self.initial_rate = initial_rate
        self.schedule = schedule  # 'constant', 'step', 'exponential', 'cosine'
        self.current_rate = initial_rate
        self.epoch = 0
    
    def get_learning_rate(self, epoch: int = None) -> float:
        if epoch is not None:
            self.epoch = epoch
        
        if self.schedule == 'constant':
            return self.initial_rate
        elif self.schedule == 'step':
            # Reduce by factor every N epochs
            step_size = 10
            factor = 0.5
            return self.initial_rate * (factor ** (self.epoch // step_size))
        elif self.schedule == 'exponential':
            # Exponential decay
            decay_rate = 0.95
            return self.initial_rate * (decay_rate ** self.epoch)
        elif self.schedule == 'cosine':
            # Cosine annealing
            max_epochs = 100
            return self.initial_rate * 0.5 * (1 + math.cos(math.pi * self.epoch / max_epochs))
        else:
            return self.initial_rate
    
    def step(self) -> float:
        self.epoch += 1
        self.current_rate = self.get_learning_rate()
        return self.current_rate


# Model Pruning (Simplified)
class ModelPruner:
    def __init__(self, pruning_ratio: float = 0.2):
        self.pruning_ratio = pruning_ratio
    
    def prune(self, model: Dict) -> Dict:
        # Prune smallest weights
        weights = self.collect_weights(model)
        threshold = self.calculate_threshold(weights)
        
        pruned_count = 0
        for weight in weights:
            if abs(weight['value']) < threshold:
                weight['value'] = 0
                pruned_count += 1
        
        return {
            'pruned_count': pruned_count,
            'total_weights': len(weights),
            'pruning_ratio': pruned_count / len(weights) if weights else 0
        }
    
    def collect_weights(self, model: Dict) -> List[Dict]:
        # Simplified - collect all weights
        weights = []
        if 'weights' in model:
            model_weights = model['weights']
            if isinstance(model_weights, list):
                weights.extend([{'value': w} for w in model_weights])
            elif isinstance(model_weights, dict):
                for w in model_weights.values():
                    if isinstance(w, list):
                        weights.extend([{'value': v} for v in w])
                    else:
                        weights.append({'value': w})
        return weights
    
    def calculate_threshold(self, weights: List[Dict]) -> float:
        if not weights:
            return 0
        sorted_weights = sorted([abs(w['value']) for w in weights])
        index = int(len(sorted_weights) * self.pruning_ratio)
        return sorted_weights[index] if index < len(sorted_weights) else 0


# Hyperparameter Tuning
class HyperparameterTuner:
    def __init__(self, model_factory: Callable):
        self.model_factory = model_factory
        self.best_params = None
        self.best_score = float('-inf')
    
    def grid_search(self, param_grid: Dict[str, List], 
                    training_data: List, validation_data: List) -> Dict:
        combinations = self.generate_combinations(param_grid)
        results = []
        
        for params in combinations:
            model = self.model_factory(params)
            score = self.evaluate_model(model, training_data, validation_data)
            results.append({'params': params, 'score': score})
            
            if score > self.best_score:
                self.best_score = score
                self.best_params = params
        
        return {
            'best_params': self.best_params,
            'best_score': self.best_score,
            'results': results
        }
    
    def generate_combinations(self, param_grid: Dict[str, List]) -> List[Dict]:
        keys = list(param_grid.keys())
        values = [param_grid[key] for key in keys]
        combinations = []
        
        for combo in product(*values):
            combinations.append(dict(zip(keys, combo)))
        
        return combinations
    
    def evaluate_model(self, model: Any, training_data: List, validation_data: List) -> float:
        # Train model (simplified)
        if hasattr(model, 'train'):
            model.train(training_data)
        
        # Evaluate on validation data
        correct = 0
        for example in validation_data:
            prediction = model.predict(example['input'])
            if abs(prediction - example['target']) < 0.1:
                correct += 1
        
        return correct / len(validation_data) if validation_data else 0


# Example usage
if __name__ == "__main__":
    print("=== Model Optimization ===\n")
    
    # Learning Rate Scheduling
    print("Learning Rate Scheduling:")
    schedulers = {
        'constant': LearningRateScheduler(0.1, 'constant'),
        'step': LearningRateScheduler(0.1, 'step'),
        'exponential': LearningRateScheduler(0.1, 'exponential'),
        'cosine': LearningRateScheduler(0.1, 'cosine')
    }
    
    print("Learning rates over epochs:")
    for epoch in range(0, 20, 5):
        rates = {}
        for name, scheduler in schedulers.items():
            rates[name] = f"{scheduler.get_learning_rate(epoch):.4f}"
        print(f"Epoch {epoch}: {rates}")
    
    # Model Pruning
    print("\nModel Pruning:")
    simple_model = {
        'weights': [0.1, 0.05, 0.8, 0.02, 0.9, 0.01, 0.7, 0.03]
    }
    
    pruner = ModelPruner(0.3)
    result = pruner.prune(simple_model)
    print("Pruning result:", result)
    print("Pruned weights:", simple_model['weights'])

