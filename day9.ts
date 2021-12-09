import { getStringsInput } from './helpers';

const list = getStringsInput('day9').map((row) =>
    row.split('').map((a) => parseInt(a))
);

const findAdjacent = ([i, j]: [number, number], list: number[][]) => {
    const adjacent = [
        i > 0 ? [i - 1, j] : undefined,
        i < list.length - 1 ? [i + 1, j] : undefined,
        j > 0 ? [i, j - 1] : undefined,
        j < list[i].length - 1 ? [i, j + 1] : undefined,
    ].filter((a) => a !== undefined) as [number, number][];
    return adjacent;
};

function findBasinSize(lowPoint: [number, number]) {
    let visited: [number, number][] = [];
    let toProcess: [number, number][] = [lowPoint];
    let nodesSeen = 0;

    while (toProcess.length !== 0) {
        const node = toProcess.shift()!;
        const alreadySeen = visited.find(
            (item) => item[0] === node[0] && item[1] === node[1]
        );
        if (alreadySeen) {
            continue;
        }
        visited.push(node);

        nodesSeen += 1;
        const adjacentNodes = findAdjacent(node, list);

        const adjacentBasinNodes = adjacentNodes.filter(
            (item) => list[item[0]][item[1]] !== 9
        );
        toProcess.push(...adjacentBasinNodes);
    }
    return nodesSeen;
}

let riskLevel = 0;
// alexa play Everybody Hurts by REM
const lowPoints: [number, number][] = [];
const basinSizes: number[] = [];

for (let i = 0; i < list.length; i++) {
    const row = list[i];

    for (let j = 0; j < row.length; j++) {
        const adjacent = findAdjacent([i, j], list);

        const current = row[j];

        const isLowPoint = adjacent.every(
            (item) => list[item[0]][item[1]] > current
        );

        if (isLowPoint) {
            riskLevel += 1 + current;
            basinSizes.push(findBasinSize([i, j]));
        }
    }
}

console.log('Part 1:', riskLevel);
const basinSizeProduct = basinSizes
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);

console.log('Part 2: ', basinSizeProduct);
