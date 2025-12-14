/**
 * Leader Election Pattern - JavaScript
 * 
 * Ensures only one node in a distributed system acts as the leader
 * at any given time.
 */

class LeaderElection {
    constructor(nodeId, nodes) {
        this.nodeId = nodeId;
        this.nodes = nodes;
        this.isLeader = false;
        this.leaderId = null;
    }
    
    async electLeader() {
        // Simple election: node with lowest ID becomes leader
        const sortedNodes = [...this.nodes].sort();
        this.leaderId = sortedNodes[0];
        this.isLeader = this.nodeId === this.leaderId;
        
        if (this.isLeader) {
            console.log(`Node ${this.nodeId} is now the leader`);
        } else {
            console.log(`Node ${this.nodeId} recognizes ${this.leaderId} as leader`);
        }
        
        return this.isLeader;
    }
    
    async heartbeat() {
        if (this.isLeader) {
            console.log(`Leader ${this.nodeId} sending heartbeat...`);
            return true;
        }
        return false;
    }
    
    async checkLeader() {
        // In real implementation, would check if leader is still alive
        return this.isLeader;
    }
}

// Example usage
console.log('=== Leader Election Pattern ===\n');

const nodes = ['node1', 'node2', 'node3'];

nodes.forEach(nodeId => {
    const election = new LeaderElection(nodeId, nodes);
    election.electLeader();
    if (election.isLeader) {
        setInterval(() => election.heartbeat(), 2000);
    }
});

module.exports = { LeaderElection };

