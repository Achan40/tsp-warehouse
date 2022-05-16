import { Component } from "react";
import { adjMatricies, findPos } from "./helpers/maze.js";
import { runTSP } from "./helpers/tsp.js"
import Button from 'react-bootstrap/Button'

class Result extends Component {
    constructor() {
        super();

        this.state = {
            missingStart: false,
            missingEnd: false,
            tooShort: false,
            displayResults: false,
        }

        // bind custom methods
        this.runTSPonClick = this.runTSPonClick.bind(this)
    }

    runTSPonClick(maze,pointsArr,start,end) {
        // undo displaying of results if inputs are invalid
        this.setState({displayResults:false})
        
        // if end has been selected, find its index in the array of points
        // otherwise throw error message
        if (end.length) {
            end = findPos(pointsArr, end)
            this.setState({missingEnd:false})
        } else if (end.length === 0) {
            this.setState({missingEnd:true})
        }

        // if start has been selected, find its index in the array of points
        // otherwise throw error message
        if (start.length) {
            start = findPos(pointsArr, start)
            this.setState({missingStart:false})
        } else if ( start.length === 0) {
            this.setState({missingStart:true})
            return null
        }

        // if pointsArr is too short, not enough points selected for TSP, throw error
        if (pointsArr.length < 2) {
            this.setState({tooShort:true})
            return null
        } else if (pointsArr >= 2) {
            this.setState({tooShort:false})
        }

        // restult of adjMatricies is an adjacency matrix with distanct values, and an adjancecy matrix with the path taken
        let res = adjMatricies(maze, pointsArr)
        // console.log(res[0])
        // console.log(res[1])

        // takes in adjacency matrix of the destired points, and the index of start and end nodes (optional, if no end node is supplied, start node will be considered the end node automatically)
        let fin = runTSP(res[0],start,end)
        console.log(fin[0],fin[1])

        // if all validations have passed, display the results
        this.setState({displayResults:true})
    }

    render() {
        return(
            <div>
                <Button onClick={() => this.runTSPonClick(this.props.maze, this.props.pointsArr, this.props.start, this.props.end)}>Run TSP</Button>
                {this.state.missingStart ? <div>Please select a starting node!</div> : null}
                {this.state.missingEnd ? <div>Ending node not selected. Default ending node will be set to starting node.</div> : null}
                {this.state.tooShort ? <div>Please select more than one point.</div> : null}
                {this.state.displayResults ? <div>RESULTS</div> : null}
            </div>
        )
    }
}

export default Result