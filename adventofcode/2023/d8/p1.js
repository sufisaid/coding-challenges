const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");
let start = Date.now();

const getInstructions = (line) => {
    return line.trim().split("");
}

const inputArray = input.split(/\r?\n/);
const instructions = getInstructions(inputArray[0]);
inputArray[0] = "";

const map = {};

const constructNode = (line) => {
    [nodeKey, nextNodes] = line.split(" = ");
    [leftNode, rightNode] = nextNodes.replace(/[^A-Z ]/gi, '').split(" ");

    map[nodeKey] = {
        L: leftNode,
        R: rightNode
    }
}

inputArray.forEach(line =>  { console.log(line)
    if (line.trim() !== "") {
        constructNode(line);
    }  
});

let count = 0;
let nextInstruction = instructions[0];
let nextNode = "AAA";

while(1) {
    nextNode = map[nextNode][nextInstruction];

    if (nextNode == "ZZZ") {
        break;
    }

    count++;
    let nextInstructionIndex = count % instructions.length;
    nextInstruction = instructions[nextInstructionIndex];
}

console.log("Result:", count + 1);
console.log(Date.now() - start);