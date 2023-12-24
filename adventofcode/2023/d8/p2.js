const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
let start = Date.now();

const getInstructions = (line) => {
    return line.trim().split("");
}

const inputArray = input.split(/\r?\n/);
const instructions = getInstructions(inputArray[0]);
inputArray[0] = "";

const map = {};
const startNodes = [];

const constructNode = (line) => {
    [nodeKey, LRNodes] = line.split(" = ");
    [leftNode, rightNode] = LRNodes.replace(/[^A-Z1-9 ]/gi, '').split(" ");

    if (nodeKey[2] == "A") {
        startNodes.push(nodeKey);
    }


    map[nodeKey] = {
        L: leftNode,
        R: rightNode
    }
}

inputArray.forEach(line =>  {
    if (line.trim() !== "") {
        constructNode(line);
    }  
});

let count = 0;
let nextInstruction = instructions[0];
let iterations = [];

for(let i = 0; i < startNodes.length; i++) {
    let nextNode = startNodes[i];
    count = 0;

    while(1) {
        nextNode = map[nextNode][nextInstruction];
    
        if (nextNode[2] == "Z") {
            iterations.push((count+1));
            break;
        }
    
        count++;
        let nextInstructionIndex = count % instructions.length;
        nextInstruction = instructions[nextInstructionIndex];
    }    
}


let product = 1;
let dividers = [];

const getLCM = () => {
    iterations = iterations.sort((a, b) => a - b);
    let limit = Math.floor(iterations[0] / 2);

    let divider = 2;
    while(1) {
        let tmpIt = [];
        
        for(let i = 0; i < iterations.length; i++) {
            if ((iterations[i] % divider) != 0) {
                break;
            }
            
            tmpIt.push((iterations[i] / divider));
        }

        if (tmpIt.length == iterations.length) {
            iterations = tmpIt;
            dividers.push(divider);
            continue;
        }

        divider++;

        if (divider >= limit) {
            break;
        }
    }

    dividers.concat(iterations).forEach(e => product *= e);

}

getLCM();

console.log("itterations:", iterations);
console.log("dividers:", dividers);
console.log(product);


console.log(Date.now() - start);


