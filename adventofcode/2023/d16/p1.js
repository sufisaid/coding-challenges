const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./t1-input.txt", "utf-8");
let startTime = Date.now();


input.split(/\r?\n/).forEach(line => {
    console.log(line)
});


console.log()
console.log(Date.now() - startTime);