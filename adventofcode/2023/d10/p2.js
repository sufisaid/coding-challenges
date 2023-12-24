const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./input.txt", "utf-8");
let startTime = Date.now();

const maze = [];
let start = [];

const directionPipe = {
    "N": ["7", "F", "|"],
    "S": ["L", "J", "|"],
    "E": ["J", "7", "-"],
    "W": ["L", "F", "-"]
}

const pipeDirection = {
    "|": ["N", "S"],
    "-": ["E", "W"],
    "L": ["N", "E"],
    "J": ["N", "W"],
    "7": ["W", "S"],
    "F": ["S", "E"]
}

input.split(/\r?\n/).forEach(line => {
    if (line.indexOf("S") !== -1) {
        start[0] = maze.length;
        start[1] = line.indexOf("S");
    }

    maze.push(line.split(""));
});

const calculateCameFrom = (previous, current) => {
    let eastWest = previous[1] - current[1];
    let northSouth = previous[0] - current[0];    

    if (eastWest != 0) {
        return (eastWest > 0) ? "E" : "W";
    }
    
    return (northSouth > 0) ? "S" : "N";
}

const goToCoordinates = (position, direction) => {
    switch (direction) {
        case "N":
            return [position[0] - 1, position[1]];
        case "S":
            return [position[0] + 1, position[1]];
        case "E":
            return [position[0], position[1] + 1];
        case "W":
            return [position[0], position[1] - 1];
    }
}

const goToDirection = (pipe, cameFrom) => {
    return pipeDirection[pipe].filter(e => e !== cameFrom)[0];
}

const traverseMaze = (previous, current) => {
    let currentPipe = maze[current[0]][current[1]];
    let cameFrom = calculateCameFrom(previous, current);
    
    if (currentPipe == undefined || currentPipe == ".") {
        steps = 0;
        return false;
    }

    if (currentPipe == "S") {
        steps++;
        return true;
    }

    if (pipeDirection[currentPipe].includes(cameFrom) == false) {
        steps = 0;
        return false;
    }
    
    let nextDirection = goToDirection(currentPipe, cameFrom);
    let nextCoordinates = goToCoordinates(current, nextDirection);
    
    steps++

    return {current, nextCoordinates};
    //traverseMaze(current, nextCoordinates);
}

let steps = 0;

const traverseRoute = (current, nextCoordinates) => {
    let parameters = traverseMaze(current, nextCoordinates);
    while(true) {
        if (parameters === false) {
            break;
        }

        if (parameters === true) {
            break;
        }

        parameters = traverseMaze(parameters.current, parameters.nextCoordinates);
    }
}

const traverseAllRoutes = () => {
    traverseRoute(start, [start[0], start[1] - 1]);
    console.log("Result:", Math.ceil(steps/2));

    steps = 0;
    traverseRoute(start, [start[0], start[1] + 1]);
    console.log("Result:", Math.ceil(steps/2));

    steps = 0;
    traverseRoute(start, [start[0] - 1, start[1]]);
    console.log("Result:", Math.ceil(steps/2));

    steps = 0;
    traverseRoute(start, [start[0] + 1, start[1]]);
    console.log("Result:", Math.ceil(steps/2));
}

traverseAllRoutes();

//console.log(maze)
console.log(Date.now() - startTime);