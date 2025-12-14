"""
Frontend Frameworks - Python

Examples of React, Vue, and Svelte patterns:
- Component-based architecture
- State management
- Event handling
"""

from typing import Dict, List, Callable, Any


# React-like Component Pattern
class ReactComponent:
    def __init__(self, props: Dict = None):
        self.props = props or {}
        self.state = {}
    
    def set_state(self, new_state: Dict):
        self.state = {**self.state, **new_state}
        self.render()
    
    def render(self):
        raise NotImplementedError("Render method must be implemented")


class Counter(ReactComponent):
    def __init__(self, props: Dict = None):
        super().__init__(props)
        self.state = {'count': 0}
    
    def increment(self):
        self.set_state({'count': self.state['count'] + 1})
    
    def render(self):
        return {
            'type': 'div',
            'children': [
                {'type': 'h1', 'text': f"Count: {self.state['count']}"},
                {'type': 'button', 'text': 'Increment', 'onClick': self.increment}
            ]
        }


# Vue-like Component Pattern
class VueComponent:
    def __init__(self, options: Dict = None):
        options = options or {}
        self.data = options.get('data', lambda: {})()
        self.methods = options.get('methods', {})
        self.template = options.get('template', '')
    
    def set(self, key: str, value: Any):
        self.data[key] = value
        self.update()
    
    def update(self):
        print("Component updated:", self.data)


def create_todo_list():
    todos = []
    new_todo = ''
    
    def add_todo():
        nonlocal new_todo, todos
        if new_todo.strip():
            todos.append({
                'id': int(__import__('time').time()),
                'text': new_todo,
                'completed': False
            })
            new_todo = ''
    
    def toggle_todo(todo_id: int):
        todo = next((t for t in todos if t['id'] == todo_id), None)
        if todo:
            todo['completed'] = not todo['completed']
    
    return {
        'data': {'todos': todos, 'new_todo': new_todo},
        'methods': {'add_todo': add_todo, 'toggle_todo': toggle_todo}
    }


# Svelte-like Reactive Pattern
class SvelteStore:
    def __init__(self, value: Any):
        self.value = value
        self.subscribers: List[Callable] = []
    
    def set(self, new_value: Any):
        self.value = new_value
        for sub in self.subscribers:
            sub(self.value)
    
    def update(self, fn: Callable):
        self.set(fn(self.value))
    
    def subscribe(self, fn: Callable):
        self.subscribers.append(fn)
        fn(self.value)
        return lambda: self.subscribers.remove(fn)


# Example usage
if __name__ == "__main__":
    print("=== Frontend Frameworks ===\n")
    
    # React-like
    print("React-like Component:")
    counter = Counter()
    print("Initial render:", counter.render())
    counter.increment()
    print("After increment:", counter.render())
    
    # Vue-like
    print("\nVue-like Component:")
    todo_list = create_todo_list()
    todo_list['data']['new_todo'] = 'Learn Python'
    todo_list['methods']['add_todo']()
    todo_list['data']['new_todo'] = 'Learn Vue'
    todo_list['methods']['add_todo']()
    print("Todos:", todo_list['data']['todos'])
    
    # Svelte-like
    print("\nSvelte-like Store:")
    count = SvelteStore(0)
    count.subscribe(lambda value: print(f"Count changed to: {value}"))
    count.set(5)
    count.update(lambda n: n + 1)

