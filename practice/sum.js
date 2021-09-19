console.log("hello world");

function sum(param) {
  //to do 從1加到...6
  let total = 0;
  for (let i = 1; i <= param; i++) {
    total += i;
  }
  return total;
}

let result = sum(2);
console.log(result);

