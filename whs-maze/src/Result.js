import { Component } from "react";
import { adjMatricies, findPos } from "./helpers/maze.js";
import { runTSP } from "./helpers/tsp.js"
import Button from 'react-bootstrap/Button'

class Result extends Component {
    constructor() {
        super();

        // bind custom methods
        this.runTSPonClick = this.runTSPonClick.bind(this);
    }

    runTSPonClick(maze,pointsArr,start,end) {
        
        // if end has been selected, find its index in the array of points
        if (end.length) {
            end = findPos(pointsArr, end)
        }

        // if start has been selected, find its index in the array of points
        // otherwise throw error message
        if (start.length) {
            start = findPos(pointsArr, start)
        } else {
            console.log("Please select a starting point!")
        }

        // restult of adjMatricies is an adjacency matrix with distanct values, and an adjancecy matrix with the path taken
        let res = adjMatricies(maze, pointsArr)
        // console.log(res[0])
        // console.log(res[1])

        // takes in adjacency matrix of the destired points, and the index of start and end nodes (optional, if no end node is supplied, start node will be considered the end node automatically)
        let fin = runTSP(res[0],start,end)
        console.log(fin[0],fin[1])
    }

    render() {
        return(
            <Button onClick={() => this.runTSPonClick(this.props.maze, this.props.pointsArr, this.props.start, this.props.end)}>Run TSP</Button>
        )
    }
}

export default Result