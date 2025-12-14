/**
 * Reinforcement Learning - JavaScript
 * 
 * Learning through interaction with an environment:
 * - Q-Learning
 * - Policy gradients (simplified)
 * - Reward-based learning
 */

// Q-Learning Algorithm
class QLearning {
    constructor(states, actions, learningRate = 0.1, discountFactor = 0.9, epsilon = 0.1) {
        this.states = states;
        this.actions = actions;
        this.learningRate = learningRate;
        this.discountFactor = discountFactor;
        this.epsilon = epsilon; // Exploration rate
        this.qTable = {};
        
        // Initialize Q-table
        for (const state of states) {
            this.qTable[state] = {};
            for (const action of actions) {
                this.qTable[state][action] = 0;
            }
        }
    }
    
    // Choose action using epsilon-greedy policy
    chooseAction(state) {
        if (Math.random() < this.epsilon) {
            // Explore: random action
            return this.actions[Math.floor(Math.random() * this.actions.length)];
        } else {
            // Exploit: best action
            return this.getBestAction(state);
        }
    }
    
    // Get best action for a state
    getBestAction(state) {
        const qValues = this.qTable[state];
        const maxQ = Math.max(...Object.values(qValues));
        const bestActions = Object.keys(qValues).filter(action => qValues[action] === maxQ);
        return bestActions[Math.floor(Math.random() * bestActions.length)];
    }
    
    // Update Q-value using Bellman equation
    updateQValue(state, action, reward, nextState) {
        const currentQ = this.qTable[state][action];
        const maxNextQ = Math.max(...Object.values(this.qTable[nextState]));
        const newQ = currentQ + this.learningRate * (
            reward + this.discountFactor * maxNextQ - currentQ
        );
        this.qTable[state][action] = newQ;
    }
    
    // Get Q-table
    getQTable() {
        return this.qTable;
    }
}

// Simple Grid World Environment
class GridWorld {
    constructor(size = 4) {
        this.size = size;
        this.state = 0; // Start at position 0
        this.goal = size * size - 1; // Goal at last position
    }
    
    reset() {
        this.state = 0;
        return this.state;
    }
    
    step(action) {
        const actions = {
            'up': -this.size,
            'down': this.size,
            'left': -1,
            'right': 1
        };
        
        const newState = this.state + actions[action];
        
        // Check boundaries
        if (newState < 0 || newState >= this.size * this.size) {
            return { state: this.state, reward: -1, done: false };
        }
        
        // Check if goal reached
        if (newState === this.goal) {
            this.state = newState;
            return { state: this.state, reward: 100, done: true };
        }
        
        this.state = newState;
        return { state: this.state, reward: -1, done: false };
    }
    
    getState() {
        return this.state;
    }
}

// Example usage
console.log('=== Reinforcement Learning (Q-Learning) ===\n');

const states = Array.from({ length: 16 }, (_, i) => i); // 4x4 grid
const actions = ['up', 'down', 'left', 'right'];

const qLearning = new QLearning(states, actions, 0.1, 0.9, 0.1);
const env = new GridWorld(4);

// Training
console.log('Training Q-Learning agent...');
for (let episode = 0; episode < 100; episode++) {
    let state = env.reset();
    let done = false;
    let steps = 0;
    
    while (!done && steps < 100) {
        const action = qLearning.chooseAction(state);
        const { state: nextState, reward, done: isDone } = env.step(action);
        qLearning.updateQValue(state, action, reward, nextState);
        state = nextState;
        done = isDone;
        steps++;
    }
}

// Test
console.log('\nTesting trained agent:');
let state = env.reset();
let done = false;
const path = [state];

while (!done && path.length < 20) {
    const action = qLearning.getBestAction(state);
    const { state: nextState, reward, done: isDone } = env.step(action);
    state = nextState;
    done = isDone;
    path.push(state);
}

console.log('Path to goal:', path);
console.log('Goal reached:', done);

module.exports = { QLearning, GridWorld };

