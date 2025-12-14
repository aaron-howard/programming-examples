"""
Leader Election Pattern - Python

Ensures only one node in a distributed system acts as the leader
at any given time.
"""

import threading
import time


class LeaderElection:
    def __init__(self, node_id, nodes):
        self.node_id = node_id
        self.nodes = nodes
        self.is_leader = False
        self.leader_id = None
    
    def elect_leader(self):
        # Simple election: node with lowest ID becomes leader
        sorted_nodes = sorted(self.nodes)
        self.leader_id = sorted_nodes[0]
        self.is_leader = self.node_id == self.leader_id
        
        if self.is_leader:
            print(f"Node {self.node_id} is now the leader")
        else:
            print(f"Node {self.node_id} recognizes {self.leader_id} as leader")
        
        return self.is_leader
    
    def heartbeat(self):
        if self.is_leader:
            print(f"Leader {self.node_id} sending heartbeat...")
            return True
        return False
    
    def check_leader(self):
        # In real implementation, would check if leader is still alive
        return self.is_leader


# Example usage
if __name__ == "__main__":
    print("=== Leader Election Pattern ===\n")
    
    nodes = ['node1', 'node2', 'node3']
    
    def node_worker(node_id):
        election = LeaderElection(node_id, nodes)
        election.elect_leader()
        if election.is_leader:
            while True:
                election.heartbeat()
                time.sleep(2)
    
    threads = [threading.Thread(target=node_worker, args=(node_id,)) for node_id in nodes]
    for t in threads:
        t.start()
    
    time.sleep(5)
    for t in threads:
        t.join(timeout=0.1)

