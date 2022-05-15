# Driver Code
from timeit import default_timer as timer
from tsp_naive import tsp_naive
from matricies import adj_matricies

if __name__ == "__main__":
 
    # adjacency matrix representation of complete undirected graph
    graph = [
        [0, 7, 5, 10],
        [7, 0, 3, 8],
        [5, 3, 0, 4],
        [10, 8, 4, 0]
        ]

    # matrix representaion of a binary maze. 1 indicates a valid path, 0 indicates a wall
    maze = [[1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]]

    # in this case, we've manually created a dummy node connecting nodes 0 and 4, so the starting node must be 0 or 4
    start = timer()

    # nodes that we want to reach in the maze
    dest = [[3,3],[0,0],[1,2],[2,2]]

    # adjacency matrix of the nodes
    # the graph is a completely connected undirected graph
    # edge weights are the distance between the nodes
    # also returned is and adjacency matrix containing the least costly path to take between nodes
    adjmat, pathmat = adj_matricies(maze,dest)

    # running the tsp solving algorithm
    print(tsp_naive(adjmat,0))

    end = timer()
    print("Time taken: " + str(end - start))