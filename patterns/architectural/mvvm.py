"""
MVVM (Model-View-ViewModel) Pattern - Python

Separates presentation logic from view:
- Model: Data and business logic
- View: User interface
- ViewModel: Presentation logic, data binding
"""


# Model
class ProductModel:
    def __init__(self):
        self.products = []
    
    def add_product(self, product):
        self.products.append(product)
    
    def get_products(self):
        return self.products


# ViewModel
class ProductViewModel:
    def __init__(self, model):
        self.model = model
        self.observers = []
    
    def add_product(self, name, price):
        self.model.add_product({'name': name, 'price': price})
        self.notify()
    
    def get_products(self):
        return [
            {
                **p,
                'display_price': f"${p['price']:.2f}",
                'formatted': f"{p['name']} - ${p['price']:.2f}"
            }
            for p in self.model.get_products()
        ]
    
    def attach(self, observer):
        self.observers.append(observer)
    
    def notify(self):
        for observer in self.observers:
            observer.update(self.get_products())


# View
class ProductView:
    def display_products(self, products):
        print("\n=== Products ===")
        for product in products:
            print(product['formatted'])


# Example usage
if __name__ == "__main__":
    print("=== MVVM Pattern ===\n")
    
    model = ProductModel()
    view_model = ProductViewModel(model)
    view = ProductView()
    
    view_model.attach(view)
    
    view_model.add_product('Laptop', 999.99)
    view_model.add_product('Mouse', 29.99)
    view_model.add_product('Keyboard', 79.99)

