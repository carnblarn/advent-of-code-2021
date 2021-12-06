import { getRawInput } from './helpers';

const list: number[] = getRawInput('day6')
    .split(',')
    .map((item) => parseInt(item));

const part1List = [...list];

for (let i = 0; i < 80; i++) {
    // freezing it at initial length because newly created fish don't tick down (summoning sickness)
    const initialLength = part1List.length;
    for (let j = 0; j < initialLength; j++) {
        if (part1List[j] === 0) {
            part1List[j] = 6;
            part1List.push(8);
        } else {
            part1List[j] = part1List[j] - 1;
        }
    }
}

// part 1
console.log('Part 1:', part1List.length);

let collection: { [key: string]: number } = {};

list.forEach((item) => {
    collection[item] = collection[item] ? collection[item] + 1 : 1;
});

for (let i = 0; i < 256; i++) {
    const newCollection: { [key: string]: number } = {};
    Object.entries(collection).map(([key, value]) => {
        // keys cannot be numbers; this might hurt the performance quite a bit
        const number = parseInt(key);

        if (number === 0) {
            newCollection[6] = value;
            newCollection[8] = value;
        } else {
            // there are two ways to reach 6, from resetting and from ticking down from 7
            // so they need to be combined
            newCollection[number - 1] = newCollection[number - 1]
                ? newCollection[number - 1] + value
                : value;
        }
    });
    collection = newCollection;
}

const sum = Object.values(collection).reduce((prev, curr) => prev + curr, 0);

console.log('Part 2:', sum);
