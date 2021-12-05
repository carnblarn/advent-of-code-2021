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

const max = () => {};

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

lines.forEach((line) => {
    // a horizontal line
    if (line.start.y === line.end.y) {
        const start = line.start.x > line.end.x ? line.end : line.start;
        const end = line.start.x > line.end.x ? line.start : line.end;

        for (let i = start.x; i <= end.x; i++) {
            const key = convertCoordinateToString({ x: i, y: line.start.y });
            const existing = grid[key];
            if (existing) {
                grid[key] = existing + 1;
            } else {
                grid[key] = 1;
            }
        }
    }
    // a vertical line
    // there are diagonals!
    else if (line.start.x === line.end.x) {
        const start = line.start.y > line.end.y ? line.end : line.start;
        const end = line.start.y > line.end.y ? line.start : line.end;

        for (let i = start.y; i <= end.y; i++) {
            const key = convertCoordinateToString({ x: line.start.x, y: i });

            const existing = grid[key];
            if (existing) {
                grid[key] = existing + 1;
            } else {
                grid[key] = 1;
            }
        }
    }
    // comment out this section to get the answer to part 1
    // diagononal lines
    // realizing now that every type of line could be handled by this case
    else {
        let currentX = line.start.x;
        let currentY = line.start.y;

        let horizontalDirection = line.start.x < line.end.x ? 'right' : 'left';
        let verticalDirection = line.start.y < line.end.y ? 'down' : 'up';

        while (currentX !== line.end.x) {
            const key = convertCoordinateToString({ x: currentX, y: currentY });

            const existing = grid[key];
            if (existing) {
                grid[key] = existing + 1;
            } else {
                grid[key] = 1;
            }

            currentX =
                horizontalDirection === 'right' ? currentX + 1 : currentX - 1;
            currentY =
                verticalDirection === 'down' ? currentY + 1 : currentY - 1;
        }

        const key = convertCoordinateToString({ x: currentX, y: currentY });

        const existing = grid[key];
        if (existing) {
            grid[key] = existing + 1;
        } else {
            grid[key] = 1;
        }
    }
});

let counter = 0;

Object.values(grid).forEach((value) => {
    if (value > 1) {
        counter += 1;
    }
});

console.log(grid);

console.log(counter);
