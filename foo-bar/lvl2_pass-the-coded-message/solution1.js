const fs = require("fs");
const combinations = require('./combinations.json');

const run = () => {
    const solutions = [];
    const start = Date.now();
    
    combinations.combinations.forEach(c => {
        solutions.push(solution(c));
    });

    console.log("time:", Date.now() - start);
    fs.writeFileSync("residue-based-solutions.json", solutions);
}

const map = {
    "1": [1,4,7],
    "2": [2,5,8]
}

const solution = number => {
    number = number.split("").sort().reverse().join("");
   
    while (true) {
        let intBased = parseInt(number);
        let residue = intBased % 3;

        if (residue === 0) {
            return intBased;
        }

        number = removeResidue(intBased.toString(), map[residue]);
    }
}

const removeResidue = (number, residueList) => {
    let index = -1;

    // Remove residual number
    residueList.forEach(r => {
        index = number.indexOf(r);
        if (index > -1) {
            number = number.replace(r,"");
            return;
        }
    });

    // If there is no residual number, remove smalest indicisible number
    if (index === -1) {
        for(let i = number.length - 1; i >= 0; i--) {
            if (parseInt(number[i]) % 3) {
                number = number.replace(number[i], "");
            }
        }
    }

    if (number === "") {
        number = 0;
    }

    return number;
}

run();