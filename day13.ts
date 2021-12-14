import { getRawInput } from './helpers';

const [coordStrings, instructionsStrings] = getRawInput('day13').split('\n\n');

// For a set of dots on a piece of paper
// figure out how they would be visible after folding the paper along the axes

let dots = coordStrings
    .split('\n')
    .map((coord) => coord.split(',').map((i) => parseInt(i)));

const instructions = instructionsStrings.split('\n');

// the instructions never actually say what the height/width are set as
let height = Math.max(...dots.map((i) => i[1])) + 1;
let width = Math.max(...dots.map((i) => i[0])) + 1;

function printGrid(dots: number[][], height: number, width: number) {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const dot = dots.find((dot) => dot[0] === j && dot[1] === i);
            if (dot) {
                process.stdout.write('#');
            } else {
                process.stdout.write('.');
            }
        }
        console.log();
    }
}

for (let i = 0; i < instructions.length; i++) {
    const [axis, valueString] = instructions[i]
        .replace('fold along ', '')
        .split('=');
    const value = parseInt(valueString);
    const newDots: number[][] = [];

    dots.forEach((dot) => {
        const [x, y] = dot;
        let nextDot: number[];
        if (axis === 'x') {
            if (x < value) {
                nextDot = dot;
            } else {
                nextDot = [value - (x - value), y];
            }
        } else if (axis === 'y') {
            if (y < value) {
                nextDot = dot;
            } else {
                nextDot = [x, value - (y - value)];
            }
        }
        const exists = newDots.find(
            (dot) => dot[0] === nextDot[0] && dot[1] === nextDot[1]
        );
        if (!exists) {
            newDots.push(nextDot!);
        }
    });
    // the instructions don't say it, but the folding line is always down the center
    // which is why this works
    if (axis === 'x') {
        width = width - value - 1;
    } else if (axis === 'y') {
        height = height - value - 1;
    }
    console.log(instructions[i]);
    console.log('Part 1:', newDots.length);
    if (i === instructions.length - 1) {
        printGrid(newDots, height, width);
        console.log();
    }

    dots = newDots;
}
