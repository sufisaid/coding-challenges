const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");
let start = Date.now();

const handTypes = {
    "_11111": [],
    "_2111": [],    
    "_221": [],
    "_311": [],
    "_32": [],
    "_41": [],
    "_5": [],
}

const cardValue = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "J": 1,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const getType = (cards) => {
    const countCards = {};
    let countJ = 0;

    for(let card of cards.split("")) {
        if (card != "J") {
            countCards[card] = countCards[card] ? countCards[card] + 1 : 1;
        } else {
            countJ++
        }        
    }

    let sortedValues = Object.values(countCards).sort((a, b) => b - a);

    if (countJ) {
        if (sortedValues[0]) {
            sortedValues[0] += countJ;
        } else {
            sortedValues[0] = countJ;
        }
    }
    
    return "_" + sortedValues.join("");
}

input.split(/\r?\n/).forEach(line =>  {
    [cards, bid] = line.split(" ");
    let hand = {cards: cards, bid: bid};

    let type = getType(hand.cards);

    //console.log(hand.cards, type);
    
    handTypes[type].push(hand);    
});

const sortHandType = (a, b) => {
    let cardsA = a.cards,
        cardsB = b.cards
    
    for(let i = 0; i < 5; i++) {
        if (cardsA[i] != cardsB[i]) {
            return cardValue[cardsA[i]] - cardValue[cardsB[i]];
        }
    }
}

let sum = 0;
let count = 1;

for (let hand in handTypes) {
    handTypes[hand] = handTypes[hand].sort(sortHandType);
}

for (let hand in handTypes) {
    handTypes[hand].forEach(h => {
        sum += h.bid * count;
        count++
    })
}

console.log("Result:", sum);

console.log(Date.now() - start)


