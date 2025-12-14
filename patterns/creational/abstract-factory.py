"""
Abstract Factory Pattern - Python

Provides an interface for creating families of related or dependent objects
without specifying their concrete classes.

Use cases:
- When you need to create families of related products
- When you want to provide a library of products and reveal only their interfaces
"""

from abc import ABC, abstractmethod


# Abstract products
class Button(ABC):
    @abstractmethod
    def render(self):
        pass


class Dialog(ABC):
    @abstractmethod
    def render(self):
        pass


# Concrete products for Windows
class WindowsButton(Button):
    def render(self):
        return "Rendering Windows button"


class WindowsDialog(Dialog):
    def render(self):
        return "Rendering Windows dialog"


# Concrete products for Mac
class MacButton(Button):
    def render(self):
        return "Rendering Mac button"


class MacDialog(Dialog):
    def render(self):
        return "Rendering Mac dialog"


# Abstract factory
class UIFactory(ABC):
    @abstractmethod
    def create_button(self):
        pass
    
    @abstractmethod
    def create_dialog(self):
        pass


# Concrete factories
class WindowsUIFactory(UIFactory):
    def create_button(self):
        return WindowsButton()
    
    def create_dialog(self):
        return WindowsDialog()


class MacUIFactory(UIFactory):
    def create_button(self):
        return MacButton()
    
    def create_dialog(self):
        return MacDialog()


# Client code
class Application:
    def __init__(self, factory):
        self.factory = factory
        self.button = None
        self.dialog = None
    
    def create_ui(self):
        self.button = self.factory.create_button()
        self.dialog = self.factory.create_dialog()
    
    def render(self):
        print(self.button.render())
        print(self.dialog.render())


# Example usage
if __name__ == "__main__":
    print("=== Abstract Factory Pattern ===\n")
    
    # Windows UI
    windows_factory = WindowsUIFactory()
    windows_app = Application(windows_factory)
    windows_app.create_ui()
    print("Windows UI:")
    windows_app.render()
    
    print()
    
    # Mac UI
    mac_factory = MacUIFactory()
    mac_app = Application(mac_factory)
    mac_app.create_ui()
    print("Mac UI:")
    mac_app.render()

