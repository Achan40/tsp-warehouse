import { Component } from "react";
import { convertPoints, adjMatricies } from "./helpers/maze.js";
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

        console.log(adjMatricies(maze,pointsArr)[0])
        console.log(adjMatricies(maze,pointsArr)[1])
    }

    render() {
        return(
            <Button onClick={() => this.runTSP(this.props.maze, this.props.points, this.props.start, this.props.end)}>Run TSP</Button>
        )
    }
}

export default Result