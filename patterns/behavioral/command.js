/**
 * Command Pattern - JavaScript
 * 
 * Encapsulates a request as an object, allowing you to parameterize clients
 * with different requests, queue operations, and support undo operations.
 * 
 * Use cases:
 * - Undo/Redo functionality
 * - Queuing requests
 * - Logging requests
 * - Remote procedure calls
 */

// Command interface
class Command {
    execute() {
        throw new Error('Method must be implemented');
    }
    
    undo() {
        throw new Error('Method must be implemented');
    }
}

// Receiver
class Light {
    constructor() {
        this.isOn = false;
    }
    
    turnOn() {
        this.isOn = true;
        return 'Light is ON';
    }
    
    turnOff() {
        this.isOn = false;
        return 'Light is OFF';
    }
}

// Concrete commands
class TurnOnCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }
    
    execute() {
        return this.light.turnOn();
    }
    
    undo() {
        return this.light.turnOff();
    }
}

class TurnOffCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }
    
    execute() {
        return this.light.turnOff();
    }
    
    undo() {
        return this.light.turnOn();
    }
}

// Invoker
class RemoteControl {
    constructor() {
        this.commands = [];
        this.history = [];
    }
    
    executeCommand(command) {
        const result = command.execute();
        this.history.push(command);
        return result;
    }
    
    undo() {
        if (this.history.length > 0) {
            const command = this.history.pop();
            return command.undo();
        }
        return 'Nothing to undo';
    }
}

// Example usage
console.log('=== Command Pattern ===\n');

const light = new Light();
const turnOn = new TurnOnCommand(light);
const turnOff = new TurnOffCommand(light);

const remote = new RemoteControl();

console.log(remote.executeCommand(turnOn));
console.log(remote.executeCommand(turnOff));
console.log('Undo:', remote.undo());
console.log('Undo:', remote.undo());

module.exports = { Command, Light, TurnOnCommand, TurnOffCommand, RemoteControl };

