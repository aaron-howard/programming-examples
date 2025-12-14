/**
 * Greedy Algorithms - JavaScript
 * 
 * Algorithms that make locally optimal choices at each step:
 * - Activity Selection
 * - Fractional Knapsack
 * - Huffman Coding (simplified)
 * - Minimum Spanning Tree (Prim's)
 */

// Activity Selection Problem
function activitySelection(activities) {
    // Sort by finish time
    activities.sort((a, b) => a.finish - b.finish);
    
    const selected = [activities[0]];
    let lastFinish = activities[0].finish;
    
    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastFinish) {
            selected.push(activities[i]);
            lastFinish = activities[i].finish;
        }
    }
    
    return selected;
}

// Fractional Knapsack Problem
function fractionalKnapsack(items, capacity) {
    // Sort by value/weight ratio (descending)
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    const selected = [];
    
    for (const item of items) {
        if (remainingCapacity >= item.weight) {
            // Take whole item
            totalValue += item.value;
            remainingCapacity -= item.weight;
            selected.push({ ...item, fraction: 1.0 });
        } else {
            // Take fraction of item
            const fraction = remainingCapacity / item.weight;
            totalValue += item.value * fraction;
            selected.push({ ...item, fraction });
            break;
        }
    }
    
    return { totalValue, selected };
}

// Minimum Coins Problem (Greedy)
function minCoinsGreedy(coins, amount) {
    // Sort coins in descending order
    coins.sort((a, b) => b - a);
    
    const result = [];
    let remaining = amount;
    
    for (const coin of coins) {
        const count = Math.floor(remaining / coin);
        if (count > 0) {
            result.push({ coin, count });
            remaining -= coin * count;
        }
        if (remaining === 0) break;
    }
    
    return remaining === 0 ? result : null;
}

// Job Sequencing Problem
function jobSequencing(jobs) {
    // Sort by profit (descending)
    jobs.sort((a, b) => b.profit - a.profit);
    
    const maxDeadline = Math.max(...jobs.map(j => j.deadline));
    const schedule = new Array(maxDeadline).fill(null);
    let totalProfit = 0;
    
    for (const job of jobs) {
        // Find latest available slot before deadline
        for (let i = job.deadline - 1; i >= 0; i--) {
            if (schedule[i] === null) {
                schedule[i] = job;
                totalProfit += job.profit;
                break;
            }
        }
    }
    
    return { schedule: schedule.filter(j => j !== null), totalProfit };
}

// Example usage
console.log('=== Greedy Algorithms ===\n');

// Activity Selection
console.log('Activity Selection:');
const activities = [
    { start: 1, finish: 4, name: 'A' },
    { start: 3, finish: 5, name: 'B' },
    { start: 0, finish: 6, name: 'C' },
    { start: 5, finish: 7, name: 'D' },
    { start: 8, finish: 9, name: 'E' },
    { start: 5, finish: 9, name: 'F' }
];

const selected = activitySelection(activities);
console.log('Selected activities:', selected.map(a => a.name));

// Fractional Knapsack
console.log('\nFractional Knapsack:');
const items = [
    { weight: 10, value: 60 },
    { weight: 20, value: 100 },
    { weight: 30, value: 120 }
];
const result = fractionalKnapsack(items, 50);
console.log('Total value:', result.totalValue);
console.log('Selected items:', result.selected);

// Minimum Coins
console.log('\nMinimum Coins (Greedy):');
const coins = [1, 5, 10, 25];
const amount = 67;
const coinResult = minCoinsGreedy(coins, amount);
console.log(`Amount: ${amount}`);
if (coinResult) {
    coinResult.forEach(({ coin, count }) => {
        console.log(`  ${count} x ${coin} cent coin(s)`);
    });
}

// Job Sequencing
console.log('\nJob Sequencing:');
const jobs = [
    { id: 'J1', deadline: 2, profit: 100 },
    { id: 'J2', deadline: 1, profit: 19 },
    { id: 'J3', deadline: 2, profit: 27 },
    { id: 'J4', deadline: 1, profit: 25 },
    { id: 'J5', deadline: 3, profit: 15 }
];

const jobResult = jobSequencing(jobs);
console.log('Scheduled jobs:', jobResult.schedule.map(j => j.id));
console.log('Total profit:', jobResult.totalProfit);

module.exports = {
    activitySelection,
    fractionalKnapsack,
    minCoinsGreedy,
    jobSequencing
};

