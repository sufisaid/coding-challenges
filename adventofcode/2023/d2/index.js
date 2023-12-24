const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const colors = {"red": 12, "green": 13, "blue": 14}
let sum = 0;

const prepareGameData = (values) => {
    const rounds = values.split(";");

    rounds.forEach((r, i) => {
        rounds[i] = r.split(",");
        rounds[i].forEach((p, j) => rounds[i][j] = p.trim());
    })

    return rounds;
}

const isGamePossible = (values) => {
    const data = prepareGameData(values);
    
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            [count, color] = data[i][j].split(" ");

            if (colors[color] < count) {
                return false;
            }
        }
    }
    return true;
}

const calculateGamePower = (values) => {
    const data = prepareGameData(values);
    const colors = {"red": 1, "green": 1, "blue": 1};
    
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            [count, color] = data[i][j].split(" ");
            count = Number(count);

            if (colors[color] < count) {
                colors[color] = count;
            }
        }
    }
    let result = colors["red"] * colors["green"] * colors["blue"];
    console.log(colors["red"], "*", colors["green"], "*",colors["blue"], "=", result );
    return result;
}

input.split(/\r?\n/).forEach(line =>  {
    console.log(line);
    [gamePart, ballsPart] = line.split(":");
    gameIndex = Number(gamePart.replace("Game ", ""));

    // part 2
    sum += calculateGamePower(ballsPart);
    
    // part 1
    /*if (isGamePossible(ballsPart)) {
        sum += gameIndex;
    }*/
});

console.log(sum)