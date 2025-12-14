"""
Proxy Pattern - Python

Provides a placeholder or surrogate for another object to control access to it.
Acts as an intermediary between client and the real object.

Use cases:
- Lazy loading
- Access control
- Logging
- Caching
- Remote proxies
"""

from abc import ABC, abstractmethod


# Subject interface
class Image(ABC):
    @abstractmethod
    def display(self):
        pass


# Real subject
class RealImage(Image):
    def __init__(self, filename):
        self.filename = filename
        self.load_from_disk()
    
    def load_from_disk(self):
        print(f"Loading {self.filename} from disk...")
    
    def display(self):
        return f"Displaying {self.filename}"


# Proxy
class ProxyImage(Image):
    def __init__(self, filename):
        self.filename = filename
        self.real_image = None
    
    def display(self):
        if not self.real_image:
            self.real_image = RealImage(self.filename)
        return self.real_image.display()


# Another example: Protection Proxy
class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        return f"Withdrew ${amount}. New balance: ${self.balance}"
    
    def get_balance(self):
        return self.balance


class BankAccountProxy:
    def __init__(self, account, user):
        self.account = account
        self.user = user
    
    def withdraw(self, amount):
        if self.user != 'admin':
            if amount > 1000:
                raise ValueError("Non-admin users cannot withdraw more than $1000")
        return self.account.withdraw(amount)
    
    def get_balance(self):
        return self.account.get_balance()


# Example usage
if __name__ == "__main__":
    print("=== Proxy Pattern ===\n")
    
    # Virtual Proxy (Lazy Loading)
    print("Virtual Proxy (Lazy Loading):")
    image1 = ProxyImage('photo1.jpg')
    image2 = ProxyImage('photo2.jpg')
    
    # Image not loaded yet
    print("Image created, but not loaded")
    
    # Now load and display
    print(image1.display())
    print(image2.display())
    
    print("\nProtection Proxy:")
    account = BankAccount(5000)
    user_proxy = BankAccountProxy(account, 'user')
    admin_proxy = BankAccountProxy(account, 'admin')
    
    print("User balance:", user_proxy.get_balance())
    print(user_proxy.withdraw(500))
    try:
        print(user_proxy.withdraw(2000))  # Should fail
    except ValueError as e:
        print("Error:", e)
    
    print("Admin can withdraw any amount:")
    print(admin_proxy.withdraw(2000))

