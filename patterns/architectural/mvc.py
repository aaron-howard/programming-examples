"""
MVC (Model-View-Controller) Pattern - Python

Separates application into three interconnected components:
- Model: Data and business logic
- View: User interface
- Controller: Handles user input and updates model/view
"""


# Model
class UserModel:
    def __init__(self):
        self.users = []
        self.observers = []
    
    def add_user(self, user):
        self.users.append(user)
        self.notify()
    
    def get_users(self):
        return self.users
    
    def attach(self, observer):
        self.observers.append(observer)
    
    def notify(self):
        for observer in self.observers:
            observer.update(self.users)


# View
class UserView:
    def display_users(self, users):
        print("\n=== User List ===")
        for index, user in enumerate(users, 1):
            print(f"{index}. {user['name']} ({user['email']})")


# Controller
class UserController:
    def __init__(self, model, view):
        self.model = model
        self.view = view
        self.model.attach(self.view)
    
    def add_user(self, name, email):
        self.model.add_user({'name': name, 'email': email})
    
    def show_users(self):
        self.view.display_users(self.model.get_users())


# Example usage
if __name__ == "__main__":
    print("=== MVC Pattern ===\n")
    
    model = UserModel()
    view = UserView()
    controller = UserController(model, view)
    
    controller.add_user('John Doe', 'john@example.com')
    controller.add_user('Jane Smith', 'jane@example.com')
    controller.show_users()

