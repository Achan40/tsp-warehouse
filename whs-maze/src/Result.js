import { Component } from "react";
import { convertPoints, adjMatricies } from "./helpers/maze.js";
import { runTSP } from "./helpers/tsp.js"
import Button from 'react-bootstrap/Button'

class Result extends Component {
    constructor() {
        super();

        // bind custom methods
        this.runTSP = this.runTSP.bind(this);
    }

    runTSP(maze,points,start,end) {
        // convert dictionary of points to an array of values
        let pointsArr = convertPoints(points)

        // restult of adjMatricies is an adjacency matrix with distanct values, and an adjancecy matrix with the path taken
        let res = adjMatricies(maze, pointsArr)
        // console.log(res[0])
        // console.log(res[1])

        // takes in adjacency matrix of the destired points, and the index of start and end nodes (optional, if no end node is supplied, start node will be considered the end node automatically)
        runTSP(res[0],0,2)
    }

    render() {
        return(
            <Button onClick={() => this.runTSP(this.props.maze, this.props.points, this.props.start, this.props.end)}>Run TSP</Button>
        )
    }
}

export default Result