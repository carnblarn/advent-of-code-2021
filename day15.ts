import FastPriorityQueue from 'fastpriorityqueue';
import { getStringsInput } from './helpers';

// For a very large grid of digits find the shortest path

const PART_2_GRID = true;

type Node = {
    risk: number;
    id: string;
};

const queue = new FastPriorityQueue<Node>((a, b) => {
    return a.risk < b.risk;
});

let grid = getStringsInput('day15').map((item) =>
    item.split('').map((i) => parseInt(i))
);

const addNumberToRow = (num: number, row: number[]) => {
    let newRow = [];
    for (let i = 0; i < row.length; i++) {
        const newVal = ((row[i] + num - 1) % 9) + 1;
        newRow.push(newVal);
    }
    return newRow;
};

if (PART_2_GRID) {
    let newGrid: number[][] = [];
    // this is horizontally extending the grid 4 more spaces
    for (let gridRow = 0; gridRow < grid.length; gridRow++) {
        // i is the columns in this case
        const newRow = [];
        for (let i = 0; i < 5; i++) {
            newRow.push(...addNumberToRow(i, grid[gridRow]));
            // newGrid.push(grid[gridRow]);
        }
        newGrid.push(newRow);
    }

    // this loop order inversion is very confusing
    for (let i = 1; i < 5; i++) {
        for (let j = 0; j < grid.length; j++) {
            newGrid.push(addNumberToRow(i, newGrid[j]));
        }
    }

    grid = newGrid;
}

// console.log(grid.map((row) => row.join('')).join('\n'));

const coordsToString = (x: number, y: number) => {
    return [x, y].join(',');
};

const findLowestRiskNode = (
    // riskLevels: Record<string, number>,
    processed: Record<string, boolean>
): Node | undefined => {
    return queue.poll();
};

const getNextNodes = (
    x: number,
    y: number,
    processed: Record<string, boolean>
) => {
    const adjacent = [
        x > 0 ? [x - 1, y] : undefined,
        x < grid.length - 1 ? [x + 1, y] : undefined,
        y > 0 ? [x, y - 1] : undefined,
        y < grid[x].length - 1 ? [x, y + 1] : undefined,
    ].filter(
        (a) => a !== undefined && !processed[coordsToString(a[0], a[1])]
    ) as [number, number][];
    return adjacent;
};

const processed: Record<string, boolean> = { '0,0': true };
const riskLevels: Record<string, number> = {};
const stringCoordsMap: Record<string, [number, number]> = {};

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        const id = coordsToString(j, i);
        riskLevels[id] = Number.MAX_SAFE_INTEGER;
        queue.add({ id, risk: Number.MAX_SAFE_INTEGER });
        stringCoordsMap[id] = [j, i];
    }
}

const stringToCoords = (str: string) => {
    return stringCoordsMap[str];
};

riskLevels['0,0'] = 0;

let neighbors = getNextNodes(0, 0, processed);

neighbors.forEach((neighbor) => {
    const str = neighbor[0] + ',' + neighbor[1];
    riskLevels[str] = grid[neighbor[1]][neighbor[0]];
    queue.add({
        id: str,
        risk: grid[neighbor[1]][neighbor[0]],
    });
});

let lowestRiskNode = findLowestRiskNode(processed);

let allowedSteps = 0;

const finalCoords = coordsToString(grid[0].length - 1, grid.length - 1);

// Yes this is djikstra's algorithm
// due to my rustiness it might be hard to tell
while (lowestRiskNode) {
    const coords = stringToCoords(lowestRiskNode.id);
    const risk = lowestRiskNode.risk;
    const neighbors = getNextNodes(coords[0], coords[1], processed);

    neighbors.forEach((neighbor) => {
        const neighborString = coordsToString(...neighbor);

        const newRisk = risk + grid[neighbor[1]][neighbor[0]];
        const existingRisk = riskLevels[neighborString];

        if (newRisk < existingRisk) {
            riskLevels[neighborString] = newRisk;
            queue.removeOne(({ id }) => id === neighborString);
            queue.add({ id: neighborString, risk: newRisk });
        }
    });
    processed[lowestRiskNode.id] = true;
    // we dont need to calculate all the distances
    if (lowestRiskNode.id === finalCoords) {
        break;
    }

    lowestRiskNode = findLowestRiskNode(processed);
    allowedSteps += 1;
    if (allowedSteps % 1000 === 0) {
        queue.trim();
        console.log(
            Object.keys(processed).length / (grid.length * grid[0].length)
        );

        // console.log(allowedSteps);
    }
}

console.log('Part 1', riskLevels[finalCoords]);
