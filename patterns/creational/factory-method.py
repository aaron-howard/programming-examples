"""
Factory Method Pattern - Python

Provides an interface for creating objects, but lets subclasses decide
which class to instantiate. Defers instantiation to subclasses.

Use cases:
- When you don't know the exact types of objects your code will work with
- When you want to provide users of your library/framework a way to extend its components
"""

from abc import ABC, abstractmethod


# Product interface
class Vehicle(ABC):
    @abstractmethod
    def drive(self):
        pass


# Concrete products
class Car(Vehicle):
    def drive(self):
        return "Driving a car"


class Truck(Vehicle):
    def drive(self):
        return "Driving a truck"


class Motorcycle(Vehicle):
    def drive(self):
        return "Riding a motorcycle"


# Creator (Factory)
class VehicleFactory(ABC):
    @abstractmethod
    def create_vehicle(self):
        pass


# Concrete creators
class CarFactory(VehicleFactory):
    def create_vehicle(self):
        return Car()


class TruckFactory(VehicleFactory):
    def create_vehicle(self):
        return Truck()


class MotorcycleFactory(VehicleFactory):
    def create_vehicle(self):
        return Motorcycle()


# Alternative: Simple factory function
def create_vehicle(vehicle_type):
    vehicles = {
        'car': Car,
        'truck': Truck,
        'motorcycle': Motorcycle
    }
    
    vehicle_class = vehicles.get(vehicle_type.lower())
    if not vehicle_class:
        raise ValueError(f"Unknown vehicle type: {vehicle_type}")
    
    return vehicle_class()


# Example usage
if __name__ == "__main__":
    print("=== Factory Method Pattern ===\n")
    
    # Using factory classes
    car_factory = CarFactory()
    car = car_factory.create_vehicle()
    print(car.drive())
    
    truck_factory = TruckFactory()
    truck = truck_factory.create_vehicle()
    print(truck.drive())
    
    # Using simple factory function
    motorcycle = create_vehicle('motorcycle')
    print(motorcycle.drive())

