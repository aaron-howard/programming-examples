/**
 * Dynamic Programming - JavaScript
 * 
 * Solving complex problems by breaking them down into simpler subproblems:
 * - Memoization (top-down)
 * - Tabulation (bottom-up)
 */

// Fibonacci with memoization
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Fibonacci with tabulation
function fibonacciTab(n) {
    if (n <= 1) return n;
    
    const table = [0, 1];
    for (let i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}

// Longest Common Subsequence (LCS)
function longestCommonSubsequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Coin Change Problem
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// 0/1 Knapsack Problem
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}

// Edit Distance (Levenshtein)
function editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // deletion
                    dp[i][j - 1],      // insertion
                    dp[i - 1][j - 1]   // substitution
                );
            }
        }
    }
    
    return dp[m][n];
}

// Example usage
console.log('=== Dynamic Programming ===\n');

console.log('Fibonacci (Memoization):');
console.log(`fib(10) = ${fibonacciMemo(10)}`);
console.log(`fib(40) = ${fibonacciMemo(40)}`);

console.log('\nFibonacci (Tabulation):');
console.log(`fib(10) = ${fibonacciTab(10)}`);
console.log(`fib(40) = ${fibonacciTab(40)}`);

console.log('\nLongest Common Subsequence:');
console.log(`LCS("ABCDGH", "AEDFHR") = ${longestCommonSubsequence("ABCDGH", "AEDFHR")}`);

console.log('\nCoin Change:');
console.log(`Coins [1, 3, 4], Amount 6: ${coinChange([1, 3, 4], 6)} coins`);

console.log('\n0/1 Knapsack:');
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const capacity = 7;
console.log(`Max value: ${knapsack(weights, values, capacity)}`);

console.log('\nEdit Distance:');
console.log(`Distance("kitten", "sitting") = ${editDistance("kitten", "sitting")}`);

module.exports = {
    fibonacciMemo, fibonacciTab,
    longestCommonSubsequence,
    coinChange,
    knapsack,
    editDistance
};

