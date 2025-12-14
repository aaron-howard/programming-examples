/**
 * Facade Pattern - JavaScript
 * 
 * Provides a simplified interface to a complex subsystem.
 * Hides the complexity of the subsystem behind a simple interface.
 * 
 * Use cases:
 * - Simplifying complex APIs
 * - Creating a unified interface for multiple subsystems
 * - Reducing dependencies between clients and subsystems
 */

// Complex subsystem classes
class CPU {
    freeze() {
        return 'CPU: Freezing...';
    }
    
    jump(position) {
        return `CPU: Jumping to position ${position}`;
    }
    
    execute() {
        return 'CPU: Executing...';
    }
}

class Memory {
    load(position, data) {
        return `Memory: Loading data "${data}" at position ${position}`;
    }
}

class HardDrive {
    read(lba, size) {
        return `HardDrive: Reading ${size} bytes from LBA ${lba}`;
    }
}

// Facade
class ComputerFacade {
    constructor() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }
    
    start() {
        const steps = [];
        steps.push(this.cpu.freeze());
        steps.push(this.memory.load(0, 'BOOT_SECTOR'));
        steps.push(this.cpu.jump(0));
        steps.push(this.cpu.execute());
        return steps;
    }
    
    shutdown() {
        return 'Computer: Shutting down...';
    }
}

// Example usage
console.log('=== Facade Pattern ===\n');

const computer = new ComputerFacade();

console.log('Starting computer:');
const bootSteps = computer.start();
bootSteps.forEach(step => console.log(step));

console.log('\nShutting down:');
console.log(computer.shutdown());

module.exports = { ComputerFacade, CPU, Memory, HardDrive };

