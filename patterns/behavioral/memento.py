"""
Memento Pattern - Python

Captures and externalizes an object's internal state so it can be restored
later, without violating encapsulation.

Use cases:
- Undo/Redo functionality
- Save/Load game states
- Transaction rollback
- State snapshots
"""

from datetime import datetime


# Memento
class Memento:
    def __init__(self, state):
        self.state = state
        self.date = datetime.now()
    
    def get_state(self):
        return self.state
    
    def get_date(self):
        return self.date


# Originator
class Editor:
    def __init__(self):
        self.content = ""
    
    def set_content(self, content):
        self.content = content
    
    def get_content(self):
        return self.content
    
    def save(self):
        return Memento(self.content)
    
    def restore(self, memento):
        self.content = memento.get_state()


# Caretaker
class History:
    def __init__(self):
        self.mementos = []
    
    def push(self, memento):
        self.mementos.append(memento)
    
    def pop(self):
        if self.mementos:
            return self.mementos.pop()
        return None
    
    def get_history(self):
        return [
            {
                'index': i,
                'date': m.get_date(),
                'preview': m.get_state()[:20] + '...'
            }
            for i, m in enumerate(self.mementos)
        ]


# Example usage
if __name__ == "__main__":
    print("=== Memento Pattern ===\n")
    
    editor = Editor()
    history = History()
    
    editor.set_content('First version')
    history.push(editor.save())
    print("Content:", editor.get_content())
    
    editor.set_content('Second version')
    history.push(editor.save())
    print("Content:", editor.get_content())
    
    editor.set_content('Third version')
    history.push(editor.save())
    print("Content:", editor.get_content())
    
    print("\nHistory:")
    for h in history.get_history():
        print(f"  {h['index']}: {h['preview']} ({h['date'].strftime('%H:%M:%S')})")
    
    print("\nUndo:")
    memento = history.pop()
    if memento:
        editor.restore(memento)
        print("Content:", editor.get_content())

