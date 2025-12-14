"""
Given-When-Then Pattern - Python

BDD (Behavior-Driven Development) test structure:
- Given: Initial context/preconditions
- When: Action/event that triggers behavior
- Then: Expected outcome/assertion
"""


# Example: Shopping Cart
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item):
        self.items.append(item)
    
    def get_total(self):
        return sum(item['price'] for item in self.items)
    
    def get_item_count(self):
        return len(self.items)


# BDD-style test using pytest-bdd or similar
def test_add_item_to_empty_cart():
    # Given: an empty shopping cart
    cart = ShoppingCart()
    
    # When: I add an item costing $10
    cart.add_item({'name': 'Product', 'price': 10})
    
    # Then: the cart total should be $10
    assert cart.get_total() == 10


def test_add_multiple_items():
    # Given: a shopping cart with one item
    cart = ShoppingCart()
    cart.add_item({'name': 'Product 1', 'price': 15})
    
    # When: I add another item costing $20
    cart.add_item({'name': 'Product 2', 'price': 20})
    
    # Then: the cart should have 2 items and total $35
    assert cart.get_item_count() == 2
    assert cart.get_total() == 35


# Example usage
if __name__ == "__main__":
    print("=== Given-When-Then Pattern ===\n")
    
    test_add_item_to_empty_cart()
    print("✓ Given an empty shopping cart, when I add an item costing $10, then the cart total should be $10")
    
    test_add_multiple_items()
    print("✓ Given a shopping cart with one item, when I add another item costing $20, then the cart should have 2 items and total $35")

