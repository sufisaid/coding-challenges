const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");
let startTime = Date.now();

let sum = 0;

const hash = (word) => {
    let hashSum = 0;

    for(let i = 0; i < word.length; i++) {
        hashSum += word.charCodeAt(i);
        hashSum *= 17;
        hashSum = hashSum % 256;
    }

    //console.log(word, hashSum);
    return hashSum;
}

input.split(",").forEach(line => {
    //console.log(line)
    sum += hash(line);    
});

console.log("Time:", Date.now() - startTime);
console.log("Result:", sum);
