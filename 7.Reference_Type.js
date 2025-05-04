function ReferenceType() {
  // Reference types are objects
  const person = {
    name: "John",
    age: 30,
  };

  // Reference types can be arrays
  const numbers = [1, 2, 3, 4, 5];

  // Reference types can be functions
  function greet() {
    console.log("Hello!");
  }

  // Reference types can be dates
  const date = new Date();

  // Reference types can be regular expressions
  const regex = /[a-z]/;

  console.log(person, "\n", numbers, "\n", greet, "\n", date, "\n", regex, "\n");
    console.log(typeof person); // object
    console.log(typeof numbers); // object
    console.log(typeof greet); // function
    console.log(typeof date); // object
    console.log(typeof regex); // object
    console.log(Array.isArray(numbers)); // true
    console.log(person instanceof Object); // true
    console.log(greet instanceof Function); // true
    console.log(date instanceof Date); // true
    console.log(regex instanceof RegExp); // true
}
ReferenceType();