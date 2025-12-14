"""
Greedy Algorithms - Python

Algorithms that make locally optimal choices at each step:
- Activity Selection
- Fractional Knapsack
- Minimum Coins
- Job Sequencing
"""

from typing import List, Dict, Optional


# Activity Selection Problem
def activity_selection(activities: List[Dict]) -> List[Dict]:
    # Sort by finish time
    activities_sorted = sorted(activities, key=lambda x: x['finish'])
    
    selected = [activities_sorted[0]]
    last_finish = activities_sorted[0]['finish']
    
    for activity in activities_sorted[1:]:
        if activity['start'] >= last_finish:
            selected.append(activity)
            last_finish = activity['finish']
    
    return selected


# Fractional Knapsack Problem
def fractional_knapsack(items: List[Dict], capacity: int) -> Dict:
    # Sort by value/weight ratio (descending)
    items_sorted = sorted(items, key=lambda x: x['value'] / x['weight'], reverse=True)
    
    total_value = 0
    remaining_capacity = capacity
    selected = []
    
    for item in items_sorted:
        if remaining_capacity >= item['weight']:
            # Take whole item
            total_value += item['value']
            remaining_capacity -= item['weight']
            selected.append({**item, 'fraction': 1.0})
        else:
            # Take fraction of item
            fraction = remaining_capacity / item['weight']
            total_value += item['value'] * fraction
            selected.append({**item, 'fraction': fraction})
            break
    
    return {'total_value': total_value, 'selected': selected}


# Minimum Coins Problem (Greedy)
def min_coins_greedy(coins: List[int], amount: int) -> Optional[List[Dict]]:
    # Sort coins in descending order
    coins_sorted = sorted(coins, reverse=True)
    
    result = []
    remaining = amount
    
    for coin in coins_sorted:
        count = remaining // coin
        if count > 0:
            result.append({'coin': coin, 'count': count})
            remaining -= coin * count
        if remaining == 0:
            break
    
    return result if remaining == 0 else None


# Job Sequencing Problem
def job_sequencing(jobs: List[Dict]) -> Dict:
    # Sort by profit (descending)
    jobs_sorted = sorted(jobs, key=lambda x: x['profit'], reverse=True)
    
    max_deadline = max(job['deadline'] for job in jobs)
    schedule = [None] * max_deadline
    total_profit = 0
    
    for job in jobs_sorted:
        # Find latest available slot before deadline
        for i in range(job['deadline'] - 1, -1, -1):
            if schedule[i] is None:
                schedule[i] = job
                total_profit += job['profit']
                break
    
    return {
        'schedule': [j for j in schedule if j is not None],
        'total_profit': total_profit
    }


# Example usage
if __name__ == "__main__":
    print("=== Greedy Algorithms ===\n")
    
    # Activity Selection
    print("Activity Selection:")
    activities = [
        {'start': 1, 'finish': 4, 'name': 'A'},
        {'start': 3, 'finish': 5, 'name': 'B'},
        {'start': 0, 'finish': 6, 'name': 'C'},
        {'start': 5, 'finish': 7, 'name': 'D'},
        {'start': 8, 'finish': 9, 'name': 'E'},
        {'start': 5, 'finish': 9, 'name': 'F'}
    ]
    
    selected = activity_selection(activities)
    print("Selected activities:", [a['name'] for a in selected])
    
    # Fractional Knapsack
    print("\nFractional Knapsack:")
    items = [
        {'weight': 10, 'value': 60},
        {'weight': 20, 'value': 100},
        {'weight': 30, 'value': 120}
    ]
    result = fractional_knapsack(items, 50)
    print("Total value:", result['total_value'])
    print("Selected items:", result['selected'])
    
    # Minimum Coins
    print("\nMinimum Coins (Greedy):")
    coins = [1, 5, 10, 25]
    amount = 67
    coin_result = min_coins_greedy(coins, amount)
    print(f"Amount: {amount}")
    if coin_result:
        for item in coin_result:
            print(f"  {item['count']} x {item['coin']} cent coin(s)")
    
    # Job Sequencing
    print("\nJob Sequencing:")
    jobs = [
        {'id': 'J1', 'deadline': 2, 'profit': 100},
        {'id': 'J2', 'deadline': 1, 'profit': 19},
        {'id': 'J3', 'deadline': 2, 'profit': 27},
        {'id': 'J4', 'deadline': 1, 'profit': 25},
        {'id': 'J5', 'deadline': 3, 'profit': 15}
    ]
    
    job_result = job_sequencing(jobs)
    print("Scheduled jobs:", [j['id'] for j in job_result['schedule']])
    print("Total profit:", job_result['total_profit'])

