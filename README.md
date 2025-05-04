# JavaScript-Interview-Question
This is for practicing java interview question and revision

mplement the compose() and pipe() polyfill
🔸 Promises (Polyfill for Promise.all, Promise.race, Promise.allSettled)
🔸 Implement the map, filter, reduce, and forEach polyfills
🔸 Implement the Function.bind, call, and apply methods on the Function prototype
🔸 Implement Async.parallel and Async.series for executing async tasks
🔸 Build a Promise from scratch
🔸 Implement a Retry API
🔸 Implement Memoization
🔸 Currying (with examples)
🔸 String.prototype.repeat
🔸 Design patterns (Singleton, Factory patterns, Builder etc.)
🔸 Implement the Publisher-Subscriber pattern in JavaScript
🔸 Prototype and prototype inheritance
🔸 How rendering works in the browser
🔸 Event delegation and event propagation in JavaScript
🔸 Progressive Web Applications (PWAs)
🔸 Clone an object
🔸 Debouncing and Throttling
🔸 Implement clearAllTimeout()
🔸 How does "this" work in different scenarios?
🔸 What is the difference between synchronous and asynchronous code?
🔸 Explain the concept of "truthy" and "falsy" values.
🔸 What are template literals in ES6?
🔸 How do you handle errors in JavaScript?
🔸 Implement a function to flatten a nested array
🔸 Implement an LRU Cache
🔸 What are closures in JavaScript?
🔸 Explain the event loop in JavaScript.
🔸 What is the difference between 'var', 'let', and 'const'?
🔸 How does hoisting work in JavaScript?
🔸 What is the purpose of 'setTimeout' and 'setInterval'?
🔸 Explain how to use the Fetch API.
🔸 What is a service worker in the context of PWAs?
🔸 Describe how to implement deep cloning of an object.
🔸 What are modules in JavaScript? How do you use them?
🔸 Explain the concept of `this` binding with examples.
🔸 What is a closure? Provide an example.
🔸 How do you prevent default behavior of an event?
🔸 What are arrow functions, and how do they differ from regular functions?
🔸 Explain the concept of promises chaining.
🔸 What is the purpose of 'Object.create()'?
🔸 How can you check if an object is an array?
🔸 What are IIFE (Immediately Invoked Function Expressions)?
🔸 Explain how to create a custom event in JavaScript.
🔸 What is JSON, and how do you parse it?
🔸 Describe how to implement a simple event emitter.
🔸 What are weak references in JavaScript?
🔸 How do you optimize performance in large-scale applications?
🔸 Explain how to use localStorage and sessionStorage.
🔸 What are some common security issues in JavaScript applications?
explain each question with its purpose and if possible give code also 




Below, I’ll provide detailed explanations and implementations for each requested topic, focusing on their purpose and practical use in JavaScript. Each section will include a brief description of why the concept is important, followed by a code example where applicable. Due to the extensive list, I’ll keep each explanation concise yet comprehensive, with code snippets to illustrate the implementation. For topics that are more conceptual (e.g., "How rendering works in the browser"), I’ll focus on explanation with minimal or no code.

1. Implement compose() and pipe() Polyfill
Purpose: compose and pipe are functional programming utilities for combining multiple functions. compose applies functions from right to left, while pipe applies them from left to right. They enhance code modularity and readability by enabling function chaining.

Code:

javascript

Copy
// Compose: f(g(h(x))) - right to left
function compose(...fns) {
  return function (x) {
    return fns.reduceRight((result, fn) => fn(result), x);
  };
}

// Pipe: h(g(f(x))) - left to right
function pipe(...fns) {
  return function (x) {
    return fns.reduce((result, fn) => fn(result), x);
  };
}

// Example usage
const add = x => x + 1;
const multiply = x => x * 2;
const subtract = x => x - 3;

const composed = compose(subtract, multiply, add); // (x + 1) * 2 - 3
const piped = pipe(add, multiply, subtract); // ((x + 1) * 2) - 3

