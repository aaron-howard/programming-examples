/**
 * Layered Architecture Pattern - JavaScript
 * 
 * Organizes code into horizontal layers, each with specific responsibilities:
 * - Presentation Layer: UI
 * - Business Layer: Business logic
 * - Data Access Layer: Database operations
 */

// Data Access Layer
class UserDAO {
    constructor() {
        this.users = [];
    }
    
    save(user) {
        this.users.push(user);
        return user;
    }
    
    findById(id) {
        return this.users.find(u => u.id === id);
    }
    
    findAll() {
        return this.users;
    }
}

// Business Layer
class UserService {
    constructor(userDAO) {
        this.userDAO = userDAO;
    }
    
    createUser(name, email) {
        // Business logic
        if (!this.isValidEmail(email)) {
            throw new Error('Invalid email');
        }
        
        const user = {
            id: Date.now(),
            name,
            email,
            createdAt: new Date()
        };
        
        return this.userDAO.save(user);
    }
    
    getUser(id) {
        return this.userDAO.findById(id);
    }
    
    getAllUsers() {
        return this.userDAO.findAll();
    }
    
    isValidEmail(email) {
        return email.includes('@');
    }
}

// Presentation Layer
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    
    createUser(req) {
        try {
            const user = this.userService.createUser(req.name, req.email);
            return { status: 200, data: user };
        } catch (error) {
            return { status: 400, error: error.message };
        }
    }
    
    getUser(id) {
        const user = this.userService.getUser(id);
        return user ? { status: 200, data: user } : { status: 404, error: 'User not found' };
    }
}

// Example usage
console.log('=== Layered Architecture Pattern ===\n');

const dao = new UserDAO();
const service = new UserService(dao);
const controller = new UserController(service);

const result = controller.createUser({ name: 'John Doe', email: 'john@example.com' });
console.log('Create user:', result);

const user = controller.getUser(result.data.id);
console.log('Get user:', user);

module.exports = { UserDAO, UserService, UserController };

