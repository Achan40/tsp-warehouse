import {QueueNode} from './../classes/QueueNode.js'

// recursion to find the minimum path from the source to a destination
function shortestPath(node, path) {
    if (node.prev !== null) {
        path.push(node.prev.loc);
        shortestPath(node.prev, path);
    }
    return path.reverse();
}

// check if a cell is within the bounds of the maze
function isValid(row, col) {
    return row >= 0 && row < n && col >= 0  && col < m;
}

// Breadth first search traversal with multiple desired points, essentially Dijstra's Shortest path, but for a binary maze.
function bfsMulti(maze, src, dest) {
    
    // used to get the row and col num of the 4 neighbors of a cell
    let row_num = [-1, 0, 0, 1]
    let col_num = [0, -1, 1, 0]

    // initiate array to store the distance of destinations to the source node
    // initiate array to store the minimum path traveled to reach a destination
    // if a destination is not found, the value in the dist array and path array will remain -1
    let distArr = new Array(dest.length).fill(-1);
    let pathArr = new Array(dest.length).fill(-1);

    // initate array to track if a cell has been visited
    let visited = [];
    for (let i=0; i<maze.length; i++) {
        visited[i] = new Array(maze[0].length).fill(false);
    }
    
    // initiate shortest path tree array
    let tree = [];
    for (let i=0; i<maze.length; i++) {
        visited[i] = new Array(maze[0].length).fill(0);
    }

    // create queue for BFS
    let q = [];

    // create QueueNode Object. The distance of the source cell to itself is 0
    let s = new QueueNode(src, 0);

    // set the first node of the shortest path tree
    tree[src[0]][src[1]] = s;
    // mark the source cell as visited
    visited[src[0]][src[1]] = true;

    // enqueue the src cell
    q.push(s);

    // perform BFS starting from src until there are no adjacent cells remaining
    while (q) {

        // dequeue the front cell
        let curr = q.shift();

        // if we have reached a dest, store the minimum path cost in distArr
        // if we have reached a dest, store the minimum path taken in pathArr
        if (curr.loc in dest) {
            distArr[dest.indexOf(curr.loc)] = curr.dist;
            pathArr[dest.indexOf(curr.loc)] = shortestPath(tree[curr.pt[0]][curr.pt[1]],[tree[curr.pt[0]][curr.pt[1]]]);
        }

        for (let i=0; i<4; i++) {
            let row = curr.pt[0] + row_num[i];
            let col = curr.pt[1] + col_num[1];

            if (isValid(row,col) && maze[row][col] === 1 && visited[row][col] === false) {
                let adjacent = tree[row][col] = QueueNode([row][col], curr.dist+1);
                visited[row][col] = true;
                tree[row][col].setPrev(curr);
                q.push(adjacent);
            }
        }
    }

    return distArr, pathArr
}