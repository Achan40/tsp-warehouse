from collections import deque
from curses import pair_number
# rows and col of maze
n = 4
m = 4

# used to get the row and col num of the 4 neighbors of a cell
row_num = [-1, 0, 0, 1]
col_num = [0, -1, 1, 0]

# structure for queue used in BFS
class queueNode:
    def __init__(self, pt, dist: int) -> None:
        
        # cell coordinates (when we need to access x and y seperately)
        self.pt = pt

        # xy coords
        self.loc = [self.pt[0], self.pt[1]]

        # cell's distance from the source node
        self.dist = dist

        # previous node
        self.prev = None

    # string representation of the node
    def __repr__(self):
        rep = str(self.loc)
        return rep
    
    # point to the previous node traversed
    def set_prev(self, previous):
        self.prev = previous

# recursion to find the minimum path from the source to a destination
def shortest(node, path):
    if node.prev:
        path.append(node.prev.loc)
        shortest(node.prev, path)
    return path[::-1]

# check if a cell is within the bounds of the maze
def isValid(row, col):
    return row >= 0 and row < n and col >= 0 and col < m

# Breadth first search traversal with multiple desired points, essentially Dijstra's Shortest path, but for a binary maze.
def bfs_multi(maze, src, dest):

    # initiate array to store the distance of destinations to the source node
    # initiate array to store the minimum path traveled to reach a destination
    # if a destination is not found, the value in the dist array and path array will remain -1
    dist_arr = [-1 for i in range(len(dest))]
    path_arr = [-1 for i in range(len(dest))]

    # initate array to track if a cell has been visited
    # initiate shortest path tree array
    visited = [[False for i in range(m)] for j in range(n)]
    tree = [[0 for i in range(m)] for j in range(n)]

    # create a queue for BFS
    q = deque()
    
    # the distance of the source cell to itself is 0
    s = queueNode(src, 0)

    # set the first node of the shortest path tree
    tree[src[0]][src[1]] = s
    # marking source as visited
    visited[src[0]][src[1]] = True
    
    # enqueue the src cell
    q.append(s)

    # perform BFS starting from src
    while q:
        
        # dequeue the front cell
        curr = q.popleft()

        # if we have reached a dest, store the minimum path cost in dist_arr
        # if we have reached a dest, store the minimum path taken in path_arr
        if curr.loc in dest:
            dist_arr[dest.index(curr.loc)] = curr.dist
            path_arr[dest.index(curr.loc)] = shortest(tree[curr.pt[0]][curr.pt[1]],[tree[curr.pt[0]][curr.pt[1]]])
        
        # otherwise enqueue the adjacent cells
        for i in range(4):
            row = curr.pt[0] + row_num[i]
            col = curr.pt[1] + col_num[i]

            # if adjacent cell is valid, and has path not yet visited
            # we mark it as visited in the visited array
            # set the pointer for the next node to point to the current node
            # enque the adjacent node
            if isValid(row,col) and maze[row][col] == 1 and visited[row][col] == False:
                adjacent = tree[row][col] = queueNode([row,col],curr.dist+1)
                visited[row][col] = True
                tree[row][col].set_prev(curr)
                
                q.append(adjacent)
        
    return dist_arr, path_arr