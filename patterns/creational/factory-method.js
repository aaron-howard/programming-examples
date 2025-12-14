/**
 * Factory Method Pattern - JavaScript
 * 
 * Provides an interface for creating objects, but lets subclasses decide
 * which class to instantiate. Defers instantiation to subclasses.
 * 
 * Use cases:
 * - When you don't know the exact types of objects your code will work with
 * - When you want to provide users of your library/framework a way to extend its components
 */

// Product interface
class Vehicle {
    drive() {
        throw new Error('Method must be implemented');
    }
}

// Concrete products
class Car extends Vehicle {
    drive() {
        return 'Driving a car';
    }
}

class Truck extends Vehicle {
    drive() {
        return 'Driving a truck';
    }
}

class Motorcycle extends Vehicle {
    drive() {
        return 'Riding a motorcycle';
    }
}

// Creator (Factory)
class VehicleFactory {
    createVehicle(type) {
        throw new Error('Method must be implemented');
    }
}

// Concrete creators
class CarFactory extends VehicleFactory {
    createVehicle() {
        return new Car();
    }
}

class TruckFactory extends VehicleFactory {
    createVehicle() {
        return new Truck();
    }
}

class MotorcycleFactory extends VehicleFactory {
    createVehicle() {
        return new Motorcycle();
    }
}

// Alternative: Simple factory function
function createVehicle(type) {
    const vehicles = {
        car: () => new Car(),
        truck: () => new Truck(),
        motorcycle: () => new Motorcycle()
    };
    
    const creator = vehicles[type.toLowerCase()];
    if (!creator) {
        throw new Error(`Unknown vehicle type: ${type}`);
    }
    
    return creator();
}

// Example usage
console.log('=== Factory Method Pattern ===\n');

// Using factory classes
const carFactory = new CarFactory();
const car = carFactory.createVehicle();
console.log(car.drive());

const truckFactory = new TruckFactory();
const truck = truckFactory.createVehicle();
console.log(truck.drive());

// Using simple factory function
const motorcycle = createVehicle('motorcycle');
console.log(motorcycle.drive());

module.exports = { VehicleFactory, CarFactory, TruckFactory, MotorcycleFactory, createVehicle };

