import { getRawInput } from './helpers';

let [templateOriginal, rulesStrings] = getRawInput('day14').split('\n\n');

// For a given template string a list of character insertion rules
// perform those rules simultaneously

const rules = rulesStrings.split('\n').map((item) => item.split(' -> '));

const findDifferenceOfCounts = (counts: Record<string, number>) => {
    const countsArray = Object.entries(counts);
    countsArray.sort((a, b) => (a[1] > b[1] ? -1 : 1));
    return countsArray[0][1] - countsArray[countsArray.length - 1][1];
};

// this is what one could call the problem-mirroring approach
const part1 = (steps: number) => {
    // this template rules
    const templateRules = (steps: number) => {
        let template = templateOriginal.slice();
        for (let i = 0; i < steps; i++) {
            const transformingRules: Record<string, string> = {};
            for (let j = 0; j < rules.length; j++) {
                const [location, value] = rules[j];
                const newValue = value;
                // regex will consume the match so this is important to allow for overlap
                // so that there are two matches for 'BBB' for 'BB' for example
                const matches = template.matchAll(
                    new RegExp(`(?=${location})`, 'g')
                );
                // matchAll has such a strange syntax
                for (let match of matches) {
                    // gotta watch out for 0
                    if (match.index !== undefined) {
                        transformingRules[match.index] = newValue;
                    }
                }
            }

            let newTemplate = '';
            for (let j = 0; j < template.length; j++) {
                const match = transformingRules[j];
                newTemplate += match ? template[j] + match : template[j];
            }

            template = newTemplate;
        }
        return template;
    };

    const part1Template = templateRules(steps);
    const pairs: Record<string, number> = {};

    for (let i = 0; i < part1Template.length - 1; i++) {
        const pairName = part1Template[i] + part1Template[i + 1];
        pairs[pairName] = pairs[pairName] ? pairs[pairName] + 1 : 1;
    }

    const counts = part1Template
        .split('')
        .reduce<Record<string, number>>((prev, curr) => {
            if (prev[curr]) {
                prev[curr] += 1;
            } else {
                prev[curr] = 1;
            }
            return prev;
        }, {});
    console.log(counts, 'Part 1');

    return findDifferenceOfCounts(counts);
};

// this solution is more pErForMaNT
const part2 = (steps: number) => {
    let template = templateOriginal.slice();

    let pairs: Record<string, number> = {};
    for (let i = 0; i < template.length - 1; i++) {
        const pairName = template[i] + template[i + 1];
        pairs[pairName] = pairs[pairName] ? pairs[pairName] + 1 : 1;
    }

    for (let i = 0; i < steps; i++) {
        const newPairs: Record<string, number> = {};

        Object.entries(pairs).forEach(([pairName, count]) => {
            // finding the rule that matches this pair name
            const rule = rules.find((item) => item[0] === pairName);

            if (rule) {
                // these tuples are really confusing me
                const newFirstPair = pairName[0] + rule[1];
                const newSecondPair = rule[1] + pairName[1];

                newPairs[newFirstPair] = newPairs[newFirstPair]
                    ? newPairs[newFirstPair] + count
                    : count;
                newPairs[newSecondPair] = newPairs[newSecondPair]
                    ? newPairs[newSecondPair] + count
                    : count;
            }
        });
        pairs = newPairs;
    }

    const counts = Object.entries(pairs).reduce<Record<string, number>>(
        (prev, [pairName, count]) => {
            const letters = pairName.split('');

            prev[letters[0]] = prev[letters[0]]
                ? prev[letters[0]] + count
                : count;

            return prev;
        },
        {}
    );
    // the last letter will always be the same
    counts[template[template.length - 1]] += 1;
    console.log(counts, 'Part 2');

    return findDifferenceOfCounts(counts);
};

console.log('Part 1:', part1(10));
console.log('Part 2:', part2(40));
