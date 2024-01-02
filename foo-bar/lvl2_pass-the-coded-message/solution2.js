const combinations = require('./combinations.json');
const fs = require('fs');

const run = () => {
    const solutions = [];
    const start = Date.now();

    combinations.combinations.forEach(c => {
        solutions.push(solution(c));
    });

    console.log("time:", Date.now() - start);
    fs.writeFileSync("level-based-solutions.json", solutions);
}


const solution = numbers => {
    numbers = numbers.split("").sort().reverse().join("");
    let list = [numbers];
    let solution = 0;

    while (true) {    
        let derivationList = [];

        for(let i = 0; i < list.length; i++) {
            if (isDivisibleBy3(list[i])) {
                return list[i];
            }

            derivationList.push(...generateDerivations(list[i]));
        }

        list = [...new Set(derivationList)];
        list.sort().reverse();

        if (list.length === 0) {
            break;
        }
    }

    return 0;
}


const isDivisibleBy3 = number => {
    const numberList = number.split("");
    const sum = numberList.reduce((a,b)=> a + b);
    const sumInt = parseInt(sum);

    if (sumInt === 0) {
        return false;
    }

    return sumInt % 3 === 0 ? number : false;
}

const generateDerivations = numbers => {
    const derivationList = [];

    if (numbers.length === 1) {
        return [];
    }

    for(let i = numbers.length-1, j=1; i >= 0; i--,j++) {
        tmpNum = numbers.slice(0,i) + numbers.slice(i+1,i+j);
        derivationList.push(tmpNum);
    }

    return derivationList;
}

run();