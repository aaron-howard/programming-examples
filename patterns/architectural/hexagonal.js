/**
 * Hexagonal Architecture (Ports & Adapters) Pattern - JavaScript
 * 
 * Separates core business logic from external concerns:
 * - Ports: Interfaces for external interactions
 * - Adapters: Implementations of ports
 * - Core: Business logic (independent of external frameworks)
 */

// Core Domain (Business Logic)
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    isValid() {
        return this.name && this.email && this.email.includes('@');
    }
}

// Port (Interface)
class UserRepositoryPort {
    save(user) {
        throw new Error('Method must be implemented');
    }
    
    findById(id) {
        throw new Error('Method must be implemented');
    }
}

// Port (Interface)
class EmailServicePort {
    send(email, message) {
        throw new Error('Method must be implemented');
    }
}

// Adapter (In-Memory Implementation)
class InMemoryUserRepository extends UserRepositoryPort {
    constructor() {
        super();
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

// Adapter (Console Email Service)
class ConsoleEmailService extends EmailServicePort {
    send(email, message) {
        console.log(`Email to ${email}: ${message}`);
    }
}

// Application Service (Use Case)
class CreateUserUseCase {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    execute(name, email) {
        const user = new User(Date.now(), name, email);
        
        if (!user.isValid()) {
            throw new Error('Invalid user data');
        }
        
        const savedUser = this.userRepository.save(user);
        this.emailService.send(email, `Welcome ${name}!`);
        
        return savedUser;
    }
}

// Example usage
console.log('=== Hexagonal Architecture Pattern ===\n');

const userRepository = new InMemoryUserRepository();
const emailService = new ConsoleEmailService();
const createUserUseCase = new CreateUserUseCase(userRepository, emailService);

const user = createUserUseCase.execute('John Doe', 'john@example.com');
console.log('Created user:', user);

module.exports = { User, UserRepositoryPort, EmailServicePort, InMemoryUserRepository, ConsoleEmailService, CreateUserUseCase };

