const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");

let sum = 0;
const schema = [];

input.split(/\r?\n/).forEach(line =>  {
    schema.push(line);
});

console.log(schema)

const numList = [];
let partialNumList = [];

const extractNumbers = () => {
    for(let i = 0; i < schema.length; i++) {
        for(let j = 0; j < schema[i].length; j++) {
            let relatedRaws = [];
            partialNumList = [];
            
            if (schema[i][j] != "." && /^\d$/.test(schema[i][j]) == false) {
                if (schema[i-1]) {
                    getNumbersRelatedToPosition(schema[i-1], j);    
                }
                getNumbersRelatedToPosition(schema[i], j);

                if (schema[i+1]) {
                    getNumbersRelatedToPosition(schema[i+1], j);    
                }                
            }

            if (partialNumList.length == 2) {
                numList.push(partialNumList[0] * partialNumList[1]);
            }
        }
    }
}

const getNumbersRelatedToPosition = (row, position) => {
    const subLine = [];
    //before position
    for(let i = position - 1; i >= 0; i--) {
        if (row[i] && /^\d$/.test(row[i])) {
            subLine.unshift(row[i]);
            continue;
        }

        break;
        
    }

    subLine.push(row[position]);

    //after position
    for(let i = position + 1; i < row.length; i++) {
        if (row[i] && /^\d$/.test(row[i])) {
            subLine.push(row[i]);
            continue;
        }

        break;
    }

    subLineString = subLine.join("");

    if (subLineString.length) {
        let tmp = subLineString.match(/\d+/g);

        if (tmp) {
            partialNumList.push(...tmp);
        }
    }
}

extractNumbers()

console.log(numList)

numList.forEach(n => {sum += Number(n)});

console.log(sum)
