from collections import deque
from email.errors import NonPrintableDefect

from numpy import short
# rows and col of maze
n = 9
m = 10

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

        # check cell has been visited
        self.visited = False

        # cell's distance from the source node
        self.dist = dist

        # previous node
        self.prev = None

    # def __repr__(self):
    #     rep = str(self.loc)
    #     return rep

    # check if the cell have been visited before
    def set_visited(self):
        self.visited = True
    
    # point to the previous node traversed
    def set_prev(self, previous):
        self.prev = previous

def shortest(node, path):
    if node.prev:
        path.append(node.prev.loc)
        shortest(node.prev, path)
    return path

# check if a cell is within the bounds of the maze
def isValid(row, col):
    return row >= 0 and row < n and col >= 0 and col < m

# used to get the row and col num of the 4 neighbors of a cell
row_num = [-1, 0, 0, 1]
col_num = [0, -1, 1, 0]

def BFS(mat, src: Point, dest: Point):

    # check if src and dest in the matrix have value 1
    if mat[src.x][src.y] != 1 or mat[dest.x][dest.y] != 1:
        return -1

    # initiate shortest path tree array
    visited = [[0 for i in range(m)] for j in range(n)]

    # create a queue for BFS
    q = deque()
    
    # the distance of the source cell to itself is 0
    s = queueNode(src, 0)

    # marking source as visited
    visited[src.x][src.y] = s
    visited[src.x][src.y].set_visited()
    
    # enqueue the src cell
    q.append(s)

    # perform BFS starting from src
    while q:
        
        # dequeue the front cell
        curr = q.popleft()

        # if we have reached dest, finish traversal
        pt = curr.pt
        if pt.x == dest.x and pt.y == dest.y:
            print(shortest(visited[dest.x][dest.y],[visited[dest.x][dest.y].loc]))
            return curr.dist
        
        # else enque the adjacent cells
        for i in range(4):
            row = pt.x + row_num[i]
            col = pt.y + col_num[i]

            # if adjacent cell is valid, and has path not yet visited
            # we mark it as visited and enqueue it
            if isValid(row,col) and mat[row][col] == 1 and visited[row][col] == False:
                adjacent = visited[row][col] = queueNode(Point(row,col),curr.dist+1)
                visited[row][col].set_visited()
                visited[row][col].set_prev(curr)
                
                q.append(adjacent)
        
        
    
    # if destination is not found return -1
    return -1
    
mat = [[ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
        [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 1 ],
        [ 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 ],
        [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ],
        [ 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
        [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
        [ 1, 1, 0, 0, 0, 0, 1, 0, 0, 1 ]]

source = Point(0,0)
dest = Point(3,4)


dist = BFS(mat,source,dest)
print(dist)