import fs from 'fs';

type Day = `day${number}`;

const readFile = (day: Day) => {
    return fs.readFileSync(`${day}input.txt`, 'utf-8').split('\n');
};

export const getNumsInput = (day: Day) => {
    return readFile(day).map((item) => Number.parseInt(item));
};

export const getStringsInput = (day: Day) => {
    return readFile(day);
};
