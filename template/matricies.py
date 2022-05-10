from maze import bfs_multi

def adj_matricies(maze, points):
    adj_mat = []
    path_mat = []

    # No need to optimize code. 
    # The bfs_multi function traverses entire maze anyways, so reducing points traversed does not do much anyways
    # make bfs_multi more efficent in the future? (pop off list if found)
    for i in range(len(points)):
        res = bfs_multi(maze, points[i], points)
        adj_mat.append(res[0])
        path_mat.append(res[1])
    
    return adj_mat, path_mat
