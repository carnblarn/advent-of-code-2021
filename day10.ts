import { getStringsInput } from './helpers';

const list = getStringsInput('day10');

// From a file of 4 pairing symbols parse out syntax errors

const scoreTable: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const otherScoreTable: Record<string, number> = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

// remove all the adjacent pairs until there are none remaining
const reduceLine = (line: string) => {
    let lineTemp = line;
    let lastLength = lineTemp.length;
    while (lineTemp.length > 0) {
        lineTemp = lineTemp.replace('()', '');
        lineTemp = lineTemp.replace('<>', '');
        lineTemp = lineTemp.replace('{}', '');
        lineTemp = lineTemp.replace('[]', '');

        if (lineTemp.length === lastLength) {
            break;
        } else {
            lastLength = lineTemp.length;
        }
    }
    return lineTemp;
};

const findIncorrectCharacter = (row: string) => {
    const reducedLine = reduceLine(row);
    for (let i = 0; i < reducedLine.length - 1; i++) {
        if (']}>)'.split('').includes(reducedLine[i + 1])) {
            return reducedLine[i + 1];
        }
    }
    return false;
};

const inverse: Record<string, string> = {
    '<': '>',
    '(': ')',
    '[': ']',
    '{': '}',
};

const findMissingSymbols = (row: string) => {
    const reducedLine = reduceLine(row);
    const missingChars = [];
    for (let i = reducedLine.length - 1; i >= 0; i--) {
        missingChars.push(inverse[reducedLine[i]]);
    }
    return missingChars;
};

let part1Sum = 0;
// the scoring system here sure is odd
let part2Scores: number[] = [];

list.forEach((row) => {
    const wrongChar = findIncorrectCharacter(row);
    if (wrongChar) {
        part1Sum = part1Sum + scoreTable[wrongChar];
    } else {
        const chars = findMissingSymbols(row);
        part2Scores.push(
            chars.reduce((prev, curr) => prev * 5 + otherScoreTable[curr], 0)
        );
    }
});

const part2Answer = part2Scores.sort((a, b) => (a > b ? 1 : -1))[
    Math.floor(part2Scores.length / 2)
];

console.log('Part 1:', part1Sum);
console.log('Part 2:', part2Answer);
