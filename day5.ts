import { getRawInput } from './helpers';

const list = getRawInput('day5');

type Coordinate = {
    x: number;
    y: number;
};

// input of shape 482,709
const convertPairToCoordinate = (str: string) => {
    const split = str.split(',');
    const x = parseInt(split[0]);
    const y = parseInt(split[1]);

    return {
        x,
        y,
    };
};

const convertCoordinateToString = (coord: Coordinate) => {
    return `${coord.x},${coord.y}`;
};

// ex: 482,709 -> 704,931
const lines: { start: Coordinate; end: Coordinate }[] = list
    .split('\n')
    .map((item) => {
        const [start, end] = item.split(' -> ');

        return {
            start: convertPairToCoordinate(start),
            end: convertPairToCoordinate(end),
        };
    });

const grid: { [coordinate: string]: number } = {};

const findSlope = (start: number, end: number) => {
    if (start > end) {
        return -1;
    } else if (start < end) {
        return 1;
    } else {
        return 0;
    }
};

lines.forEach((line) => {
    // this handles horizontal, vertical, diagonal lines
    let currentX = line.start.x;
    let currentY = line.start.y;

    let horizontalSlope = findSlope(line.start.x, line.end.x);
    let verticalSlope = findSlope(line.start.y, line.end.y);

    while (currentX !== line.end.x || currentY !== line.end.y) {
        const key = convertCoordinateToString({ x: currentX, y: currentY });

        const existing = grid[key];
        if (existing) {
            grid[key] = existing + 1;
        } else {
            grid[key] = 1;
        }

        currentX = currentX + horizontalSlope;
        currentY = currentY + verticalSlope;
    }

    // adding in one more entry for the final point
    const key = convertCoordinateToString({ x: currentX, y: currentY });

    const existing = grid[key];
    if (existing) {
        grid[key] = existing + 1;
    } else {
        grid[key] = 1;
    }
});

let counter = 0;

Object.values(grid).forEach((value) => {
    if (value > 1) {
        counter += 1;
    }
});

console.log(counter);
