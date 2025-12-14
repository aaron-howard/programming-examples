"""
Test Doubles Pattern - Python

Replace dependencies with test doubles (mocks, stubs, fakes):
- Mock: Records interactions and verifies behavior
- Stub: Returns predefined responses
- Fake: Working implementation with shortcuts
"""

from unittest.mock import Mock, MagicMock
import asyncio


# System under test
class PaymentService:
    def __init__(self, payment_gateway):
        self.payment_gateway = payment_gateway
    
    async def process_payment(self, amount, card_number):
        if amount <= 0:
            raise ValueError("Invalid amount")
        
        result = await self.payment_gateway.charge(card_number, amount)
        return result


# Mock
class MockPaymentGateway:
    def __init__(self):
        self.calls = []
        self.should_succeed = True
    
    async def charge(self, card_number, amount):
        self.calls.append({'card_number': card_number, 'amount': amount})
        
        if self.should_succeed:
            return {'success': True, 'transaction_id': '12345'}
        else:
            raise Exception("Payment failed")
    
    def get_calls(self):
        return self.calls
    
    def set_should_succeed(self, value):
        self.should_succeed = value


# Stub
class StubPaymentGateway:
    async def charge(self, card_number, amount):
        # Always returns success
        return {'success': True, 'transaction_id': 'stub-123'}


# Fake
class FakePaymentGateway:
    def __init__(self):
        self.transactions = []
    
    async def charge(self, card_number, amount):
        # Fake implementation - stores in memory instead of real payment
        import time
        transaction = {
            'id': str(int(time.time())),
            'card_number': card_number[-4:],
            'amount': amount,
            'status': 'completed'
        }
        self.transactions.append(transaction)
        return {'success': True, 'transaction_id': transaction['id']}
    
    def get_transactions(self):
        return self.transactions


# Example usage
if __name__ == "__main__":
    async def main():
        print("=== Test Doubles Pattern ===\n")
        
        # Using Mock
        mock_gateway = MockPaymentGateway()
        payment_service1 = PaymentService(mock_gateway)
        
        await payment_service1.process_payment(100, '1234567890123456')
        print("Mock calls:", mock_gateway.get_calls())
        
        # Using Stub
        stub_gateway = StubPaymentGateway()
        payment_service2 = PaymentService(stub_gateway)
        result = await payment_service2.process_payment(50, '1234567890123456')
        print("Stub result:", result)
        
        # Using Fake
        fake_gateway = FakePaymentGateway()
        payment_service3 = PaymentService(fake_gateway)
        await payment_service3.process_payment(75, '1234567890123456')
        print("Fake transactions:", fake_gateway.get_transactions())
    
    asyncio.run(main())

