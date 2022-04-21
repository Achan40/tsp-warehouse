# Traveling salesman solution using naive approach. Time complexity of O(n!)
from sys import maxsize
from itertools import permutations

# Number of nodes
N = 4

# TSP naive solution
def tsp_naive(graph,start):
    
    # store all nodes except the starting(/ending) because those are the nodes that we want to traverse
    nodes = []
    for i in range(N):
        if i !=  start:
            nodes.append(i)
    
    # store min cost
    min_cost = maxsize
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

        # update min and path
        if curr_cost < min_cost:
            min_cost = curr_cost
            min_path = curr_path
    
    return min_cost,min_path

# Driver Code
if __name__ == "__main__":
 
    # matrix representation of graph
    graph = [[0, 10, 15, 20], [10, 0, 35, 25],
            [15, 35, 0, 30], [20, 25, 30, 0]]
    s = 2
    print(tsp_naive(graph, s))