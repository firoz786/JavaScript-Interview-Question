// Example 1: Closure
// function outerFunction() {
//     let count = 0; // Variable in the outer function's scope

//     return function innerFunction() {
//         count++; // Inner function accesses and modifies `count`
//         console.log(count);
//     };
// }

// const counter = outerFunction(); // `outerFunction` is called, and `innerFunction` is returned
// counter(); // Output: 1
// counter(); // Output: 2
// counter(); // Output: 3

//   Explanation:
// When outerFunction is called, it creates a new scope with the variable count.
// The innerFunction is returned and assigned to counter.
// Even though outerFunction has finished executing, the innerFunction retains access to count because of the closure.
// Key Characteristics of Closures
// Preserve State: Closures allow functions to "remember" and maintain state between function calls.
// Private Variables: Variables in the outer function's scope act as private variables for the inner function.
// Lexical Scope: Closures rely on lexical scoping to access variables from their parent function.


// Example 2: Closure

// function outer() {
//     let a = 1;
//     console.log(a);
//     function inner() {
//         let a=2;
//         console.log(a);
//         function innerMost() {
//             let a=3;
//             console.log(a);
//         }
//         innerMost();
//     }
//     inner();
// }
// outer();

// -------------------

// Example 3: Closure
function multiplier(factor) {
  return (number) => number * factor; // `factor` is remembered by the closure
}

const double = multiplier(2);
console.log(double(5));
