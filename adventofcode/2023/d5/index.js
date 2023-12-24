const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync("./ned-input.txt", "utf-8");
let start = Date.now();
const elements = {
    "seeds": [],
};

const categories = {
    "seed-soil":            "seed-to-soil map:",
    "soil-fertilizer":      "soil-to-fertilizer map:",
    "fertilizer-water":     "fertilizer-to-water map:",
    "water-light":          "water-to-light map:",
    "light-temperature":    "light-to-temperature map:",
    "temperature-humidity": "temperature-to-humidity map:",
    "humidity-location":    "humidity-to-location map:",
}

const extractSeedPairs = (line) => {
    return line.split("seeds: ")[1]
                .match(/\d+/g)
                .map(n => Number(n));
}

const getDestination = (category, source) => {
    let destination = source;
    //console.log(category, source)

    for(let i = 0; i < category.length; i++) {
        let destStart = category[i][0];
        //let destEnd = destStart + category[i][2] - 1;
        let srcStart = category[i][1];
        let srcEnd = srcStart + category[i][2] - 1;

        if (source >= srcStart && source <= srcEnd) {
            //console.log(source, ">=", srcStart, "&&", source, "<=", srcEnd)
            //console.log(source, "inside", category[i])
            destination = source - srcStart + destStart;
            //console.log(destination);
            break;
        }
    }

    return destination;
}

let lineNum = 0;
input.split(/\r?\n\r?\n/).forEach(line =>  {
    if (lineNum === 0) {
        elements.seeds = extractSeedPairs(line);
    }

    lineNum++;

    if (lineNum > 1) {
        let categoryLines = line.split(/\r?\n/);
        elements[categoryLines[0]] = [];
        
        for(let i = 1; i < categoryLines.length; i++) {
            let numbers = categoryLines[i]
                .match(/\d+/g)
                .map(n => Number(n));
            elements[categoryLines[0]].push(numbers);
        }    
    }
});

const combinations = [];
let minLocation;


const calculateElements = (seed) => {
    let soil        = getDestination(elements[categories["seed-soil"]], seed);
    let fertilizer  = getDestination(elements[categories["soil-fertilizer"]], soil);    
    let water       = getDestination(elements[categories["fertilizer-water"]], fertilizer);
    let light       = getDestination(elements[categories["water-light"]], water);
    let temperature = getDestination(elements[categories["light-temperature"]], light);
    let humidity    = getDestination(elements[categories["temperature-humidity"]], temperature);
    let location    = getDestination(elements[categories["humidity-location"]], humidity);

    if (minLocation === undefined) {
        minLocation = location;
    }

    if (location < minLocation) {
        minLocation = location;
    }

    //combinations.push([seed,soil,fertilizer,water,light,temperature,humidity,location]);
}

const generateSeeds = (initialSeeds) => {
    for(let i = 0; i < initialSeeds.length; i++) {
        let startSeed = initialSeeds[2*i];
        let endSeed = initialSeeds[2*i+1];

        for(let j = startSeed; j < startSeed + endSeed; j++) {
            calculateElements(j);
        }
    }
}

generateSeeds(elements.seeds)



//console.log(combinations)
console.log(minLocation);

console.log(Date.now() - start)


