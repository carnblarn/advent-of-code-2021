import { getStringsInput } from './helpers';

const list = getStringsInput('day11').map((row) =>
    row.split('').map((item) => parseInt(item))
);

const height = list.length;
const width = list[0].length;

const getAdjacents = (i: number, j: number) => {
    return [
        i > 0 && j > 0 ? [i - 1, j - 1] : undefined,
        i > 0 ? [i - 1, j] : undefined,
        i > 0 && j < width - 1 ? [i - 1, j + 1] : undefined,
        j > 0 ? [i, j - 1] : undefined,
        j < width - 1 ? [i, j + 1] : undefined,
        i < height - 1 && j > 0 ? [i + 1, j - 1] : undefined,
        i < height - 1 ? [i + 1, j] : undefined,
        i < height - 1 && j < width - 1 ? [i + 1, j + 1] : undefined,
    ].filter((item) => item !== undefined) as [number, number][];
};

// A grid of octopi that increase in energy and flash when it gets to 10

let flashCount = 0;

for (let step = 0; step < 500; step++) {
    let flashCountForStep = 0;

    for (let i = 0; i < list.length; i++) {
        const row = list[i];

        for (let j = 0; j < row.length; j++) {
            list[i][j] += 1;
        }
    }

    for (let i = 0; i < list.length; i++) {
        const row = list[i];

        for (let j = 0; j < row.length; j++) {
            if (list[i][j] > 9) {
                flashCountForStep += 1;

                if (step < 100) {
                    flashCount += 1;
                }
                list[i][j] = 0;
                let adjacents = getAdjacents(i, j);
                while (adjacents.length > 0) {
                    const adjacent = adjacents.shift()!;
                    const value = list[adjacent[0]][adjacent[1]];
                    if (value !== 0) {
                        list[adjacent[0]][adjacent[1]] += 1;
                    }
                    if (list[adjacent[0]][adjacent[1]] > 9) {
                        flashCountForStep += 1;

                        if (step < 100) {
                            flashCount += 1;
                        }
                        list[adjacent[0]][adjacent[1]] = 0;
                        adjacents.push(
                            ...getAdjacents(adjacent[0], adjacent[1])
                        );
                    }
                }
            }
        }
    }
    if (flashCountForStep === 100) {
        console.log('Part 2:', step + 1);

        step = Number.MAX_VALUE;
    }
}

console.log('Part 1:', flashCount);
