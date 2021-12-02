import { getStringsInput } from './helpers';

const list = getStringsInput('day2');

let depth = 0;
let position = 0;

list.forEach((item) => {
    const [direction, amountString] = item.split(' ');
    const parsedAmount = parseInt(amountString);
    if (direction === 'forward') {
        position += parsedAmount;
    } else if (direction === 'down') {
        depth += parsedAmount;
    } else if (direction === 'up') {
        depth -= parsedAmount;
    }
});

// part 1
console.log(depth * position);

depth = 0;
position = 0;
let aim = 0;

list.forEach((item) => {
    const [direction, amountString] = item.split(' ');
    const parsedAmount = parseInt(amountString);
    if (direction === 'forward') {
        position += parsedAmount;
        depth += aim * parsedAmount;
    } else if (direction === 'down') {
        aim += parsedAmount;
    } else if (direction === 'up') {
        aim -= parsedAmount;
    }
});

// part 2
console.log(depth * position);
