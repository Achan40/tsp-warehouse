from collections import deque
# rows and col of maze
n = 9
m = 10

# used to get the row and col num of the 4 neighbors of a cell
row_num = [-1, 0, 0, 1]
col_num = [0, -1, 1, 0]

# store maze cell coordinates
class Point:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

# structure for queue used in BFS
class queueNode:
    def __init__(self, pt: Point, dist: int) -> None:
        
        # cell coordinates (when we need to access x and y seperately)
        self.pt = pt

        # xy coords
        self.loc = [self.pt.x, self.pt.y]

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
def bfs_multi(maze, src: Point, dest: Point):

    # destination position matters. Important when we want to generate an adjacency matrix
    dest_points = [[i.x,i.y] for i in dest]

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
    tree[src.x][src.y] = s
    # marking source as visited
    visited[src.x][src.y] = True
    
    # enqueue the src cell
    q.append(s)

    # perform BFS starting from src
    while q:
        
        # dequeue the front cell
        curr = q.popleft()

        # if we have reached a dest, store the minimum path cost in dist_arr
        # if we have reach a dest, store the minimum path in path_arr
        if curr.loc in dest_points:
            dist_arr[dest_points.index(curr.loc)] = curr.dist
            path_arr[dest_points.index(curr.loc)] = shortest(tree[curr.pt.x][curr.pt.y],[tree[curr.pt.x][curr.pt.y]])
        
        # otherwise enqueue the adjacent cells
        for i in range(4):
            row = curr.pt.x + row_num[i]
            col = curr.pt.y + col_num[i]

            # if adjacent cell is valid, and has path not yet visited
            # we mark it as visited in the visited array
            # set the pointer for the next node to point to the current node
            # enque the adjacent node
            if isValid(row,col) and maze[row][col] == 1 and visited[row][col] == False:
                adjacent = tree[row][col] = queueNode(Point(row,col),curr.dist+1)
                visited[row][col] = True
                tree[row][col].set_prev(curr)
                
                q.append(adjacent)
        
    return dist_arr, path_arr