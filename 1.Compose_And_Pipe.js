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


//   what should we know : 

//   What is a Polyfill?
// A polyfill is a piece of code (usually JavaScript) that provides modern functionality on older environments that do not natively support it.

// For example:

// Array.prototype.flat() is not supported in older browsers — so a polyfill can add it manually.

// In this case, JavaScript (vanilla) doesn’t provide compose() and pipe() by default — so we write our own polyfills for them.

// ✅ Polyfill for compose() and pipe()
// js
// Copy
// Edit
// // Right to left
// function compose(...fns) {
//   return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
// }

// // Left to right
// function pipe(...fns) {
//   return (value) => fns.reduce((acc, fn) => fn(acc), value);
// }