"""
Reinforcement Learning - Python

Learning through interaction with an environment:
- Q-Learning
- Policy gradients (simplified)
- Reward-based learning
"""

import random
from typing import List, Dict, Tuple


# Q-Learning Algorithm
class QLearning:
    def __init__(self, states: List[int], actions: List[str], 
                 learning_rate: float = 0.1, discount_factor: float = 0.9, 
                 epsilon: float = 0.1):
        self.states = states
        self.actions = actions
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon  # Exploration rate
        self.q_table: Dict[int, Dict[str, float]] = {}
        
        # Initialize Q-table
        for state in states:
            self.q_table[state] = {action: 0.0 for action in actions}
    
    def choose_action(self, state: int) -> str:
        if random.random() < self.epsilon:
            # Explore: random action
            return random.choice(self.actions)
        else:
            # Exploit: best action
            return self.get_best_action(state)
    
    def get_best_action(self, state: int) -> str:
        q_values = self.q_table[state]
        max_q = max(q_values.values())
        best_actions = [action for action, q in q_values.items() if q == max_q]
        return random.choice(best_actions)
    
    def update_q_value(self, state: int, action: str, reward: float, next_state: int):
        current_q = self.q_table[state][action]
        max_next_q = max(self.q_table[next_state].values())
        new_q = current_q + self.learning_rate * (
            reward + self.discount_factor * max_next_q - current_q
        )
        self.q_table[state][action] = new_q
    
    def get_q_table(self) -> Dict:
        return self.q_table


# Simple Grid World Environment
class GridWorld:
    def __init__(self, size: int = 4):
        self.size = size
        self.state = 0  # Start at position 0
        self.goal = size * size - 1  # Goal at last position
    
    def reset(self) -> int:
        self.state = 0
        return self.state
    
    def step(self, action: str) -> Tuple[int, float, bool]:
        actions = {
            'up': -self.size,
            'down': self.size,
            'left': -1,
            'right': 1
        }
        
        new_state = self.state + actions[action]
        
        # Check boundaries
        if new_state < 0 or new_state >= self.size * self.size:
            return (self.state, -1, False)
        
        # Check if goal reached
        if new_state == self.goal:
            self.state = new_state
            return (self.state, 100, True)
        
        self.state = new_state
        return (self.state, -1, False)
    
    def get_state(self) -> int:
        return self.state


# Example usage
if __name__ == "__main__":
    print("=== Reinforcement Learning (Q-Learning) ===\n")
    
    states = list(range(16))  # 4x4 grid
    actions = ['up', 'down', 'left', 'right']
    
    q_learning = QLearning(states, actions, 0.1, 0.9, 0.1)
    env = GridWorld(4)
    
    # Training
    print("Training Q-Learning agent...")
    for episode in range(100):
        state = env.reset()
        done = False
        steps = 0
        
        while not done and steps < 100:
            action = q_learning.choose_action(state)
            next_state, reward, is_done = env.step(action)
            q_learning.update_q_value(state, action, reward, next_state)
            state = next_state
            done = is_done
            steps += 1
    
    # Test
    print("\nTesting trained agent:")
    state = env.reset()
    done = False
    path = [state]
    
    while not done and len(path) < 20:
        action = q_learning.get_best_action(state)
        next_state, reward, is_done = env.step(action)
        state = next_state
        done = is_done
        path.append(state)
    
    print("Path to goal:", path)
    print("Goal reached:", done)