console.log(composed(5)); // (5 + 1) * 2 - 3 = 9
console.log(piped(5)); // (5 + 1) * 2 - 3 = 9
2. Promises (Polyfill for Promise.all, Promise.race, Promise.allSettled)
Purpose: Promises handle asynchronous operations. Promise.all resolves when all promises resolve or rejects on first rejection. Promise.race resolves/rejects with the first settled promise. Promise.allSettled resolves with the status of all promises, regardless of rejection.

Code:

javascript

Copy
// Promise.all polyfill
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        },
        err => reject(err)
      );
    });
  });
};

// Promise.race polyfill
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
};

// Promise.allSettled polyfill
Promise.myAllSettled = function (promises) {
  return new Promise(resolve => {
    let results = [];
    let completed = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = { status: 'fulfilled', value };
          completed++;
          if (completed === promises.length) resolve(results);
        },
        reason => {
          results[index] = { status: 'rejected', reason };
          completed++;
          if (completed === promises.length) resolve(results);
        }
      );
    });
  });
};

// Example usage
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = Promise.reject('Error');

Promise.myAll([p1, p2]).then(console.log); // [1, 2]
Promise.myRace([p2, p3]).catch(console.log); // Error
Promise.myAllSettled([p1, p3]).then(console.log); // [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 'Error'}]
3. Implement map, filter, reduce, and forEach Polyfills
Purpose: These array methods are fundamental for functional programming. map transforms elements, filter selects elements, reduce aggregates elements, and forEach iterates without returning a value. Polyfills ensure compatibility in older environments.

Code:

javascript

Copy
// map polyfill
Array.prototype.myMap = function (callback, thisArg) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback.call(thisArg, this[i], i, this));
  }
  return result;
};

// filter polyfill
Array.prototype.myFilter = function (callback, thisArg) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// reduce polyfill
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

// forEach polyfill
Array.prototype.myForEach = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};

// Example usage
const arr = [1, 2, 3];
console.log(arr.myMap(x => x * 2)); // [2, 4, 6]
console.log(arr.myFilter(x => x > 1)); // [2, 3]
console.log(arr.myReduce((acc, x) => acc + x, 0)); // 6
arr.myForEach(x => console.log(x)); // 1, 2, 3
4. Implement Function.bind, call, and apply Methods
Purpose: These methods control the this context and arguments of function execution. bind creates a new function with a fixed this and partial arguments. call and apply invoke a function with a specified this and arguments (array for apply, individual for call).

Code:

javascript

Copy
// Function.prototype.call polyfill
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// Function.prototype.apply polyfill
Function.prototype.myApply = function (context, args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...(args || []));
  delete context[fn];
  return result;
};

// Function.prototype.bind polyfill
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...args) {
    return fn.apply(context, boundArgs.concat(args));
  };
};

// Example usage
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const obj = { name: 'Alice' };
console.log(greet.myCall(obj, 'Hello', '!')); // Hello, Alice!
console.log(greet.myApply(obj, ['Hi', '?'])); // Hi, Alice?
const boundGreet = greet.myBind(obj, 'Hey');
console.log(boundGreet('!')); // Hey, Alice!
5. Implement Async.parallel and Async.series for Executing Async Tasks
Purpose: These utilities manage asynchronous task execution. Async.parallel runs tasks concurrently and collects results when all complete. Async.series runs tasks sequentially, passing results to a callback once all are done.

Code:

javascript

Copy
const async = {
  // Async.parallel
  parallel(tasks, callback) {
    let results = [];
    let completed = 0;
    let hasError = false;

    if (tasks.length === 0) return callback(null, []);

    tasks.forEach((task, index) => {
      task((err, result) => {
        if (hasError) return;
        if (err) {
          hasError = true;
          return callback(err);
        }
        results[index] = result;
        completed++;
        if (completed === tasks.length) callback(null, results);
      });
    });
  },

  // Async.series
  series(tasks, callback) {
    let results = [];
    let index = 0;

    function next(err, result) {
      if (err) return callback(err);
      if (result !== undefined) results.push(result);
      if (index >= tasks.length) return callback(null, results);
      tasks[index++](next);
    }

    next(null);
  }
};

