/**
 * Memento Pattern - JavaScript
 * 
 * Captures and externalizes an object's internal state so it can be restored
 * later, without violating encapsulation.
 * 
 * Use cases:
 * - Undo/Redo functionality
 * - Save/Load game states
 * - Transaction rollback
 * - State snapshots
 */

// Memento
class Memento {
    constructor(state) {
        this.state = state;
        this.date = new Date();
    }
    
    getState() {
        return this.state;
    }
    
    getDate() {
        return this.date;
    }
}

// Originator
class Editor {
    constructor() {
        this.content = '';
    }
    
    setContent(content) {
        this.content = content;
    }
    
    getContent() {
        return this.content;
    }
    
    save() {
        return new Memento(this.content);
    }
    
    restore(memento) {
        this.content = memento.getState();
    }
}

// Caretaker
class History {
    constructor() {
        this.mementos = [];
    }
    
    push(memento) {
        this.mementos.push(memento);
    }
    
    pop() {
        return this.mementos.pop();
    }
    
    getHistory() {
        return this.mementos.map((m, i) => ({
            index: i,
            date: m.getDate(),
            preview: m.getState().substring(0, 20) + '...'
        }));
    }
}

// Example usage
console.log('=== Memento Pattern ===\n');

const editor = new Editor();
const history = new History();

editor.setContent('First version');
history.push(editor.save());
console.log('Content:', editor.getContent());

editor.setContent('Second version');
history.push(editor.save());
console.log('Content:', editor.getContent());

editor.setContent('Third version');
history.push(editor.save());
console.log('Content:', editor.getContent());

console.log('\nHistory:');
history.getHistory().forEach(h => {
    console.log(`  ${h.index}: ${h.preview} (${h.date.toLocaleTimeString()})`);
});

console.log('\nUndo:');
const memento = history.pop();
if (memento) {
    editor.restore(memento);
    console.log('Content:', editor.getContent());
}

module.exports = { Memento, Editor, History };

