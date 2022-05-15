// Traveling salesman problem soltion. Takes in an adjacency matrix, and the index of the start node and end node (optional).
function runTSP(graph, startNode, endNode=null) {


    // adding a dummy node if an ending node is supplied
    if (typeof(endNode) === 'number'){
        graph = addDummy(graph, startNode, endNode);
    } else {
        console.log('Ending node not selected!')
    }

    // store all nodes except the starting(/ending) because those are the nodes that we want to traverse
    let nodes = []
    for (let i=0; i<graph.length; i++) {
        if (i !== startNode) {
            nodes.push(i)
        }
    }

    // store min cost
    let minCost = Infinity
    // store min cost node traversal path
    let minPath = []

    // all node traversal permutations
    let perms = permutator(nodes)

    for (let i=0; i<perms.length; i++) {
        // store current cost
        let currCost = 0;
        // store current path
        let currPath = [startNode]

        // compute current cost and move to the next node of the current path. Also keep track of the node we visited
        let c = startNode

        // for each node in a permutation
        for (let j=0; j<perms[i].length; j++) {
            let node = perms[i][j]
            currCost += graph[c][node]
            currPath.push(node)
            c = node
        }

        // add the cost to return to initial node
        // this step may not be needed if we want to set a start_node and end point, since path from end -> start should be zero
        currCost += graph[c][startNode]
        currPath.push(startNode)

        // update min cost and path if a new min cost is found
        if (currCost < minCost) {
            minCost = currCost
            minPath = currPath
        }
    }

    return [minCost, minPath]
}

// helper function to add a dummy node to the graph
// If we want a starting and ending position for the TSP, we'll need to add a dummy node connecting the start and end node.
// This dummy node has edge weight 0 to the start and end nodes, and edge weight inf to all other nodes.
function addDummy(graph, startNode, endNode) {
    let l = graph.length
    
    // extend the column of the adjacency matrix first. If the edge is connected to the start or ending node, then edge weight is 0, otherwise inf edge weight
    for (let i=0; i<l; i++) {
        if (i === startNode || i === endNode) {
            graph[i].push(0)
        } else {
            graph[i].push(Infinity)
        }
    }
    
    // add another row to complete the addition of a dummy node, which allows for the tsp to have a designated start and ending node
    let row = []
    for (let i=0; i<l+1; i++) {
        if (i === startNode || i === endNode || i === l) {
            row.push(0)
        } else {
            row.push(Infinity)
        }
    }
    graph.push(row)

    return graph
}


// function to generate permutations from array
function permutator(inputArr) {
    var results = [];
  
    function permute(arr, memo=[]) {
      var cur = memo;
  
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
  
      return results;
    }
  
return permute(inputArr);
}

export {runTSP}