// Example usage
const task1 = cb => setTimeout(() => cb(null, 'One'), 200);
const task2 = cb => setTimeout(() => cb(null, 'Two'), 100);

async.parallel([task1, task2], (err, results) => {
  console.log(results); // ['One', 'Two']
});

async.series([task1, task2], (err, results) => {
  console.log(results); // ['One', 'Two']
});
6. Build a Promise from Scratch
Purpose: Understanding Promises by building one helps grasp asynchronous control flow. A custom Promise manages state (pending, fulfilled, rejected) and handles resolution or rejection.

Code:

javascript

Copy
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];

    const resolve = value => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.onResolveCallbacks.forEach(cb => cb(value));
    };

    const reject = reason => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.value = reason;
      this.onRejectCallbacks.forEach(cb => cb(reason));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = (cb, value) => {
        try {
          const result = cb ? cb(value) : value;
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'fulfilled') {
        handle(onFulfilled, this.value);
      } else if (this.state === 'rejected') {
        handle(onRejected, this.value);
      } else {
        this.onResolveCallbacks.push(value => handle(onFulfilled, value));
        this.onRejectCallbacks.push(reason => handle(onRejected, reason));
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Example usage
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success'), 100);
});
p.then(console.log); // Success
7. Implement a Retry API
Purpose: A retry API automatically retries a failed asynchronous operation (e.g., API call) up to a specified number of attempts, improving robustness in unreliable environments.

Code:

javascript

Copy
function retry(fn, maxAttempts = 3, delay = 100) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attempt() {
      fn()
        .then(resolve)
        .catch(err => {
          attempts++;
          if (attempts >= maxAttempts) {
            reject(err);
          } else {
            setTimeout(attempt, delay);
          }
        });
    }

    attempt();
  });
}

// Example usage
const flakyAPI = () =>
  new Promise((resolve, reject) => {
    if (Math.random() > 0.7) resolve('Success');
    else reject('Failed');
  });

retry(flakyAPI, 3, 100)
  .then(console.log)
  .catch(console.error); // Success or Failed after 3 attempts
8. Implement Memoization
Purpose: Memoization caches function results for given inputs to avoid redundant computations, improving performance for expensive operations.

Code:

javascript

Copy
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Example usage
const factorial = memoize(n => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

console.log(factorial(5)); // 120
console.log(factorial(5)); // 120 (cached)
9. Currying (with Examples)
Purpose: Currying transforms a function with multiple arguments into a sequence of single-argument functions, enabling partial application and functional composition.

Code:

javascript

Copy
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

// Example usage
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
10. String.prototype.repeat
Purpose: Repeats a string a specified number of times. A polyfill ensures compatibility in older browsers.

Code:

javascript

Copy
String.prototype.myRepeat = function (count) {
  if (count < 0 || !Number.isInteger(count)) {
    throw new RangeError('Invalid count value');
  }
  let result = '';
  for (let i = 0; i < count; i++) {
    result += this;
  }
  return result;
};

// Example usage
console.log('abc'.myRepeat(3)); // 'abcabcabc'
11. Design Patterns (Singleton, Factory, Builder)
Purpose: Design patterns provide reusable solutions to common problems. Singleton ensures a single instance of a class. Factory creates objects without specifying the exact class. Builder constructs complex objects step-by-step.

Code:

javascript

Copy
// Singleton
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
    this.data = 'Singleton Data';
  }
}
const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // true

