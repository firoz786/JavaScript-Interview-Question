function LexicalScope() {
  // Lexical scope is the scope that is defined by the position of the function in the source code.
  // It means that a function can access variables from its own scope, its parent scope, and the global scope.
  // It does not mean that a function can access variables from any other scope.

  const x = 1; // Global scope

  function outerFunction() {
    const y = 2; // Outer function scope

    function innerFunction() {
      const z = 3; // Inner function scope
      console.log(x, y, z); // 1, 2, 3
    }

    innerFunction();
  }
  
  outerFunction();
// -----------------

  function outerFunction1() {
    let count = 0;
  
    return function innerFunction1() {
      count++;
      console.log(count);
    };
  }
  
  const counter = outerFunction1();
  counter(); // Output: 1
  counter(); // Output: 2

}
LexicalScope();