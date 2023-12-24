const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");
let startTime = Date.now();

let sum = 0;
let hashMap = {};

const hash = (word) => {
    let hashSum = 0;

    for(let i = 0; i < word.length; i++) {
        hashSum += word.charCodeAt(i);
        hashSum *= 17;
        hashSum = hashSum % 256;
    }

    return hashSum;
}

const addValue = (hashWord, value) => {
    if (hashMap[hashWord]) {
        hashMap[hashWord][value[0]] = value[1];    
    } else {
        hashMap[hashWord] = {[value[0]]: value[1]};
    }
}

const removeValue = (hashWord, value) => {
    if (hashMap[hashWord] && hashMap[hashWord][value[0]]) {
        delete hashMap[hashWord][value[0]];

        if (Object.values(hashMap[hashWord]).length === 0) {
            delete hashMap[hashWord];
        }
    }    
}

input.split(",").forEach(line => {
    let splitBy = "-"
        
    if (line.indexOf("=") != -1) {
        splitBy = "="
    }

    let word = line.split(splitBy);

    wordHash = hash(word[0]);

    switch (splitBy) {
        case "=":
            addValue(wordHash, word);
            break;
        case "-":
            removeValue(wordHash, word);
            break;
    }    
});

const calculate = () => {
    for(const key in hashMap) {
        let boxValue = Number(key);

        Object.values(hashMap[key]).forEach((value, index) => {
            sum += (boxValue + 1) * (index + 1) * value;
        })
    } 
}

calculate();

console.log("Time:", Date.now() - startTime);
console.log("Result:", sum);