// Factory
class Car {
  constructor(model) { this.model = model; }
}
class Truck {
  constructor(model) { this.model = model; }
}
const VehicleFactory = {
  createVehicle(type, model) {
    switch (type) {
      case 'car': return new Car(model);
      case 'truck': return new Truck(model);
      default: throw new Error('Unknown type');
    }
  }
};
console.log(VehicleFactory.createVehicle('car', 'Sedan')); // Car { model: 'Sedan' }

// Builder
class Product {
  constructor() { this.parts = []; }
  add(part) { this.parts.push(part); }
  show() { console.log(this.parts); }
}
class ProductBuilder {
  constructor() { this.product = new Product(); }
  addPartA() { this.product.add('Part A'); return this; }
  addPartB() { this.product.add('Part B'); return this; }
  build() { return this.product; }
}
const builder = new ProductBuilder();
const product = builder.addPartA().addPartB().build();
product.show(); // ['Part A', 'Part B']
12. Implement the Publisher-Subscriber Pattern
Purpose: The Pub-Sub pattern allows objects to subscribe to events and be notified when those events occur, enabling loose coupling.

Code:

javascript

Copy
class PubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(callback);
  }

  unsubscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
    }
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data));
    }
  }
}

// Example usage
const pubsub = new PubSub();
const log = data => console.log('Log:', data);
pubsub.subscribe('message', log);
pubsub.publish('message', 'Hello'); // Log: Hello
pubsub.unsubscribe('message', log);
pubsub.publish('message', 'World'); // No output
13. Prototype and Prototype Inheritance
Purpose: JavaScript uses prototypes for inheritance, allowing objects to inherit properties and methods from other objects. Understanding prototypes is key to mastering JavaScript’s object-oriented features.

Explanation: Every object has a prototype (__proto__) that links to another object. Properties/methods not found on an object are looked up in its prototype chain.

Code:

javascript

Copy
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function () {
  console.log(`${this.name} barks`);
};

const dog = new Dog('Rex');
dog.speak(); // Rex barks
console.log(dog instanceof Animal); // true
14. How Rendering Works in the Browser
Purpose: Understanding browser rendering helps optimize web performance. The browser converts HTML, CSS, and JavaScript into a visual page through a series of steps.

Explanation:

DOM Construction: Browser parses HTML to build the Document Object Model (DOM).
CSSOM Construction: CSS is parsed to create the CSS Object Model (CSSOM).
Render Tree: DOM and CSSOM combine to form the render tree, containing visible elements.
Layout: Browser calculates the position and size of each element (reflow).
Painting: Pixels are drawn to the screen.
Compositing: Layers are combined for final display.
Optimization Tips:

Minimize reflows by batching DOM updates.
Use CSS transforms for animations to avoid repaints.
Reduce critical rendering path by optimizing CSS/JavaScript loading.
No code required (conceptual).

15. Event Delegation and Event Propagation
Purpose: Event delegation leverages event propagation (bubbling/capturing) to handle events efficiently on parent elements, reducing memory usage for dynamic content.

Explanation:

Propagation: Events propagate in two phases: capturing (top-down) and bubbling (bottom-up).
Delegation: Attach a single event listener to a parent to handle events for multiple children.
Code:

javascript

Copy
document.querySelector('ul').addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});

// HTML: <ul><li>One</li><li>Two</li></ul>
// Clicking <li> logs its text content
16. Progressive Web Applications (PWAs)
Purpose: PWAs combine web and native app features, offering offline support, push notifications, and fast performance via service workers and manifests.

Explanation:

Service Worker: A script that runs in the background, handling caching and offline functionality.
Web App Manifest: A JSON file defining app metadata (name, icons) for installation.
Features: Offline access, push notifications, and home screen installation.
Code (Basic Service Worker):

javascript

