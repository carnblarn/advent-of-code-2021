import { getStringsInput } from './helpers';

// For a given graph (through a cave) find the number of distinct paths

const list = getStringsInput('day12').map((item) => item.split('-'));

const graph: Record<string, string[]> = {};
// constructing the graph
for (let i = 0; i < list.length; i++) {
    const name = list[i][0];
    const dest = list[i][1];

    if (graph[name]) {
        graph[name].push(dest);
    } else {
        graph[name] = [dest];
    }

    if (graph[dest]) {
        graph[dest].push(name);
    } else {
        graph[dest] = [name];
    }
}

const allPaths: string[][] = [];

// Based on part 2, alreadySeen tracks how many time a small cave has been seen
function findPaths(
    currentPath: string[],
    alreadySeen: Record<string, number>,
    hasSeenSmallCaveTwice: boolean,
    allowedSmallCaveVisits: number
) {
    const current = currentPath[currentPath.length - 1];
    if (hasSeenSmallCaveTwice && alreadySeen[current] === 1) {
        return;
    } else if (alreadySeen[current] === allowedSmallCaveVisits) {
        return;
    }

    // lowercase caves can only been seen once (in part 1), uppercase as many times as possible
    // it's not stated but this also means the test data does not have cycles
    // to worry about
    const isLowercase = current === current.toLowerCase();
    const nextNodes = graph[current];
    if (current === 'end') {
        allPaths.push(currentPath);
        return;
    }

    for (let i = 0; i < nextNodes.length; i++) {
        const nextNode = nextNodes[i];
        if (nextNode === 'start') {
            continue;
        }
        findPaths(
            [...currentPath, nextNode],
            isLowercase
                ? {
                      ...alreadySeen,
                      [current]: alreadySeen[current]
                          ? alreadySeen[current] + 1
                          : 1,
                  }
                : alreadySeen,
            hasSeenSmallCaveTwice || alreadySeen[current] === 1,
            allowedSmallCaveVisits
        );
    }
    return;
}
// findPaths(['start'], {}, 1);
findPaths(['start'], {}, false, 2);

console.log('Part 2:', allPaths.length);
