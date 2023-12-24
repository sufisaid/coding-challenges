const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./ned-input.txt", "utf-8");
let start = Date.now();

input.split(/\r?\n\r?\n/).forEach(line =>  {
    
});


console.log(Date.now() - start)


