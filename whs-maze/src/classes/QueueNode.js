// structure for each node used in BFS
export class QueueNode {
    constructor(pt, dist) {

        // cell coordinates (when we need to access x and y seperately)
        this.pt = pt;

        // xy coords
        this.loc = [this.pt[0], this.pt[1]];

        // cell's distance from the source node
        this.dist = dist;

        // previous node
        this.prev = null;
    }

    // method to point to the previous node traversed
    setPrev(previous) {
        this.prev = previous;
    }
}