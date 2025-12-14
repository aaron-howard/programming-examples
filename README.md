# Programming fundamental examples in JavaScript and Python

A comprehensive collection of programming examples, algorithms, patterns, and concepts in JavaScript and Python.

## 📁 Repository Structure

```
funstuff/
├── algorithm/              # Sorting algorithms (27 algorithms)
├── patterns/               # Design patterns (47 patterns)
├── paradigms/              # Programming paradigms
├── algorithms-examples/    # Algorithm examples (search, graph, DP, greedy)
├── architecture-examples/  # Software architecture examples
├── programming-techniques/ # Programming techniques
├── web-development/        # Web development examples
├── ai-ml/                  # AI & Machine Learning examples
├── game-development/       # Game development concepts
└── devops-infrastructure/  # DevOps & Infrastructure examples
```

## 🎯 Sections

### 1. Algorithm (`algorithm/`)
**27 Sorting Algorithms** in JavaScript and Python:
- Comparison-based: Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, Tree, Cycle, Cocktail Shaker, Comb, Gnome, Odd-Even
- Non-comparison: Counting, Radix, Bucket, Pigeonhole, Flash
- Specialized: Bitonic, Odd-Even Merge, Sleep, Bead, Spaghetti
- Hybrid: Intro Sort, Tim Sort, Block Sort

### 2. Patterns (`patterns/`)
**47 Design Patterns** organized by category:
- **Creational** (5): Singleton, Factory Method, Abstract Factory, Builder, Prototype
- **Structural** (7): Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **Behavioral** (10): Strategy, Observer, Command, Chain of Responsibility, State, Template Method, Iterator, Mediator, Memento, Visitor
- **Architectural** (7): MVC, MVVM, Clean Architecture, Layered, Microservices, Event-Driven, Hexagonal
- **Concurrency** (5): Producer-Consumer, Thread Pool, Future/Promise, Read-Write Lock, Active Object
- **Distributed Systems** (6): Circuit Breaker, Retry, Bulkhead, Saga, Leader Election, Sharding
- **Testing** (3): Arrange-Act-Assert, Test Doubles, Given-When-Then
- **Integration** (4): Message Queue, Publish-Subscribe, Aggregator, Message Router

### 3. Programming Paradigms (`paradigms/`)
- **Object-Oriented Programming**: Classes, inheritance, polymorphism, encapsulation
- **Functional Programming**: Pure functions, immutability, higher-order functions
- **Procedural Programming**: Step-by-step instructions
- **Event-Driven Programming**: Event emitters, UI events, server events
- **Logic Programming**: Rule-based systems, Prolog-style logic

### 4. Algorithm Examples (`algorithms-examples/`)
- **Search Algorithms**: Binary search, BFS, DFS, linear search, interpolation search
- **Graph Algorithms**: Dijkstra's, A*, Kruskal's (MST)
- **Dynamic Programming**: Memoization, tabulation, LCS, coin change, knapsack, edit distance
- **Greedy Algorithms**: Activity selection, fractional knapsack, job sequencing

### 5. Software Architecture Examples (`architecture-examples/`)
- **Monolithic Architecture**: Single unified application
- **Microservices**: Independent services (see `patterns/architectural/microservices.js`)
- **Event-Driven Architecture**: Event-based communication (see `patterns/architectural/event-driven.js`)
- **Serverless Architecture**: Function-as-a-Service
- **Layered Architecture**: Horizontal layers (see `patterns/architectural/layered-architecture.js`)

### 6. Programming Techniques (`programming-techniques/`)
- **Recursion**: Factorial, Fibonacci, tree traversal, Tower of Hanoi
- **Asynchronous Programming**: Callbacks, promises, async/await, parallel execution
- **Dependency Injection**: Loose coupling, inversion of control
- **Caching Strategies**: LRU cache, memoization, cache invalidation
- **Error Handling Patterns**: Try-catch, error boundaries, retry logic

### 7. Web Development (`web-development/`)
- **REST APIs**: HTTP methods, endpoints, status codes
- **GraphQL**: Queries, mutations, subscriptions
- **Frontend Frameworks**: React, Vue, Svelte examples
- **Backend Frameworks**: Express.js, Django, Laravel examples
- **Authentication**: OAuth, JWT, session management

### 8. AI & Machine Learning (`ai-ml/`)
- **Neural Networks**: Perceptron, backpropagation, deep learning
- **Reinforcement Learning**: Q-learning, policy gradients
- **Natural Language Processing**: Tokenization, sentiment analysis
- **Computer Vision**: Image processing, object detection
- **Model Optimization**: Hyperparameter tuning, pruning

### 9. Game Development (`game-development/`)
- **Game Loops**: Update-render cycles, frame timing
- **Physics Engines**: Collision detection, gravity simulation
- **Entity-Component Systems**: Game object composition
- **Pathfinding**: A* algorithm, navigation meshes
- **Rendering Pipelines**: 2D/3D rendering, shaders

### 10. DevOps & Infrastructure (`devops-infrastructure/`)
- **CI/CD Pipelines**: Automated testing and deployment
- **Containerization**: Docker, Kubernetes examples
- **Infrastructure as Code**: Terraform, CloudFormation
- **Monitoring & Logging**: Metrics, alerts, log aggregation
- **Cloud Architectures**: AWS, Azure, GCP patterns

## 🚀 Usage

### Running Examples

**JavaScript:**
```bash
node algorithm/bubble-sort.js
node patterns/creational/singleton.js
node paradigms/functional.js
```

**Python:**
```bash
python algorithm/bubble-sort.py
python patterns/creational/singleton.py
python paradigms/functional.py
```

### Runner (list + run)

You can also use the repo runner to list examples and run them by path or index.

```bash
python run.py list --lang py --limit 20
python run.py list --contains authentication

python run.py run algorithm/bubble-sort.py
python run.py run web-development/authentication.js
python run.py run 1
python run.py run authentication --lang js
```

## 🧹 Linting & Formatting

Repo-wide lint/format tooling is included for both Python and JavaScript.

**Python (Ruff):**
```bash
python -m pip install -r requirements-dev.txt
ruff format .
ruff check .
```

**JavaScript (Prettier + ESLint):**
```bash
npm install
npm run format:js
npm run lint:js
```

**Run both:**
```bash
npm run format
npm run lint
```

### Git hooks (pre-commit + pre-push)

This repo includes optional Git hooks to auto-format/lint on commit and run check-only validation on push.

```bash
python -m pip install -r requirements-dev.txt
npm install

pre-commit install
pre-commit install --hook-type pre-push

# optional: run across the whole repo
pre-commit run --all-files
```

## 📊 Statistics

- **Total Files**: 200+ examples
- **Languages**: JavaScript & Python
- **Sorting Algorithms**: 27
- **Design Patterns**: 47
- **Programming Paradigms**: 5
- **Algorithm Examples**: 4 categories
- **Architecture Examples**: 5 types
- **Programming Techniques**: 5 techniques
- **Web Development**: 5 topics
- **AI/ML**: 5 topics
- **Game Development**: 5 concepts
- **DevOps**: 5 topics

## 📝 Notes

- All examples include both JavaScript and Python implementations
- Each example is self-contained and can be run independently
- Code follows best practices and includes comments
- Examples demonstrate real-world use cases

## 🤝 Contributing

Feel free to add more examples, improve existing code, or suggest new categories!

---

**Status**: ✅ Comprehensive collection of programming examples, algorithms, and patterns

