/**
 * MVC (Model-View-Controller) Pattern - JavaScript
 * 
 * Separates application into three interconnected components:
 * - Model: Data and business logic
 * - View: User interface
 * - Controller: Handles user input and updates model/view
 */

// Model
class UserModel {
    constructor() {
        this.users = [];
        this.observers = [];
    }
    
    addUser(user) {
        this.users.push(user);
        this.notify();
    }
    
    getUsers() {
        return this.users;
    }
    
    attach(observer) {
        this.observers.push(observer);
    }
    
    notify() {
        this.observers.forEach(observer => observer.update(this.users));
    }
}

// View
class UserView {
    displayUsers(users) {
        console.log('\n=== User List ===');
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email})`);
        });
    }
}

// Controller
class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.attach(this.view);
    }
    
    addUser(name, email) {
        this.model.addUser({ name, email });
    }
    
    showUsers() {
        this.view.displayUsers(this.model.getUsers());
    }
}

// Example usage
console.log('=== MVC Pattern ===\n');

const model = new UserModel();
const view = new UserView();
const controller = new UserController(model, view);

controller.addUser('John Doe', 'john@example.com');
controller.addUser('Jane Smith', 'jane@example.com');
controller.showUsers();

module.exports = { UserModel, UserView, UserController };