Copy
// sw.js
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll(['/', '/index.html', '/styles.css']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

// Register in main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
17. Clone an Object
Purpose: Cloning creates a copy of an object to avoid mutating the original. Shallow cloning copies top-level properties, while deep cloning copies nested objects.

Code:

javascript

Copy
// Shallow clone
function shallowClone(obj) {
  return Object.assign({}, obj);
}

// Deep clone
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const clone = Array.isArray(obj) ? [] : {};
  cache.set(obj, clone);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], cache);
    }
  }
  return clone;
}

// Example usage
const obj = { a: 1, b: { c: 2 } };
const shallow = shallowClone(obj);
const deep = deepClone(obj);
shallow.b.c = 3;
console.log(obj.b.c); // 3 (shallow affects original)
deep.b.c = 4;
console.log(obj.b.c); // 3 (deep does not affect original)
18. Debouncing and Throttling
Purpose: Debouncing delays function execution until after a pause in events (e.g., search input). Throttling limits execution to a fixed rate (e.g., scroll handling). Both optimize performance.

Code:

javascript

Copy
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Example usage
const log = () => console.log('Event');
const debouncedLog = debounce(log, 100);
const throttledLog = throttle(log, 100);
window.addEventListener('resize', debouncedLog); // Logs after resize stops
window.addEventListener('scroll', throttledLog); // Logs every 100ms during scroll
19. Implement clearAllTimeout()
Purpose: Clears all active setTimeout timers, useful for resetting application state or preventing memory leaks.

Code:

javascript

Copy
(function () {
  const originalSetTimeout = window.setTimeout;
  const timeouts = new Set();

  window.setTimeout = function (fn, delay, ...args) {
    const id = originalSetTimeout(() => {
      timeouts.delete(id);
      fn(...args);
    }, delay);
    timeouts.add(id);
    return id;
  };

  window.clearAllTimeout = function () {
    timeouts.forEach(id => clearTimeout(id));
    timeouts.clear();
  };
})();

// Example usage
setTimeout(() => console.log('One'), 100);
setTimeout(() => console.log('Two'), 200);
clearAllTimeout(); // No logs
20. How Does this Work in Different Scenarios?
Purpose: The value of this depends on how a function is called, impacting method behavior in objects, constructors, and event handlers.

Explanation:

Global Context: this is window (or undefined in strict mode).
Object Method: this is the object the method is called on.
Constructor: this is the newly created instance.
Explicit Binding: call, apply, or bind set this.
Arrow Functions: this is lexically bound to the enclosing scope.
Code:

javascript

Copy
// Global
console.log(this); // window (non-strict)

// Object method
const obj = {
  name: 'Alice',
  greet() { console.log(this.name); }
};
obj.greet(); // Alice

// Constructor
function Person(name) {
  this.name = name;
}
const p = new Person('Bob');
console.log(p.name); // Bob

// Explicit binding
function greet() { console.log(this.name); }
greet.call({ name: 'Charlie' }); // Charlie

// Arrow function
const arrowObj = {
  name: 'Dave',
  greet: () => console.log(this.name)
};
arrowObj.greet(); // undefined (this is window in non-strict mode)
21. Difference Between Synchronous and Asynchronous Code
Purpose: Understanding sync vs. async is crucial for handling I/O operations efficiently. Sync code executes sequentially, blocking execution. Async code allows non-blocking operations, using callbacks, promises, or async/await.

Explanation:

Synchronous: Executes one task at a time, waiting for completion (e.g., loops, calculations).
Asynchronous: Schedules tasks (e.g., API calls, timers) and continues execution, resolving later.
Code:

javascript

Copy
// Synchronous
console.log('Start');
for (let i = 0; i < 3; i++) console.log(i);
console.log('End');
// Output: Start, 0, 1, 2, End

// Asynchronous
console.log('Start');
setTimeout(() => console.log('Timer'), 0);
console.log('End');
// Output: Start, End, Timer
22. Explain "Truthy" and "Falsy" Values
Purpose: Truthy and falsy values determine how non-boolean values are coerced in boolean contexts (e.g., if statements).

Explanation:

