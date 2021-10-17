console.log("hello world");

function sum(param) {
  
  let total = 0;
  for (let i = 1; i <= param; i++) {
    total += i;
  }
  return total;
}

let result = sum(2);
let result = sum(3);
let result = sum(6);
console.log(result);

function sum1(param) {
  // 請從 1 + 2 + 3 + .... + param
  // 梯形公式: (上底＋下底)x高/2
  let total = ((1 + param) * param) / 2;
  // param=5 --> 1次
  // param=10 --> 1次
  // param=10000 --> 1次
  // 時間複雜度 big O  O(1) =O(2)=O(3)....
  // O(常數): 不管 param 是多少，執行的次數是固定的
  return total;
}

function sum2(param) {
  let total = 0;
  for (let i = 1; i <= param; i++) {
    total += i;
    // param=5 --> 5次
    // param=10 --> 10次
    // param=10000 --> 10000
  }
  // O(n) == O(2n) == O(3n)...
  // O(n) => 會跟參數成等比例成長
  return total;
}

console.time("SUM1");
// O(1)
for (let i = 1; i <= 10000; i++) {
  sum1(100);
}
console.timeEnd("SUM1");

console.time("SUM2");
// O(n)
for (let i = 1; i <= 10000; i++) {
  sum2(100);
}
console.timeEnd("SUM2");

// O(1) < O(n) < O(n^2)

// reduce 可以寫出 1 + ... + n