/**
 * Frontend Frameworks - JavaScript
 * 
 * Examples of React, Vue, and Svelte patterns:
 * - Component-based architecture
 * - State management
 * - Event handling
 */

// React-like Component Pattern
class ReactComponent {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
    
    render() {
        throw new Error('Render method must be implemented');
    }
}

class Counter extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    
    increment() {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        return {
            type: 'div',
            children: [
                { type: 'h1', text: `Count: ${this.state.count}` },
                { type: 'button', text: 'Increment', onClick: () => this.increment() }
            ]
        };
    }
}

// Vue-like Component Pattern
class VueComponent {
    constructor(options = {}) {
        this.data = options.data ? options.data() : {};
        this.methods = options.methods || {};
        this.template = options.template || '';
    }
    
    $set(key, value) {
        this.data[key] = value;
        this.update();
    }
    
    update() {
        console.log('Component updated:', this.data);
    }
}

const TodoList = new VueComponent({
    data() {
        return {
            todos: [],
            newTodo: ''
        };
    },
    methods: {
        addTodo() {
            if (this.data.newTodo.trim()) {
                this.data.todos.push({
                    id: Date.now(),
                    text: this.data.newTodo,
                    completed: false
                });
                this.$set('newTodo', '');
            }
        },
        toggleTodo(id) {
            const todo = this.data.todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                this.update();
            }
        }
    },
    template: '<div>Todo List Component</div>'
});

// Svelte-like Reactive Pattern
class SvelteStore {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }
    
    set(newValue) {
        this.value = newValue;
        this.subscribers.forEach(sub => sub(this.value));
    }
    
    update(fn) {
        this.set(fn(this.value));
    }
    
    subscribe(fn) {
        this.subscribers.push(fn);
        fn(this.value);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn);
        };
    }
}

// Example usage
console.log('=== Frontend Frameworks ===\n');

// React-like
console.log('React-like Component:');
const counter = new Counter();
console.log('Initial render:', counter.render());
counter.increment();
console.log('After increment:', counter.render());

// Vue-like
console.log('\nVue-like Component:');
TodoList.methods.addTodo.call(TodoList);
TodoList.$set('newTodo', 'Learn Vue');
TodoList.methods.addTodo.call(TodoList);
console.log('Todos:', TodoList.data.todos);

// Svelte-like
console.log('\nSvelte-like Store:');
const count = new SvelteStore(0);
count.subscribe(value => console.log(`Count changed to: ${value}`));
count.set(5);
count.update(n => n + 1);

module.exports = { ReactComponent, Counter, VueComponent, SvelteStore };

