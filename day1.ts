import fs from 'fs';

const input = fs.readFileSync('day1input.txt', 'utf-8').split('\n');
const numList = input.map((item) => Number.parseInt(item));

let numIncreases = 0;

// a very unexciting solution
for (let i = 1; i < numList.length; i++) {
    if (numList[i] > numList[i - 1]) {
        numIncreases += 1;
    }
}

// part 1
console.log(numIncreases);

let part2Increases = 0;

// potential target for caching
for (let i = 3; i < numList.length; i++) {
    const prevSum = numList[i - 1] + numList[i - 2] + numList[i - 3];
    const currentSum = numList[i] + numList[i - 1] + numList[i - 2];
    if (currentSum > prevSum) {
        part2Increases += 1;
    }
}

// part 2
console.log(part2Increases);
