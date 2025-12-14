"""
Dynamic Programming - Python

Solving complex problems by breaking them down into simpler subproblems:
- Memoization (top-down)
- Tabulation (bottom-up)
"""

from functools import lru_cache
from typing import List


# Fibonacci with memoization
@lru_cache(maxsize=None)
def fibonacci_memo(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci_memo(n - 1) + fibonacci_memo(n - 2)


# Fibonacci with tabulation
def fibonacci_tab(n: int) -> int:
    if n <= 1:
        return n
    
    table = [0, 1]
    for i in range(2, n + 1):
        table.append(table[i - 1] + table[i - 2])
    return table[n]


# Longest Common Subsequence (LCS)
def longest_common_subsequence(str1: str, str2: str) -> int:
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]


# Coin Change Problem
def coin_change(coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if i >= coin:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1


# 0/1 Knapsack Problem
def knapsack(weights: List[int], values: List[int], capacity: int) -> int:
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                )
            else:
                dp[i][w] = dp[i - 1][w]
    
    return dp[n][capacity]


# Edit Distance (Levenshtein)
def edit_distance(str1: str, str2: str) -> int:
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # deletion
                    dp[i][j - 1],      # insertion
                    dp[i - 1][j - 1]   # substitution
                )
    
    return dp[m][n]


# Example usage
if __name__ == "__main__":
    print("=== Dynamic Programming ===\n")
    
    print("Fibonacci (Memoization):")
    print(f"fib(10) = {fibonacci_memo(10)}")
    print(f"fib(40) = {fibonacci_memo(40)}")
    
    print("\nFibonacci (Tabulation):")
    print(f"fib(10) = {fibonacci_tab(10)}")
    print(f"fib(40) = {fibonacci_tab(40)}")
    
    print("\nLongest Common Subsequence:")
    print(f"LCS('ABCDGH', 'AEDFHR') = {longest_common_subsequence('ABCDGH', 'AEDFHR')}")
    
    print("\nCoin Change:")
    print(f"Coins [1, 3, 4], Amount 6: {coin_change([1, 3, 4], 6)} coins")
    
    print("\n0/1 Knapsack:")
    weights = [1, 3, 4, 5]
    values = [1, 4, 5, 7]
    capacity = 7
    print(f"Max value: {knapsack(weights, values, capacity)}")
    
    print("\nEdit Distance:")
    print(f"Distance('kitten', 'sitting') = {edit_distance('kitten', 'sitting')}")

