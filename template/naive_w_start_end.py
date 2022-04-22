# Traveling salesman solution using naive approach. Time complexity of O(n!)
from itertools import permutations
from timeit import default_timer as timer
import pandas as pd
import numpy as np

# TSP naive solution
def tsp_naive(graph,start):
    
    # store all nodes except the starting(/ending) because those are the nodes that we want to traverse
    nodes = [i for i in range(len(graph)) if i is not start]
    
    # store min cost
    min_cost = np.inf
    # store min cost's node traversal path
    min_path = []

    # all node traversal permutations
    next_permuation = permutations(nodes)

    for i in next_permuation:

        # store current cost
        curr_cost = 0
        # store current path
        curr_path = [start]

        # compute current cost and move to the next node of the current path. Also keep track of the node you we visited
        k = start
        for j in i:
            curr_cost += graph[k][j]
            curr_path.append(j)
            k = j
        
        # add the cost to return to initial node
        # this step may not be needed if we wanted to arbitraily set a start and end point
        curr_cost += graph[k][start]
        curr_path.append(start)

        # update min and path if a new min cost is found
        if curr_cost < min_cost:
            min_cost = curr_cost
            min_path = curr_path
    
    return min_cost,min_path

# Driver Code
if __name__ == "__main__":
 
    # matrix representation of complete undirected graph
    # We can force a starting and ending position for the TSP by using a dummy node connecting the start and end node.
    # This dummy node has edge weight 0 to the start and end nodes, and edge weight inf to all other nodes.
    graph = [
        [0, 7, 5, 10, 0],
        [7, 0, 3, 8, np.inf],
        [5, 3, 0, 4, np.inf],
        [10, 8, 4, 0, 0],
        [0, np.inf, np.inf, 0, 0]
        ]

    # in this case, we've manually created a dummy node connecting nodes 0 and 4, so the starting node must be 0 or 4
    s = 0
    start = timer()
    print(tsp_naive(graph, s))
    end = timer()
    print(end - start)