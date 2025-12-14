"""
Strategy Pattern - Python

Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
Lets the algorithm vary independently from clients that use it.

Use cases:
- When you have multiple ways to perform a task
- When you want to avoid conditional statements for algorithm selection
- Runtime algorithm selection
"""

from abc import ABC, abstractmethod


# Strategy interface
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount):
        pass


# Concrete strategies
class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number, cvv):
        self.card_number = card_number
        self.cvv = cvv
    
    def pay(self, amount):
        return f"Paid ${amount} using Credit Card ending in {self.card_number[-4:]}"


class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email
    
    def pay(self, amount):
        return f"Paid ${amount} using PayPal account {self.email}"


class BitcoinPayment(PaymentStrategy):
    def __init__(self, wallet_address):
        self.wallet_address = wallet_address
    
    def pay(self, amount):
        return f"Paid ${amount} using Bitcoin wallet {self.wallet_address[:8]}..."


# Context
class PaymentProcessor:
    def __init__(self, strategy):
        self.strategy = strategy
    
    def set_strategy(self, strategy):
        self.strategy = strategy
    
    def process_payment(self, amount):
        return self.strategy.pay(amount)


# Example usage
if __name__ == "__main__":
    print("=== Strategy Pattern ===\n")
    
    processor = PaymentProcessor(CreditCardPayment('1234567890123456', '123'))
    print(processor.process_payment(100))
    
    processor.set_strategy(PayPalPayment('user@example.com'))
    print(processor.process_payment(50))
    
    processor.set_strategy(BitcoinPayment('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'))
    print(processor.process_payment(200))

