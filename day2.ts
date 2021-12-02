import { getStringsInput } from './helpers';

const list = getStringsInput('day2');

const day2Parsed = list.map<[string, number]>((item) => {
    const [direction, amount] = item.split(' ');
    return [direction, parseInt(amount)];
});

let depth = 0;
let position = 0;
let aim = 0;

day2Parsed.forEach(([direction, ammount]) => {
    if (direction === 'forward') {
        position += ammount;
    } else if (direction === 'down') {
        depth += ammount;
    } else if (direction === 'up') {
        depth -= ammount;
    }
});

// part 1
console.log(depth * position);

depth = 0;
position = 0;

day2Parsed.forEach(([direction, ammount]) => {
    if (direction === 'forward') {
        position += ammount;
        depth += aim * ammount;
    } else if (direction === 'down') {
        aim += ammount;
    } else if (direction === 'up') {
        aim -= ammount;
    }
});

// part 2
console.log(depth * position);
