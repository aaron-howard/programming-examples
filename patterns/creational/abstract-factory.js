/**
 * Abstract Factory Pattern - JavaScript
 * 
 * Provides an interface for creating families of related or dependent objects
 * without specifying their concrete classes.
 * 
 * Use cases:
 * - When you need to create families of related products
 * - When you want to provide a library of products and reveal only their interfaces
 */

// Abstract products
class Button {
    render() {
        throw new Error('Method must be implemented');
    }
}

class Dialog {
    render() {
        throw new Error('Method must be implemented');
    }
}

// Concrete products for Windows
class WindowsButton extends Button {
    render() {
        return 'Rendering Windows button';
    }
}

class WindowsDialog extends Dialog {
    render() {
        return 'Rendering Windows dialog';
    }
}

// Concrete products for Mac
class MacButton extends Button {
    render() {
        return 'Rendering Mac button';
    }
}

class MacDialog extends Dialog {
    render() {
        return 'Rendering Mac dialog';
    }
}

// Abstract factory
class UIFactory {
    createButton() {
        throw new Error('Method must be implemented');
    }
    
    createDialog() {
        throw new Error('Method must be implemented');
    }
}

// Concrete factories
class WindowsUIFactory extends UIFactory {
    createButton() {
        return new WindowsButton();
    }
    
    createDialog() {
        return new WindowsDialog();
    }
}

class MacUIFactory extends UIFactory {
    createButton() {
        return new MacButton();
    }
    
    createDialog() {
        return new MacDialog();
    }
}

// Client code
class Application {
    constructor(factory) {
        this.factory = factory;
        this.button = null;
        this.dialog = null;
    }
    
    createUI() {
        this.button = this.factory.createButton();
        this.dialog = this.factory.createDialog();
    }
    
    render() {
        console.log(this.button.render());
        console.log(this.dialog.render());
    }
}

// Example usage
console.log('=== Abstract Factory Pattern ===\n');

// Windows UI
const windowsFactory = new WindowsUIFactory();
const windowsApp = new Application(windowsFactory);
windowsApp.createUI();
console.log('Windows UI:');
windowsApp.render();

console.log();

// Mac UI
const macFactory = new MacUIFactory();
const macApp = new Application(macFactory);
macApp.createUI();
console.log('Mac UI:');
macApp.render();

module.exports = { UIFactory, WindowsUIFactory, MacUIFactory, Application };

