"""
Adapter Pattern - Python

Allows objects with incompatible interfaces to collaborate.
Acts as a bridge between two incompatible interfaces.

Use cases:
- Integrating third-party libraries
- Legacy code integration
- Interface compatibility
"""

from abc import ABC, abstractmethod


# Target interface (what client expects)
class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass


# Adaptee (existing incompatible interface)
class LegacyPaymentSystem:
    def make_payment(self, dollars, cents):
        return f"Legacy payment: ${dollars}.{cents:02d}"


# Adapter
class LegacyPaymentAdapter(PaymentProcessor):
    def __init__(self, legacy_system):
        self.legacy_system = legacy_system
    
    def process_payment(self, amount):
        # Convert amount to dollars and cents
        dollars = int(amount)
        cents = int((amount - dollars) * 100)
        return self.legacy_system.make_payment(dollars, cents)


# Another adaptee
class ThirdPartyPaymentAPI:
    def pay(self, amount_in_cents):
        return f"Third-party payment: {amount_in_cents} cents"


# Another adapter
class ThirdPartyPaymentAdapter(PaymentProcessor):
    def __init__(self, third_party_api):
        self.api = third_party_api
    
    def process_payment(self, amount):
        amount_in_cents = int(amount * 100)
        return self.api.pay(amount_in_cents)


# Client code
class PaymentService:
    def __init__(self, processor):
        self.processor = processor
    
    def handle_payment(self, amount):
        return self.processor.process_payment(amount)


# Example usage
if __name__ == "__main__":
    print("=== Adapter Pattern ===\n")
    
    legacy_system = LegacyPaymentSystem()
    legacy_adapter = LegacyPaymentAdapter(legacy_system)
    payment_service1 = PaymentService(legacy_adapter)
    print(payment_service1.handle_payment(99.99))
    
    third_party_api = ThirdPartyPaymentAPI()
    third_party_adapter = ThirdPartyPaymentAdapter(third_party_api)
    payment_service2 = PaymentService(third_party_adapter)
    print(payment_service2.handle_payment(99.99))

