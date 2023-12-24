const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
let sum = 0;

const strDigitMapper = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'};

const getFirstDigit = (phrase) => {
    const charList = phrase.split('');
    let position = 9999;
    let value = 0;
    
    for(let i = 0; i < charList.length; i++){
        if (/^\d$/.test(charList[i])) {
            position = i;
            value = charList[i];
            break;
        }
    }

    for (const key in strDigitMapper) {
        let tmp = phrase.indexOf(key);
        
        if (tmp != -1 && tmp < position) {
            position = tmp;
            value = strDigitMapper[key];
        }
    }


    return value;
}

const getLastDigit = (phrase) => {
    const charList = phrase.split('');
    let position = -1;
    let value = 0;
    
    for(let i = charList.length - 1; i >= 0; i--){
        if (/^\d$/.test(charList[i])) {
            position = i;
            value = charList[i];
            break;
        }
    }

    for (const key in strDigitMapper) {
        let tmp = phrase.lastIndexOf(key);
        
        if (tmp != -1 && tmp > position) {
            position = tmp;
            value = strDigitMapper[key];
        }
    }

    return value;
}

input.split(/\r?\n/).forEach(line =>  {   
    let strNum = '' + getFirstDigit(line) + getLastDigit(line);
    sum += Number(strNum);
});



console.log(sum);