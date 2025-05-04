function NullishCoalescing() {
    // Nullish Coalescing Operator
    const a = null;
    const b = undefined;
    const c = 0;
    const d = false;
    const e = '';
    const f = 'Hello';

    console.log("a ?? b", a ?? b); // undefined
    console.log("b ?? c", b ?? c); // 0
    console.log("c ?? d", c ?? d); // 0
    console.log("d ?? e", d ?? e); // false
    console.log("e ?? f", e ?? f); // ''

    // optional chaining
    let user = {
        name: "Alice",
        address: {
            city: "Wonderland",
        },
    };

    console.log(user?.address?.city); // Output: "Wonderland"
    console.log(user?.contact?.phone); // Output: undefined (no error)
}
NullishCoalescing();


// The nullish coalescing operator (??) is used to provide a default value when a variable is null or undefined. 
// It is similar to the logical OR operator (||), but it only checks for null or undefined, not other falsy values like 0, false, or "".