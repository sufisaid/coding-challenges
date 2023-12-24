const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");

let games = [];
let sum = 0;

input.split(/\r?\n/).forEach(line =>  {
    games.push(line);
});

const getWinNumbers = (card) => {
    [cardName, nums] = card.split(":");
    [cardNums, myNums] = nums.split("|");

    cardNums = cardNums.match(/\d+/g);
    myNums = myNums.match(/\d+/g);

    let countScore = 0;

    myNums.forEach(myN => {
        if(cardNums.includes(myN)) {
            countScore++;
        }
    })

    // part 1
    /*if (countScore) {
        sum += 2 ** (countScore - 1);
    }*/

    // part 2
    return countScore;
}

const processCards = (card, index, original) => {
    let winNumCount = getWinNumbers(card); 

    if (original) {
        sum += 1;
    }

    if (winNumCount > 0) {
        sum += winNumCount;

        for(let i = index + 1; i < index + 1 + winNumCount; i++) {
            if (games[i]) {
                processCards(games[i], i, false);
            }
        }
    }

    return false;
}

for (let i = 0; i < games.length; i++) {
    processCards(games[i], i, true);
}

console.log(sum);


