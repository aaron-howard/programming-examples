"""
Builder Pattern - Python

Constructs complex objects step by step. Allows you to produce different types
and representations of an object using the same construction code.

Use cases:
- When construction of an object is complex
- When you want to construct objects step by step
- When you need different representations of the same object
"""


class Pizza:
    def __init__(self):
        self.size = None
        self.crust = None
        self.cheese = None
        self.pepperoni = False
        self.bacon = False
        self.mushrooms = False
        self.onions = False
    
    def describe(self):
        toppings = []
        if self.pepperoni:
            toppings.append('pepperoni')
        if self.bacon:
            toppings.append('bacon')
        if self.mushrooms:
            toppings.append('mushrooms')
        if self.onions:
            toppings.append('onions')
        
        result = f"Pizza: {self.size} size, {self.crust} crust, {self.cheese} cheese"
        if toppings:
            result += f", toppings: {', '.join(toppings)}"
        return result


class PizzaBuilder:
    def __init__(self):
        self.pizza = Pizza()
    
    def set_size(self, size):
        self.pizza.size = size
        return self
    
    def set_crust(self, crust):
        self.pizza.crust = crust
        return self
    
    def set_cheese(self, cheese):
        self.pizza.cheese = cheese
        return self
    
    def add_pepperoni(self):
        self.pizza.pepperoni = True
        return self
    
    def add_bacon(self):
        self.pizza.bacon = True
        return self
    
    def add_mushrooms(self):
        self.pizza.mushrooms = True
        return self
    
    def add_onions(self):
        self.pizza.onions = True
        return self
    
    def build(self):
        return self.pizza


# Director (optional) - provides common build configurations
class PizzaDirector:
    @staticmethod
    def build_margherita():
        return (PizzaBuilder()
                .set_size('Large')
                .set_crust('Thin')
                .set_cheese('Mozzarella')
                .build())
    
    @staticmethod
    def build_meat_lovers():
        return (PizzaBuilder()
                .set_size('Extra Large')
                .set_crust('Thick')
                .set_cheese('Cheddar')
                .add_pepperoni()
                .add_bacon()
                .build())


# Example usage
if __name__ == "__main__":
    print("=== Builder Pattern ===\n")
    
    # Custom pizza
    custom_pizza = (PizzaBuilder()
                    .set_size('Medium')
                    .set_crust('Thin')
                    .set_cheese('Mozzarella')
                    .add_pepperoni()
                    .add_mushrooms()
                    .add_onions()
                    .build())
    
    print("Custom Pizza:")
    print(custom_pizza.describe())
    
    print()
    
    # Using director for predefined pizzas
    margherita = PizzaDirector.build_margherita()
    print("Margherita:")
    print(margherita.describe())
    
    print()
    
    meat_lovers = PizzaDirector.build_meat_lovers()
    print("Meat Lovers:")
    print(meat_lovers.describe())

