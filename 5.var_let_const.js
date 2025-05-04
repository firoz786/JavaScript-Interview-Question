function varLetConst() {
  // var
  var x = 1;
  if (true) {
    var x = 2; 
    console.log(x); // 2
  }
  console.log(x); // why 2 

//   let
  let y = 1;
  if (true) {
    let y = 2; 
    console.log(y); 
  }
  console.log(y); 

//   const
  const z = 1;
  if (true) {
    const z = 2; 
    console.log(z); 
  }
  console.log(z); 
}

varLetConst();

// Reason :
// Variables declared with var are function-scoped, meaning they are accessible throughout the entire function in which they are declared, regardless of block boundaries (like if, for, etc.).
// This is different from let and const, which are block-scoped and only accessible within the block they are declared in.