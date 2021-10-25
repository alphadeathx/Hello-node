const fs = require("fs");

// Promise
// 1. 物件 ==> new Promise
// new Promise();
// 2. 建構式需要傳入一個執行者(也是函式)，執行者會有兩個參數: resolve, reject
// new Promise((resolve, reject) => {});
// 3. 裡面通常放的是非同步
// new Promise((resolve, reject) => {
//   fs.readFile("input.txt", "utf-8", (err, data) => {
//     if (err) {
//       console.error("發生錯誤", err);
//     } else {
//       console.log("正確讀到", data);
//     }
//   });
// });
// 4.1 非同步工作有執行成功: resolve
// new Promise((resolve, reject) => {
//   fs.readFile("input.txt", "utf-8", (err, data) => {
//     if (err) {
//       console.error("發生錯誤", err);
//     } else {
//       resolve(data);
//     }
//   });
// });
// 4.2 非同步工作有執行失敗: reject
let p = new Promise((resolve, reject) => {
  fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
console.log(p); // pending -> fulfilled / reject

// 用法1: then 也有兩個參數: 負責接成功(跟 resolve 對接) 、 負責接失敗的(跟 reject 對接)
// p.then(
//   (data) => {},
//   (err) => {}
// );

// 用法2: 改用 catch 來接錯誤
p.then((data) => {
  console.log("promise讀檔正確", data);
}).catch((err) => {
  console.error("promise讀檔失敗", err);
});