/**
 * State Pattern - JavaScript
 * 
 * Allows an object to alter its behavior when its internal state changes.
 * The object will appear to change its class.
 * 
 * Use cases:
 * - Object behavior depends on its state
 * - Operations have large conditional statements based on state
 * - State transitions are complex
 */

// State interface
class State {
    handle(context) {
        throw new Error('Method must be implemented');
    }
}

// Concrete states
class IdleState extends State {
    handle(context) {
        console.log('Player is idle');
        context.setState(new WalkingState());
    }
}

class WalkingState extends State {
    handle(context) {
        console.log('Player is walking');
        context.setState(new RunningState());
    }
}

class RunningState extends State {
    handle(context) {
        console.log('Player is running');
        context.setState(new IdleState());
    }
}

// Context
class Player {
    constructor() {
        this.state = new IdleState();
    }
    
    setState(state) {
        this.state = state;
    }
    
    action() {
        this.state.handle(this);
    }
}

// Example usage
console.log('=== State Pattern ===\n');

const player = new Player();

player.action(); // Idle -> Walking
player.action(); // Walking -> Running
player.action(); // Running -> Idle
player.action(); // Idle -> Walking

module.exports = { State, IdleState, WalkingState, RunningState, Player };

