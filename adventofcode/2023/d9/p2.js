const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");
let startTime = Date.now();

let sum = 0;

const getNextNumber = (list) => {
    let difList = [];
    let allZeros = true;

    for(let i = 0; i < list.length - 1; i++) {
        let diff = list[i+1] - list[i];
        difList.push(diff);

        if (diff !== 0) {
            allZeros = false;
        }
    }
    
    if (allZeros) {
        return 0;
    }

    return difList[0] - getNextNumber(difList);
}

input.split(/\r?\n/).forEach(line => {
    let numbers = line.split(" ").map(n => Number(n));
    sum += numbers[0] - getNextNumber(numbers);
});

console.log("Time:", Date.now() - startTime);
console.log("Result:", sum);
