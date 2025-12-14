"""
Procedural Programming - Python

Programming paradigm based on step-by-step instructions and procedures/functions.
"""


# Procedures/Functions that perform specific tasks
def calculate_area(length, width):
    return length * width


def calculate_perimeter(length, width):
    return 2 * (length + width)


def display_rectangle_info(length, width):
    area = calculate_area(length, width)
    perimeter = calculate_perimeter(length, width)
    print(f"Rectangle: {length}x{width}")
    print(f"Area: {area}")
    print(f"Perimeter: {perimeter}")


# Step-by-step algorithm
def find_maximum(numbers):
    max_val = numbers[0]
    for i in range(1, len(numbers)):
        if numbers[i] > max_val:
            max_val = numbers[i]
    return max_val


def find_minimum(numbers):
    min_val = numbers[0]
    for i in range(1, len(numbers)):
        if numbers[i] < min_val:
            min_val = numbers[i]
    return min_val


def calculate_average(numbers):
    sum_val = 0
    for i in range(len(numbers)):
        sum_val += numbers[i]
    return sum_val / len(numbers)


# Sequential processing
def process_student_grades(students):
    results = []
    
    for student in students:
        average = calculate_average(student['grades'])
        
        if average >= 90:
            status = 'Excellent'
        elif average >= 70:
            status = 'Good'
        elif average >= 50:
            status = 'Pass'
        else:
            status = 'Fail'
        
        results.append({
            'name': student['name'],
            'average': round(average, 2),
            'status': status
        })
    
    return results


# Data structures (lists, dictionaries)
def create_inventory():
    return []


def add_item(inventory, item, quantity):
    inventory.append({'item': item, 'quantity': quantity})


def remove_item(inventory, item_name):
    for i in range(len(inventory)):
        if inventory[i]['item'] == item_name:
            inventory.pop(i)
            return True
    return False


def get_total_items(inventory):
    total = 0
    for item in inventory:
        total += item['quantity']
    return total


# Example usage
if __name__ == "__main__":
    print("=== Procedural Programming ===\n")
    
    # Rectangle calculations
    print("Rectangle Calculations:")
    display_rectangle_info(5, 10)
    
    # Number processing
    print("\nNumber Processing:")
    numbers = [23, 45, 12, 67, 34, 89, 56]
    print("Numbers:", numbers)
    print("Maximum:", find_maximum(numbers))
    print("Minimum:", find_minimum(numbers))
    print("Average:", round(calculate_average(numbers), 2))
    
    # Student processing
    print("\nStudent Grade Processing:")
    students = [
        {'name': 'Alice', 'grades': [85, 90, 92, 88]},
        {'name': 'Bob', 'grades': [75, 80, 78, 82]},
        {'name': 'Charlie', 'grades': [45, 50, 48, 52]},
        {'name': 'Diana', 'grades': [95, 98, 97, 96]}
    ]
    
    results = process_student_grades(students)
    for result in results:
        print(f"{result['name']}: {result['average']} - {result['status']}")
    
    # Inventory management
    print("\nInventory Management:")
    inventory = create_inventory()
    add_item(inventory, 'Apples', 50)
    add_item(inventory, 'Bananas', 30)
    add_item(inventory, 'Oranges', 25)
    print("Inventory:", inventory)
    print("Total items:", get_total_items(inventory))
    remove_item(inventory, 'Bananas')
    print("After removing Bananas:", inventory)
    print("Total items:", get_total_items(inventory))

