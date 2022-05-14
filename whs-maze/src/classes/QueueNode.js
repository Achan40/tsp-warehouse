// structure for each node used in BFS
export class QueueNode {
    constructor(loc, dist) {

        // cell coordinates on an xy plane of the maze in array form
        this.loc = loc;

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