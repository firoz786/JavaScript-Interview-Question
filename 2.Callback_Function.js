function greet(name) {
    console.log("Hello, " + name);
}

function processUserInput(callback) {
    const name = "Firoz";
    callback(name); // callback is called here
}

// processUserInput(greet); // greet is passed as a callback function
// setTimeout(() => { console.log("my name is firoz") }, 2000);

// ---------------------------------------------------------Interview Question------------------------------------------------

function customMap(arr, callback) {
    // your code here
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i],i,arr)); // callback is called here . also it accepts 3 arguments but only 1 is used that is arr[i]
        console.log(arr[i],i,arr);
    }
    return result;
  }
  
  const result = customMap([1, 2, 3], function (x) {
    return x * 3;
  });
  
  console.log(result); // [2, 4, 6]
  
  