import { QueueNode } from '../classes/QueueNode.js';

// recursion to find the minimum path from the source to a destination
function shortestPath(node, path) {
    if (node.prev !== null) {
        path.push(node.prev.loc);
        shortestPath(node.prev, path);
    }
    return path.reverse();
}

// check if a cell is within the bounds of the maze
function isValid(row, col, n, m) {
    return row >= 0 && row < n && col >= 0  && col < m;
}

// helper to convert map of points to array map vlaues
function convertPoints(pointsMap) {
    return Array.from(pointsMap.values());
}

// helper to check if object is in another object, and return index if it is, else return -1
// this is needed because javascript cannot easily compare objects/arrays by values...
function indexOfDest(dest, curr) {
    const _ = require('lodash');
    for (let i=0; i<dest.length; i++) {
        if (_.isEqual(dest[i],curr.loc)) {
            return i;
        }
    }
    return -1;
}

// Breadth first search traversal with multiple desired points, essentially Dijstra's Shortest path, but for a binary maze.
function bfsMulti(maze, src, dest) {
    let n = maze.length;
    let m = maze[0].length;
    
    // used to get the row and col num of the 4 neighbors of a cell
    let row_num = [-1, 0, 0, 1];
    let col_num = [0, -1, 1, 0];

    // initiate array to store the distance of destinations to the source node
    // initiate array to store the minimum path traveled to reach a destination
    // if a destination is not found, then value in the dist array and path array will remain -1
    let distArr = new Array(dest.length).fill(-1);
    let pathArr = new Array(dest.length).fill(-1);

    // initate array to track if a cell has been visited
    let visited = [];
    for (let i=0; i<n; i++) {
        visited[i] = new Array(m).fill(false);
    }
    
    // initiate shortest path tree array
    let tree = [];
    for (let i=0; i<n; i++) {
        tree[i] = new Array(m).fill(0);
    }

    // create queue for BFS
    let q = [];

    // create QueueNode Object. The distance of the source cell to itself is 0
    let s = new QueueNode(src, 0);

    // set the first node of the shortest path tree
    tree[src[0]][src[1]] = s;
    // mark the source cell as visited
    visited[src[0]][src[1]] = true;

    q.push(s);

    // perform BFS starting from src until there are no adjacent cells remaining
    while (q.length > 0) {
        
        // dequeue the front cell
        let curr = q.shift();
        
        // if we have reached a dest, store the minimum path cost in distArr
        // if we have reached a dest, store the minimum path taken in pathArr
        let ind = indexOfDest(dest,curr);
        

        if (ind !== -1) {
            distArr[ind] = curr.dist;
            pathArr[ind] = shortestPath(tree[curr.loc[0]][curr.loc[1]],[]);
        }

        for (let i=0; i<4; i++) {
            let row = curr.loc[0] + row_num[i];
            let col = curr.loc[1] + col_num[i];
            // console.log(_.sum([curr.loc[0],row_num]),_.sum([curr.loc[1],col_num])))

            if (isValid(row,col,n,m) && maze[row][col] === 0 && visited[row][col] === false) {
                let adjacent = tree[row][col] = new QueueNode([row,col], curr.dist+1); 
                visited[row][col] = true;
                tree[row][col].setPrev(curr);
                q.push(adjacent);
            }
        }
    }

    return [distArr, pathArr];
}

// Generate the adjacency matrix, and adjacency matrix that contains the paths
function adjMatricies(maze, points) {
    let adjMat = [];
    let pathMat = [];

    for (let i=0; i<points.length; i++) {
        let res = bfsMulti(maze, points[i], points);
        adjMat.push(res[0]);
        pathMat.push(res[1]);
    }
    return [adjMat, pathMat];

}

export {convertPoints, adjMatricies};