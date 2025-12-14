# Design Patterns Collection

A comprehensive collection of design patterns implemented in both JavaScript and Python. This repository contains 47 different patterns organized by category.

## 📚 Table of Contents

- [Creational Patterns](#creational-patterns)
- [Structural Patterns](#structural-patterns)
- [Behavioral Patterns](#behavioral-patterns)
- [Architectural Patterns](#architectural-patterns)
- [Concurrency Patterns](#concurrency-patterns)
- [Distributed Systems Patterns](#distributed-systems-patterns)
- [Testing Patterns](#testing-patterns)
- [Integration Patterns](#integration-patterns)

---

## 🎨 Creational Patterns

How objects are created.

### 1. **Singleton** (`creational/singleton.js` / `creational/singleton.py`)
- **Description**: Ensures a class has only one instance
- **Use Cases**: Database connections, logger instances, configuration managers
- **Files**: `singleton.js`, `singleton.py`

### 2. **Factory Method** (`creational/factory-method.js` / `creational/factory-method.py`)
- **Description**: Subclasses decide which object to create
- **Use Cases**: Framework extensibility, plugin systems
- **Files**: `factory-method.js`, `factory-method.py`

### 3. **Abstract Factory** (`creational/abstract-factory.js` / `creational/abstract-factory.py`)
- **Description**: Create families of related objects
- **Use Cases**: Cross-platform UI libraries, theme systems
- **Files**: `abstract-factory.js`, `abstract-factory.py`

### 4. **Builder** (`creational/builder.js` / `creational/builder.py`)
- **Description**: Step-by-step object construction
- **Use Cases**: Complex object creation, query builders
- **Files**: `builder.js`, `builder.py`

### 5. **Prototype** (`creational/prototype.js` / `creational/prototype.py`)
- **Description**: Clone existing objects
- **Use Cases**: Expensive object creation, object copying
- **Files**: `prototype.js`, `prototype.py`

---

## 🧩 Structural Patterns

How objects are composed.

### 6. **Adapter** (`structural/adapter.js` / `structural/adapter.py`)
- **Description**: Make incompatible interfaces work together
- **Use Cases**: Third-party library integration, legacy code
- **Files**: `adapter.js`, `adapter.py`

### 7. **Bridge** (`structural/bridge.js` / `structural/bridge.py`)
- **Description**: Separate abstraction from implementation
- **Use Cases**: Platform-independent code, driver systems
- **Files**: `bridge.js`, `bridge.py`

### 8. **Composite** (`structural/composite.js` / `structural/composite.py`)
- **Description**: Treat groups of objects like individuals
- **Use Cases**: File systems, UI components, tree structures
- **Files**: `composite.js`, `composite.py`

### 9. **Decorator** (`structural/decorator.js` / `structural/decorator.py`)
- **Description**: Add behavior dynamically
- **Use Cases**: Middleware, feature toggles, logging
- **Files**: `decorator.js`, `decorator.py`

### 10. **Facade** (`structural/facade.js` / `structural/facade.py`)
- **Description**: Simplified interface to a complex system
- **Use Cases**: API simplification, library wrappers
- **Files**: `facade.js`, `facade.py`

### 11. **Flyweight** (`structural/flyweight.js` / `structural/flyweight.py`)
- **Description**: Share common data to save memory
- **Use Cases**: Text editors, game engines, large datasets
- **Files**: `flyweight.js`, `flyweight.py`

### 12. **Proxy** (`structural/proxy.js` / `structural/proxy.py`)
- **Description**: Placeholder controlling access to another object
- **Use Cases**: Lazy loading, access control, caching
- **Files**: `proxy.js`, `proxy.py`

---

## 🔁 Behavioral Patterns

How objects interact.

### 13. **Strategy** (`behavioral/strategy.js` / `behavioral/strategy.py`)
- **Description**: Swap algorithms at runtime
- **Use Cases**: Payment processing, sorting algorithms
- **Files**: `strategy.js`, `strategy.py`

### 14. **Observer** (`behavioral/observer.js` / `behavioral/observer.py`)
- **Description**: Notify dependents of changes
- **Use Cases**: Event systems, MVC architectures
- **Files**: `observer.js`, `observer.py`

### 15. **Command** (`behavioral/command.js` / `behavioral/command.py`)
- **Description**: Encapsulate actions as objects
- **Use Cases**: Undo/redo, queuing, logging
- **Files**: `command.js`, `command.py`

### 16. **Chain of Responsibility** (`behavioral/chain-of-responsibility.js` / `behavioral/chain-of-responsibility.py`)
- **Description**: Pass requests along a chain
- **Use Cases**: Middleware, validation chains, event handling
- **Files**: `chain-of-responsibility.js`, `chain-of-responsibility.py`

### 17. **State** (`behavioral/state.js` / `behavioral/state.py`)
- **Description**: Change behavior when internal state changes
- **Use Cases**: State machines, workflow systems
- **Files**: `state.js`, `state.py`

### 18. **Template Method** (`behavioral/template-method.js` / `behavioral/template-method.py`)
- **Description**: Define algorithm skeleton
- **Use Cases**: Framework design, code reuse
- **Files**: `template-method.js`, `template-method.py`

### 19. **Iterator** (`behavioral/iterator.js` / `behavioral/iterator.py`)
- **Description**: Traverse collections
- **Use Cases**: Collection traversal, custom data structures
- **Files**: `iterator.js`, `iterator.py`

### 20. **Mediator** (`behavioral/mediator.js` / `behavioral/mediator.py`)
- **Description**: Centralize communication
- **Use Cases**: Chat systems, UI component communication
- **Files**: `mediator.js`, `mediator.py`

### 21. **Memento** (`behavioral/memento.js` / `behavioral/memento.py`)
- **Description**: Capture and restore object state
- **Use Cases**: Undo/redo, save/load, snapshots
- **Files**: `memento.js`, `memento.py`

### 22. **Visitor** (`behavioral/visitor.js` / `behavioral/visitor.py`)
- **Description**: Add operations without modifying classes
- **Use Cases**: Compiler design, AST traversal
- **Files**: `visitor.js`, `visitor.py`

---

## 🏛️ Architectural Patterns

High-level system structure.

### 23. **MVC** (`architectural/mvc.js` / `architectural/mvc.py`)
- **Description**: Model-View-Controller separation
- **Use Cases**: Web applications, desktop applications
- **Files**: `mvc.js`, `mvc.py`

### 24. **MVVM** (`architectural/mvvm.js` / `architectural/mvvm.py`)
- **Description**: Model-View-ViewModel with data binding
- **Use Cases**: Modern web frameworks, desktop applications
- **Files**: `mvvm.js`, `mvvm.py`

### 25. **Clean Architecture** (`architectural/clean-architecture.js` / `architectural/clean-architecture.py`)
- **Description**: Layered architecture with dependency inversion
- **Use Cases**: Enterprise applications, maintainable codebases
- **Files**: `clean-architecture.js`, `clean-architecture.py`

### 26. **Layered Architecture** (`architectural/layered-architecture.js` / `architectural/layered-architecture.py`)
- **Description**: Horizontal layers (Presentation, Business, Data)
- **Use Cases**: Traditional enterprise applications
- **Files**: `layered-architecture.js`, `layered-architecture.py`

### 27. **Microservices** (`architectural/microservices.js` / `architectural/microservices.py`)
- **Description**: Small, independent services
- **Use Cases**: Scalable distributed systems
- **Files**: `microservices.js`, `microservices.py`

### 28. **Event-Driven Architecture** (`architectural/event-driven.js` / `architectural/event-driven.py`)
- **Description**: Components communicate through events
- **Use Cases**: Reactive systems, real-time applications
- **Files**: `event-driven.js`, `event-driven.py`

### 29. **Hexagonal Architecture** (`architectural/hexagonal.js` / `architectural/hexagonal.py`)
- **Description**: Ports and Adapters pattern
- **Use Cases**: Testable, framework-independent applications
- **Files**: `hexagonal.js`, `hexagonal.py`

---

## ⚙️ Concurrency Patterns

Managing concurrent operations.

### 30. **Producer-Consumer** (`concurrency/producer-consumer.js` / `concurrency/producer-consumer.py`)
- **Description**: Coordinate producers and consumers with a queue
- **Use Cases**: Task queues, data processing pipelines
- **Files**: `producer-consumer.js`, `producer-consumer.py`

### 31. **Thread Pool** (`concurrency/thread-pool.js` / `concurrency/thread-pool.py`)
- **Description**: Pool of worker threads for task execution
- **Use Cases**: Server applications, parallel processing
- **Files**: `thread-pool.js`, `thread-pool.py`

### 32. **Future/Promise** (`concurrency/future-promise.js` / `concurrency/future-promise.py`)
- **Description**: Represent asynchronous operations
- **Use Cases**: Async programming, non-blocking I/O
- **Files**: `future-promise.js`, `future-promise.py`

### 33. **Read-Write Lock** (`concurrency/read-write-lock.js` / `concurrency/read-write-lock.py`)
- **Description**: Multiple readers or single writer
- **Use Cases**: Read-heavy workloads, shared resources
- **Files**: `read-write-lock.js`, `read-write-lock.py`

### 34. **Active Object** (`concurrency/active-object.js` / `concurrency/active-object.py`)
- **Description**: Decouple method invocation from execution
- **Use Cases**: Actor systems, message passing
- **Files**: `active-object.js`, `active-object.py`

---

## 🌐 Distributed Systems Patterns

Patterns for distributed systems.

### 35. **Circuit Breaker** (`distributed/circuit-breaker.js` / `distributed/circuit-breaker.py`)
- **Description**: Prevent cascading failures
- **Use Cases**: Microservices, external API calls
- **Files**: `circuit-breaker.js`, `circuit-breaker.py`

### 36. **Retry** (`distributed/retry.js` / `distributed/retry.py`)
- **Description**: Automatically retry failed operations
- **Use Cases**: Network operations, transient failures
- **Files**: `retry.js`, `retry.py`

### 37. **Bulkhead** (`distributed/bulkhead.js` / `distributed/bulkhead.py`)
- **Description**: Isolate resources to prevent failures
- **Use Cases**: Resource isolation, fault tolerance
- **Files**: `bulkhead.js`, `bulkhead.py`

### 38. **Saga** (`distributed/saga.js` / `distributed/saga.py`)
- **Description**: Manage distributed transactions
- **Use Cases**: Microservices transactions, long-running processes
- **Files**: `saga.js`, `saga.py`

### 39. **Leader Election** (`distributed/leader-election.js` / `distributed/leader-election.py`)
- **Description**: Elect a single leader in a cluster
- **Use Cases**: Distributed coordination, master-slave systems
- **Files**: `leader-election.js`, `leader-election.py`

### 40. **Sharding** (`distributed/sharding.js` / `distributed/sharding.py`)
- **Description**: Partition data across multiple databases
- **Use Cases**: Scalable databases, distributed storage
- **Files**: `sharding.js`, `sharding.py`

---

## 🧪 Testing Patterns

Patterns for testing.

### 41. **Arrange-Act-Assert** (`testing/arrange-act-assert.js` / `testing/arrange-act-assert.py`)
- **Description**: Three-phase test structure
- **Use Cases**: Unit testing, test organization
- **Files**: `arrange-act-assert.js`, `arrange-act-assert.py`

### 42. **Test Doubles** (`testing/test-doubles.js` / `testing/test-doubles.py`)
- **Description**: Mocks, stubs, and fakes
- **Use Cases**: Isolated testing, dependency replacement
- **Files**: `test-doubles.js`, `test-doubles.py`

### 43. **Given-When-Then** (`testing/given-when-then.js` / `testing/given-when-then.py`)
- **Description**: BDD test structure
- **Use Cases**: Behavior-driven development, acceptance testing
- **Files**: `given-when-then.js`, `given-when-then.py`

---

## 📦 Integration Patterns

Enterprise integration patterns.

### 44. **Message Queue** (`integration/message-queue.js` / `integration/message-queue.py`)
- **Description**: Asynchronous message processing
- **Use Cases**: Task queues, event processing
- **Files**: `message-queue.js`, `message-queue.py`

### 45. **Publish-Subscribe** (`integration/publish-subscribe.js` / `integration/publish-subscribe.py`)
- **Description**: Topic-based messaging
- **Use Cases**: Event systems, notifications
- **Files**: `publish-subscribe.js`, `publish-subscribe.py`

### 46. **Aggregator** (`integration/aggregator.js` / `integration/aggregator.py`)
- **Description**: Combine multiple messages
- **Use Cases**: Batch processing, reducing overhead
- **Files**: `aggregator.js`, `aggregator.py`

### 47. **Message Router** (`integration/message-router.js` / `integration/message-router.py`)
- **Description**: Route messages to handlers
- **Use Cases**: Message routing, workflow systems
- **Files**: `message-router.js`, `message-router.py`

---

## Usage

### JavaScript

```javascript
const { Singleton } = require('./patterns/creational/singleton');
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
```

### Python

```python
from patterns.creational.singleton import Singleton

instance1 = Singleton()
instance2 = Singleton()
print(instance1 is instance2)  # True
```

---

## Pattern Categories Summary

| Category | Count | Patterns |
|----------|-------|----------|
| Creational | 5 | Singleton, Factory Method, Abstract Factory, Builder, Prototype |
| Structural | 7 | Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy |
| Behavioral | 10 | Strategy, Observer, Command, Chain of Responsibility, State, Template Method, Iterator, Mediator, Memento, Visitor |
| Architectural | 7 | MVC, MVVM, Clean Architecture, Layered Architecture, Microservices, Event-Driven, Hexagonal |
| Concurrency | 5 | Producer-Consumer, Thread Pool, Future/Promise, Read-Write Lock, Active Object |
| Distributed Systems | 6 | Circuit Breaker, Retry, Bulkhead, Saga, Leader Election, Sharding |
| Testing | 3 | Arrange-Act-Assert, Test Doubles, Given-When-Then |
| Integration | 4 | Message Queue, Publish-Subscribe, Aggregator, Message Router |
| **Total** | **47** | |

---

## Notes

- All patterns include both JavaScript and Python implementations
- Each pattern includes example usage and comments
- Patterns are organized by category in separate directories
- Examples demonstrate real-world use cases
- Code follows best practices and design principles

---

**Total Patterns**: 47  
**Languages**: JavaScript & Python  
**Status**: ✅ All patterns implemented

