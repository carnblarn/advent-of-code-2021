import { getStringsInput } from './helpers';

const list = getStringsInput('day8').map((item) => item.split(' | '));

const counts = {
    1: 0,
    4: 0,
    7: 0,
    8: 0,
};

for (let i = 0; i < list.length; i++) {
    const nums = list[i][1].split(' ');

    for (let j = 0; j < nums.length; j++) {
        const number = nums[j];
        if (number.length === 2) {
            counts[1] += 1;
        } else if (number.length === 4) {
            counts[4] += 1;
        } else if (number.length === 3) {
            counts[7] += 1;
        } else if (number.length === 7) {
            counts[8] += 1;
        }
    }
}
// what each segment refers to in the array
//  0000
// 1    2
// 1    2
//  3333
// 4    5
// 4    5
//  6666

const sum = Object.values(counts).reduce((a, b) => a + b, 0);

console.log('Part 1:', sum);

const getLettersForNumLength = (arr: string[], length: number) => {
    return arr.find((num) => num.length === length)!.split('');
};

const getNumbersOfLength = (arr: string[], length: number) => {
    return arr.filter((num) => num.length === length)!;
};

const segmentsToNumber = {
    ['012456']: 0,
    ['25']: 1,
    ['02346']: 2,
    ['02356']: 3,
    ['1235']: 4,
    ['01356']: 5,
    ['013456']: 6,
    ['025']: 7,
    ['0123456']: 8,
    ['012356']: 9,
} as const;

let part2Sum = 0;
// elements with 5 segements: 2, 3, 5
// elements with 6 segments: 0, 6, 9
// this is an extremely specific solution
for (let i = 0; i < list.length; i++) {
    // a tally of all segements that have been narrowed down to one letter
    const identified: Record<string, string> = {};
    const nums = list[i][0].split(' ');

    const oneLetters = getLettersForNumLength(nums, 2);

    const fourLetters = getLettersForNumLength(nums, 4);

    // The top of the number (the 0th place) can be determined by identifying the letter
    // in the 3 digit number (7) that's not in the 2 digit number (1)
    let sevenLetters = getLettersForNumLength(nums, 3);

    sevenLetters = sevenLetters.filter((val) => !oneLetters.includes(val));
    identified[0] = sevenLetters[0];

    const fiveLetterNumbers = getNumbersOfLength(nums, 5);

    // three is the only five segement number that includes all the same segements as 1
    const threeLetters = fiveLetterNumbers
        .find((num) => oneLetters.every((item) => num.includes(item)))!
        .split('');

    // the first segment is the segement in the four letters that is not in the three letters
    const firstSegmentLetter = fourLetters.find(
        (letter) => !threeLetters.includes(letter)
    )!;
    identified[1] = firstSegmentLetter;

    // the third segement is the segment in the four letters that is not in one letters
    // or in the now-discovered first segement
    const thirdSegementLetter = fourLetters.find(
        (letter) => ![...oneLetters, firstSegmentLetter].includes(letter)
    )!;

    identified[3] = thirdSegementLetter;

    // the sixth segment is the segment in the three letters that is not in the four letters
    // or in the 0th segement
    const sixthSegmentLetter = threeLetters.find(
        (letter) => ![identified[0], ...fourLetters].includes(letter)
    )!;

    identified[6] = sixthSegmentLetter;

    // five is the only five letter number that has the first segment
    const fiveLetters = fiveLetterNumbers
        .find((num) =>
            num.split('').find((letter) => letter === identified[1])
        )!
        .split('');

    // the second segment is the segement in three letters that is not in the five letters
    const secondSegmentLetter = threeLetters.find(
        (letter) => !fiveLetters.includes(letter)
    )!;

    identified[2] = secondSegmentLetter;

    // the fifth segment is in one letters and isn't the second segement
    const fifthSegmentLetter = oneLetters.find(
        (letter) => letter !== secondSegmentLetter
    )!;
    identified[5] = fifthSegmentLetter;

    // and the fourth segment is the remaining one
    identified[4] = 'abcdefg'
        .split('')
        .find((letter) => !Object.values(identified).includes(letter))!;

    // this is the mapping of the letter combinations to the number they represent for this line
    const codebook: Record<string, number> = {};
    Object.entries(segmentsToNumber).forEach(([key, value]) => {
        const codeKey = key
            .split('')
            .map((number) => identified[number])
            .sort()
            .join('');

        codebook[codeKey] = value;
    });

    // Now to find the numeric values for the output
    const outputNumbers = list[i][1].split(' ');

    let outputFinal = '';
    for (let j = 0; j < outputNumbers.length; j++) {
        const letters = outputNumbers[j].split('');
        const number = codebook[letters.sort().join('')];
        outputFinal += '' + number;
    }

    part2Sum += parseInt(outputFinal);
}

console.log('Part 2:', part2Sum);
