const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.NAME,
});

connection.connect();

function insertPromise (insertData){
  //1.建立 new Prmise物件
  //2. 建構式傳入執行者(本身也是函式且有兩個參數一般使用resolve,reject)
  return new Promise((sucess, failed) =>{
  //3.導入非同步工作
  connection.query(
    "INSERT IGNORE INTO stock (stock_no, date, volume, transaction, order) VALUES (?, ?, ? ,?, ?);", 
    insertData,
    (err, results) => {
      if (err) {
        failed(err);
      } else {
        sucess(results);
      }
    }
  );
});  
}

async function queryData() {
  let today = moment().format("YYYYMMDD"); // momment 套件自動抓當天的日期
  let format = "json";
 
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log("stockCode", stockCode);

    let res = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: format,
          date: today,
          stockNo: stockCode,
        },
      }
    );
    let firstItem = res.data.data[0];
    console.log(firstItem);
   
    let result = await insertPromise([
      stockCode,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ]);
    console.log("insertPromise", result)
  }catch (e) {
    console.error(e);
  }finally{
    connection.end();
  }
}

queryData();