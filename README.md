# tsp-warehouse
[The Traveling Salesman Problem (TSP)](https://en.wikipedia.org/wiki/Travelling_salesman_problem) seeks to determine the shortest path to reach each target location exactly once and return to the starting node. This project is my attempt to model a real-world application of the traveling salesman problem. It's my attempt at solving the TSP, and is inspired by warehouse operations at my workplace. The goal is to identify the best path to take to pick up a number of goods, and return them not only to a set starting point, but also a desired end point if one is selected.

## Repository Structure
This project is split up into two main directories:

template: A few python scripts to demo the algorithms used in the application. Helps ensure the node traversal logic is correct before creating a front-end application

whs-maze: A react-app which offers a user-friendly way to play around with the application

## Notes
I chose to use a brute-force approach to solve the TSP, navigating through all possible ways we could traverse selected nodes. Solving the TSP in this way requires us to have a way to represent the distance between nodes, in this case, an undirected weighted [graph](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)#Connected_graph). This graph can be represented as an [adjacency matrix](https://en.wikipedia.org/wiki/Adjacency_matrix), which we traverse through in order to determine the solution to the TSP. Additionally, I wanted the ability to set a certain node to be final node reached, an ending node.

In summation we must:
* Find the shortest path (distance) from the ith node to all other nodes
* Find the shortest path (node traversal path) from the ith node to all other nodes
* Generate an adjacency matrix (distance)
* Generate an adjacency matrix (node traversal path)

To find the shortest path from the ith node to all other nodes, we use a modified version of [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm). This generates an array when each entry is the minimum distance of the ith node to a target node. Additionally, we keep track of the previous node that we traversed, allowing us to return the traversal path using recursion. This allows us to generate an adjacency matrix, each row in the matrix is the shortest distance from the ith node to all other nodes. We generate an adjacency matrix with the shortest traversal paths by the same process, each row in this matrix is the shortest path from the ith node to all other nodes.

Finally, once our adjacency matrix is generated, we traverse through all node permutations to identify the path with the shortest distance. 

## Complexity Analysis
Dijkstra's algorithm traditionally runs in O((V+E)log(V)) time. In our case, V = number of cells in the maze, E = number of connections between the cells. However, since we run Dijkstra's for each destination node selected, our implementation runs in O(N(V+E)log(V)) time, where N = number of destination nodes selected. 

Once the adjacency matrix is generated, the brute-force solution of the TSP runs in O(N!) time, where N = the number of destination nodes.

Overall, the minimum time complexity for this is in O((N(V+E)log(V)) + N!) time, ignoring other factors.

## Final Notes
Additionally, an ending node can be set by adding dummy node to graph. The dummy node has edge weight 0 to the start and end nodes, and edge weight inf to all other nodes. This essentially forces our brute-force solution to always navigate to the selected end node last.

A brute-force approach to the TSP is incredibly time consuming, as a result, it is advised not to select more that 10 destination nodes. 


