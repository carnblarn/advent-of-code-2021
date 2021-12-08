import { getRawInput } from './helpers';

const list: number[] = getRawInput('day7')
    .split(',')
    .map((a) => parseInt(a));

let min = Number.MAX_SAFE_INTEGER;

// the outer loop is the position they all move to
for (let i = 0; i < list.length; i++) {
    let totalCost = 0;
    // the inner loop is how expensive for each one to move to that position
    for (let j = 0; j < list.length; j++) {
        totalCost += Math.abs(list[j] - i);
    }
    if (totalCost < min) {
        min = totalCost;
    }
}

console.log('Part 1:', min);

let part2Min = Number.MAX_SAFE_INTEGER;
// 1 - 1
// 2 - 3
// 3 - 6
// 4 - 10

// the outer loop is the position they all move to
for (let i = 0; i < list.length; i++) {
    let totalCost = 0;
    // the inner loop is how expensive for each one to move to that position
    for (let j = 0; j < list.length; j++) {
        const distance = Math.abs(list[j] - i);

        totalCost += (distance * (distance + 1)) / 2;
    }
    if (totalCost < part2Min) {
        part2Min = totalCost;
    }
}

console.log('Part 2:', part2Min);
