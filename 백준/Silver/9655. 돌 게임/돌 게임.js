const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n] = fs.readFileSync(filePath).toString().trim().split("\n");
n=n*1;

n%2===1? console.log("SK"): console.log("CY")
/*
 돌이 
*/