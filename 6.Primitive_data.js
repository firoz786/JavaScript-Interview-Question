function PrimitiveData() {
    // Primitive data types
    let str = "Hello, World!"; // String
    let num = 42; // Number
    let bool = true; // Boolean
    let undef; // Undefined
    let nul = null; // Null
    let sym = Symbol("unique"); // Symbol

    console.log(str, "\n", num, "\n", bool, "\n", undef, "\n", nul, "\n", sym,"\n");
    console.log(typeof str); // string
    console.log(typeof num); // number
    console.log(typeof bool); // boolean
    console.log(typeof undef); // undefined
    console.log(typeof nul); // object (this is a known quirk in JavaScript)
    console.log(typeof sym); // symbol


    console.log("Sympbol data types");
    let sym1  = Symbol("Secret");
    let obj = {
        [sym1]: "This is a secret value",
        name: "Firoz",
        age: 25
    }
    console.log(obj[sym1]); 
    console.log(Object.keys(obj)); // ["name", "age"] . Here, the symbol property is not included in the keys array.
}
PrimitiveData();

