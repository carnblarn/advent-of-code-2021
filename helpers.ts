import fs from 'fs';

type Day = `day${number}`;

const readFile = (day: Day) => {
    return fs.readFileSync(`${day}input.txt`, 'utf-8');
};

export const getNumsInput = (day: Day) => {
    return readFile(day)
        .split('\n')
        .map((item) => Number.parseInt(item));
};

export const getStringsInput = (day: Day) => {
    return readFile(day).split('\n');
};

export const getRawInput = (day: Day) => {
    return readFile(day);
};