Falsy: false, 0, -0, 0n, '', null, undefined, NaN.
Truthy: All other values, including {} and [].
Code:

javascript

Copy
if (0) console.log('Never'); // Falsy
if ('hello') console.log('Always'); // Truthy
if ([]) console.log('Truthy array'); // Truthy
23. What Are Template Literals in ES6?
Purpose: Template literals (backticks) allow string interpolation and multi-line strings, improving readability over concatenation.

Code:

javascript

Copy
const name = 'Alice';
const greeting = `Hello, ${name}!
Welcome to ES6.`;
console.log(greeting);
// Output:
// Hello, Alice!
// Welcome to ES6.
24. How Do You Handle Errors in JavaScript?
Purpose: Proper error handling ensures robust applications by gracefully managing failures.

Explanation:

try/catch: Catches synchronous errors.
Promise.catch: Handles async errors in promises.
async/await: Uses try/catch for async code.
Global Handlers: window.onerror or process.on('uncaughtException') for unhandled errors.
Code:

javascript

Copy
// Sync error
try {
  throw new Error('Sync error');
} catch (err) {
  console.error(err.message); // Sync error
}

// Async error (Promise)
Promise.reject('Async error').catch(console.error); // Async error

// Async/await
async function fetchData() {
  try {
    await Promise.reject('Fetch error');
  } catch (err) {
    console.error(err); // Fetch error
  }
}
fetchData();
25. Implement a Function to Flatten a Nested Array
Purpose: Flattening converts a nested array into a single-level array, useful for processing complex data structures.

Code:

javascript

Copy
function flatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

// Example usage
const nested = [1, [2, [3, 4], 5]];
console.log(flatten(nested)); // [1, 2, 3, 4, 5]
26. Implement an LRU Cache
Purpose: An LRU (Least Recently Used) cache stores a fixed number of items, evicting the least recently used item when full. It’s used in performance-critical systems like databases or browsers.

Code:

javascript

Copy
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// Example usage
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3); // Evicts key 2
console.log(cache.get(2)); // -1
27. What Are Closures in JavaScript?
Purpose: Closures allow a function to retain access to its lexical scope, even when executed outside that scope. They’re used for data privacy, memoization, and callbacks.

Code:

javascript

Copy
function outer() {
  let count = 0;
  return function inner() {
    return count++;
  };
}

const counter = outer();
console.log(counter()); // 0
console.log(counter()); // 1
28. Explain the Event Loop in JavaScript
Purpose: The event loop enables asynchronous execution in JavaScript’s single-threaded environment, managing tasks like timers, promises, and I/O.

Explanation:

Call Stack: Executes synchronous code.
Task Queue: Holds callbacks from timers, I/O, etc.
Microtask Queue: Holds promise callbacks (higher priority).
Event Loop: Moves tasks from queues to the stack when the stack is empty.
Code:

javascript

Copy
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');
// Output: Start, End, Promise, Timeout
29. Difference Between var, let, and const
Purpose: These keywords define variable scope and mutability, affecting code behavior and maintainability.

Explanation:

var: Function-scoped, hoisted with undefined, reassignable.
let: Block-scoped, hoisted but not initialized (TDZ), reassignable.
const: Block-scoped, hoisted but not initialized, not reassignable (but mutable for objects).
Code:

javascript

Copy
var x = 1; // Function scope
let y = 2; // Block scope
const z = 3; // Block scope, immutable
if (true) {
  var x = 10; // Overrides x
  let y = 20; // New y
  const z = 30; // New z
}
console.log(x, y, z); // 10, 2, 3
30. How Does Hoisting Work in JavaScript?
Purpose: Hoisting explains why variables and functions can be used before declaration. JavaScript moves declarations to the top of their scope during compilation.

Explanation:

Variables: var is hoisted with undefined; let and const are hoisted but inaccessible (Temporal Dead Zone).
Functions: Function declarations are fully hoisted; expressions are not.
Code:

