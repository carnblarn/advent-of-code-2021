import { getStringsInput } from './helpers';

const list = getStringsInput('day3');

const length = list[0].length;
let gamma = '';

// iterating over the position in each string
for (let i = 0; i < length; i++) {
    // going through the entire list for that position
    let numOnes = list.reduce(
        (prev, curr) => (curr[i] === '1' ? prev + 1 : prev),
        0
    );

    // the number of zeroes is the length of the list minus the number of ones
    if (numOnes > list.length / 2) {
        gamma = gamma.concat('1');
    } else {
        gamma = gamma.concat('0');
    }
}

const convertBinaryToDecimal = (binary: string) => {
    return parseInt(binary, 2);
};

// epsilon is the inverse of gamma
const epsilon = gamma
    .split('')
    .map((item) => (item === '1' ? '0' : '1'))
    .join('');

// part 1
console.log(convertBinaryToDecimal(gamma) * convertBinaryToDecimal(epsilon));

let oxygenList = [...list];

// iterating over the position in each string
// to determine the oxygen rating
for (let i = 0; i < length; i++) {
    // going through the entire list for that position
    let numOnes = oxygenList.reduce(
        (prev, curr) => (curr[i] === '1' ? prev + 1 : prev),
        0
    );

    const majorityDigit = numOnes >= oxygenList.length / 2 ? '1' : '0';
    // filting the list so only elments that have the majoriy digit in the ith position are kept
    oxygenList = oxygenList.filter((item) => item[i] === majorityDigit);
    if (oxygenList.length === 1) {
        break;
    }
}

let co2List = [...list];

for (let i = 0; i < length; i++) {
    // going through the entire list for that position
    let numOnes = co2List.reduce(
        (prev, curr) => (curr[i] === '1' ? prev + 1 : prev),
        0
    );

    const majorityDigit = numOnes >= co2List.length / 2 ? '0' : '1';
    // filting the list so only elments that have the minority digit in the ith position are kept
    co2List = co2List.filter((item) => item[i] === majorityDigit);
    if (co2List.length === 1) {
        break;
    }
}

console.log(
    convertBinaryToDecimal(oxygenList[0]) * convertBinaryToDecimal(co2List[0])
);
