function Function() {
    //Example :  Function Hoisting
    console.log(greet("Alice")); // we are calling the function here before defining it. Hoisting. 
    
    function greet(name) {
        return `Hello, ${name}!`;
    }


    //Example :  Function expression me hoisting nahi hota
    // console.log(greet1("Bob")); // Output: Hello, Bob! // TypeError: greet is not a function --> idhar hositing nahi hota
    const greet1 = function (name) {
        return `Hello, ${name}!`;
    };
    console.log(greet1("Bob")); // Output: Hello, Bob! 


    //Example :  Rest and Spread operator
    function add(...numbers) {
        return numbers.reduce((acc, num) => acc + num * 2, 2);
    }
    console.log(add(1, 2));

    (()=>{console.log("This is called IIFE imediate invk fun exp")})();
}
Function();