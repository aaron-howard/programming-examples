/**
 * Mediator Pattern - JavaScript
 * 
 * Defines how a set of objects interact. Promotes loose coupling by keeping
 * objects from referring to each other explicitly, and lets you vary their
 * interaction independently.
 * 
 * Use cases:
 * - Chat systems
 * - Air traffic control
 * - UI component communication
 * - Event buses
 */

// Mediator interface
class Mediator {
    notify(sender, event) {
        throw new Error('Method must be implemented');
    }
}

// Concrete mediator
class ChatMediator extends Mediator {
    constructor() {
        super();
        this.users = [];
    }
    
    addUser(user) {
        this.users.push(user);
    }
    
    notify(sender, event) {
        this.users.forEach(user => {
            if (user !== sender) {
                user.receive(event);
            }
        });
    }
}

// Colleague interface
class User {
    constructor(name, mediator) {
        this.name = name;
        this.mediator = mediator;
    }
    
    send(message) {
        console.log(`${this.name} sends: ${message}`);
        this.mediator.notify(this, { from: this.name, message });
    }
    
    receive(event) {
        console.log(`${this.name} receives from ${event.from}: ${event.message}`);
    }
}

// Example usage
console.log('=== Mediator Pattern ===\n');

const chatMediator = new ChatMediator();

const user1 = new User('Alice', chatMediator);
const user2 = new User('Bob', chatMediator);
const user3 = new User('Charlie', chatMediator);

chatMediator.addUser(user1);
chatMediator.addUser(user2);
chatMediator.addUser(user3);

user1.send('Hello everyone!');
console.log();
user2.send('Hi Alice!');
console.log();
user3.send('Hey guys!');

module.exports = { Mediator, ChatMediator, User };

