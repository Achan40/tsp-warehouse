# Traveling salesman solution using naive approach. Time complexity of O(n!)
from itertools import permutations
import numpy as np

# TSP naive solution
def tsp_naive(graph, start_node, end_node=None):

    if end_node is not None:
        graph = add_dummy(graph, start_node, end_node)
    
    # store all nodes except the starting(/ending) because those are the nodes that we want to traverse
    nodes = [i for i in range(len(graph)) if i is not start_node]
    
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
        curr_path = [start_node]

        # compute current cost and move to the next node of the current path. Also keep track of the node you we visited
        k = start_node
        for j in i:
            curr_cost += graph[k][j]
            curr_path.append(j)
            k = j
        
        # add the cost to return to initial node
        # this step may not be needed if we wanted to arbitraily set a start_node and end point
        curr_cost += graph[k][start_node]
        curr_path.append(start_node)

        # update min and path if a new min cost is found
        if curr_cost < min_cost:
            min_cost = curr_cost
            min_path = curr_path
    
    return min_cost,min_path

# Adding dummy node to graph.
# If we want a starting and ending position for the TSP, we'll need to add a dummy node connecting the start and end node.
# This dummy node has edge weight 0 to the start and end nodes, and edge weight inf to all other nodes.
def add_dummy(graph, start_node, end_node):
    n = len(graph)

    # extend the column of the graph first. If the edge is connected to start or ending node, then edge weight is 0, else infinite weight
    for i in range(n):
        if i == start_node or i == end_node:
            graph[i].append(0)
        else:
            graph[i].append(np.inf)

    # add another row to complete the addition of a dummy node, which allows for the tsp to have a designated start and ending node.
    graph.append([0 if i == start_node or i == end_node or i == n else np.inf for i in range(n+1)])

    return graph


