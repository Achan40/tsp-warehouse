# Driver Code
from timeit import default_timer as timer
from naive import tsp_naive

if __name__ == "__main__":
 
    # adjacency matrix representation of complete undirected graph
    graph = [
        [0, 7, 5, 10],
        [7, 0, 3, 8],
        [5, 3, 0, 4],
        [10, 8, 4, 0]
        ]

    # matrix representaion of a binary maze. 1 indicates a valid path, 0 indicates a wall
    maze = [[1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 1 ],
            [1, 1, 1, 0, 1, 1, 0, 1, 0, 1 ],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
            [1, 1, 0, 0, 0, 0, 1, 0, 0, 1 ]]

    # in this case, we've manually created a dummy node connecting nodes 0 and 4, so the starting node must be 0 or 4
    start = timer()
    print(tsp_naive(graph,0,1))
    end = timer()
    print("Time taken: " + str(end - start))