javascript

Copy
console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError: y is not defined
let y = 10;

foo(); // Works
function foo() {
  console.log('Function hoisted');
}
31. Purpose of setTimeout and setInterval
Purpose: setTimeout schedules a function to run after a delay. setInterval repeatedly runs a function at a fixed interval. Both are used for async operations like animations or polling.

Code:

javascript

Copy
setTimeout(() => console.log('Delayed'), 1000); // Logs after 1s
const id = setInterval(() => console.log('Repeated'), 1000); // Logs every 1s
setTimeout(() => clearInterval(id), 5000); // Stops after 5s
32. How to Use the Fetch API
Purpose: The Fetch API provides a modern way to make HTTP requests, replacing XMLHttpRequest, with promise-based syntax.

Code:

javascript

Copy
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error('Network error');
    return response.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
fetchData();
33. What Is a Service Worker in the Context of PWAs?
Purpose: A service worker is a script that runs in the background, enabling offline functionality, caching, and push notifications for PWAs.

Explanation:

Acts as a proxy between the app and network.
Handles events like install, fetch, and push.
Enables offline access by caching assets.
Code: See PWA section (#16) for a basic service worker example.

34. Describe How to Implement Deep Cloning of an Object
Purpose: Deep cloning ensures all nested objects are copied, preventing unintended mutations of the original.

Code: See Clone an Object section (#17) for deepClone implementation.

35. What Are Modules in JavaScript? How Do You Use Them?
Purpose: Modules organize code into reusable, encapsulated units, improving maintainability and avoiding global namespace pollution.

Explanation:

ES Modules: Use import/export syntax (ES6+).
CommonJS: Uses require/module.exports (Node.js).
Code:

javascript

Copy
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';
console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
36. Explain this Binding with Examples
Purpose: this binding controls the context of function execution, critical for methods and callbacks.

Code: See How Does this Work section (#20) for detailed examples.

37. What Is a Closure? Provide an Example
Purpose: Closures enable private variables and state persistence, used in patterns like modules and callbacks.

Code: See What Are Closures section (#27) for an example.

38. How Do You Prevent Default Behavior of an Event?
Purpose: Preventing default behavior (e.g., form submission, link navigation) allows custom event handling.

Code:

javascript

Copy
document.querySelector('a').addEventListener('click', e => {
  e.preventDefault();
  console.log('Link clicked, default prevented');
});
39. What Are Arrow Functions, and How Do They Differ from Regular Functions?
Purpose: Arrow functions provide concise syntax and lexical this binding, ideal for callbacks but not for methods or constructors.

Explanation:

Syntax: () => {} vs. function() {}.
this: Lexical in arrow functions, dynamic in regular functions.
No arguments: Arrow functions don’t have their own arguments object.
No Constructor: Arrow functions cannot be used with new.
Code:

javascript

Copy
const obj = {
  name: 'Alice',
  regular: function () { console.log(this.name); },
  arrow: () => console.log(this.name)
};
obj.regular(); // Alice
obj.arrow(); // undefined (this is window)
40. Explain the Concept of Promise Chaining
Purpose: Promise chaining allows sequential async operations, where each .then receives the previous result, improving readability over nested callbacks.

Code:

javascript

Copy
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => data.id)
  .then(id => console.log(id))
  .catch(err => console.error(err));
41. What Is the Purpose of Object.create()?
Purpose: Object.create() creates a new object with a specified prototype, enabling prototypal inheritance without constructors.

Code:

javascript

Copy
const proto = { greet() { console.log('Hello'); } };
const obj = Object.create(proto);
obj.greet(); // Hello
console.log(Object.getPrototypeOf(obj) === proto); // true
42. How Can You Check If an Object Is an Array?
Purpose: Checking for arrays ensures correct handling of array-specific methods.

Code:

javascript

Copy
const arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
console.log(arr instanceof Array); // true
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
43. What Are IIFE (Immediately Invoked Function Expressions)?
Purpose: IIFEs execute a function immediately after definition, providing scope isolation to avoid polluting the global namespace.

Code:

javascript

Copy
(function () {
  var x = 10;
  console.log(x); // 10
})();
console.log(typeof x); // undefined (x is not global)
44. Explain How to Create a Custom Event in JavaScript
Purpose: Custom events allow triggering and handling application-specific events, enhancing modularity.

Code:

javascript

Copy
const myEvent = new CustomEvent('myEvent', { detail: { message: 'Hello' } });
document.addEventListener('myEvent', e => {
  console.log(e.detail.message); // Hello
});
document.dispatchEvent(myEvent);
45. What Is JSON, and How Do You Parse It?
Purpose: JSON (JavaScript Object Notation) is a lightweight data format for APIs and storage. Parsing converts JSON strings to JavaScript objects.

Code:

javascript

Copy
const jsonString = '{"name": "Alice", "age": 25}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // Alice
const json = JSON.stringify(obj);
console.log(json); // '{"name":"Alice","age":25}'
46. Describe How to Implement a Simple Event Emitter
Purpose: An event emitter allows objects to emit and listen for events, similar to Pub-Sub, used in Node.js and custom frameworks.

Code:

javascript

Copy
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

// Example usage
const emitter = new EventEmitter();
const log = msg => console.log(msg);
emitter.on('greet', log);
emitter.emit('greet', 'Hello'); // Hello
emitter.off('greet', log);
emitter.emit('greet', 'World'); // No output
47. What Are Weak References in JavaScript?
Purpose: Weak references (WeakMap, WeakSet) allow objects to be garbage-collected when no other references exist, preventing memory leaks in caches or metadata storage.

Explanation:

WeakMap: Keys are objects, and entries are removed if the key is garbage-collected.
WeakSet: Stores objects, removed when no other references exist.
Unlike Map/Set, weak collections are not iterable.
Code:

javascript

Copy
const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, 'Data');
console.log(weakMap.get(obj)); // Data
obj = null; // obj can be garbage-collected, removing the entry
48. How Do You Optimize Performance in Large-Scale Applications?
Purpose: Performance optimization ensures fast, scalable applications, critical for user experience and resource efficiency.

Techniques:

Minimize DOM Operations: Batch updates, use requestAnimationFrame.
Lazy Loading: Load images/resources on demand.
Debounce/Throttle: Limit event handler frequency.
Code Splitting: Split bundles for faster initial loads.
Caching: Use memoization or service workers.
Efficient Algorithms: Optimize loops and data structures.
No code required (conceptual).

49. How to Use localStorage and sessionStorage
Purpose: localStorage and sessionStorage store key-value pairs in the browser. localStorage persists until cleared; sessionStorage lasts for the session.

Code:

javascript

Copy
// localStorage
localStorage.setItem('key', 'value');
console.log(localStorage.getItem('key')); // value
localStorage.removeItem('key');

// sessionStorage
sessionStorage.setItem('temp', 'data');
console.log(sessionStorage.getItem('temp')); // data
sessionStorage.clear(); // Clears all sessionStorage
50. Common Security Issues in JavaScript Applications
Purpose: Addressing security issues protects applications from attacks like XSS, CSRF, and data leaks.

Issues and Mitigations:

XSS (Cross-Site Scripting): Sanitize inputs, use textContent instead of innerHTML.
CSRF (Cross-Site Request Forgery): Use CSRF tokens, validate origins.
Insecure Dependencies: Audit packages with tools like npm audit.
Eval Injection: Avoid eval() or Function constructor.
Sensitive Data Exposure: Encrypt sensitive data, use HTTPS.
No code required (conceptual).

This covers all requested topics with explanations, purposes, and code where applicable. Let me know if you need further clarification or additional details on any section!









How can Grok help?


DeepSearch


Think

Grok 3