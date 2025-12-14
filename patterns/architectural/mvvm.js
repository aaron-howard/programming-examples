/**
 * MVVM (Model-View-ViewModel) Pattern - JavaScript
 * 
 * Separates presentation logic from view:
 * - Model: Data and business logic
 * - View: User interface
 * - ViewModel: Presentation logic, data binding
 */

// Model
class ProductModel {
    constructor() {
        this.products = [];
    }
    
    addProduct(product) {
        this.products.push(product);
    }
    
    getProducts() {
        return this.products;
    }
}

// ViewModel
class ProductViewModel {
    constructor(model) {
        this.model = model;
        this.observers = [];
    }
    
    addProduct(name, price) {
        this.model.addProduct({ name, price });
        this.notify();
    }
    
    getProducts() {
        return this.model.getProducts().map(p => ({
            ...p,
            displayPrice: `$${p.price.toFixed(2)}`,
            formatted: `${p.name} - $${p.price.toFixed(2)}`
        }));
    }
    
    attach(observer) {
        this.observers.push(observer);
    }
    
    notify() {
        this.observers.forEach(observer => observer.update(this.getProducts()));
    }
}

// View
class ProductView {
    displayProducts(products) {
        console.log('\n=== Products ===');
        products.forEach(product => {
            console.log(product.formatted);
        });
    }
}

// Example usage
console.log('=== MVVM Pattern ===\n');

const model = new ProductModel();
const viewModel = new ProductViewModel(model);
const view = new ProductView();

viewModel.attach(view);

viewModel.addProduct('Laptop', 999.99);
viewModel.addProduct('Mouse', 29.99);
viewModel.addProduct('Keyboard', 79.99);

module.exports = { ProductModel, ProductViewModel, ProductView };

