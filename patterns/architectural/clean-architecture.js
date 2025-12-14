/**
 * Clean Architecture Pattern - JavaScript
 * 
 * Separates software into layers with clear dependencies:
 * - Entities: Business objects
 * - Use Cases: Application-specific business rules
 * - Interface Adapters: Controllers, presenters, gateways
 * - Frameworks & Drivers: External tools and frameworks
 */

// Entities (Domain Layer)
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// Use Cases (Application Layer)
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    
    execute(name, email) {
        if (!name || !email) {
            throw new Error('Name and email are required');
        }
        
        const user = new User(Date.now(), name, email);
        return this.userRepository.save(user);
    }
}

// Interface Adapters (Interface Layer)
class UserRepository {
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
}

class UserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    
    createUser(request) {
        try {
            const user = this.createUserUseCase.execute(request.name, request.email);
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Example usage
console.log('=== Clean Architecture Pattern ===\n');

const repository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(repository);
const controller = new UserController(createUserUseCase);

const result = controller.createUser({
    name: 'John Doe',
    email: 'john@example.com'
});

console.log('Result:', result);

module.exports = { User, CreateUserUseCase, UserRepository, UserController };

