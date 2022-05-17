import { Component } from "react";
import { adjMatricies } from "./helpers/adjmat.js";
import { findPos } from "./helpers/extra.js";
import { runTSP } from "./helpers/tsp.js";
import Button from 'react-bootstrap/Button';

class Result extends Component {
    constructor() {
        super();

        this.state = {
            missingStart: false,
            missingEnd: false,
            tooShort: false,
            unreachableNode: false,
            displayResults: false,

            adjMat: null,
            adjPathMat: null,
            pathDist: null,
            pathMat: null,
        };

        // bind custom methods
        this.runTSPonClick = this.runTSPonClick.bind(this);
    }

    runTSPonClick(maze,pointsArr,start,end) {
        // undo displaying of results if inputs are invalid
        this.setState({displayResults:false});
        
        // if end has been selected, find its index in the array of points
        // otherwise throw error message
        if (end.length) {
            end = findPos(pointsArr, end);
            this.setState({missingEnd:false});
        } else if (end.length === 0) {
            this.setState({missingEnd:true});
        }

        // if start has been selected, find its index in the array of points
        // otherwise throw error message
        if (start.length) {
            start = findPos(pointsArr, start);
            this.setState({missingStart:false});
        } else if ( start.length === 0) {
            this.setState({missingStart:true});
            return null;
        }

        // if pointsArr is too short, not enough points selected for TSP, throw error
        if (pointsArr.length < 2) {
            this.setState({tooShort:true});
            return null;
        } else if (pointsArr >= 2) {
            this.setState({tooShort:false});
        }

        // restult of adjMatricies is an adjacency matrix with distance values, and an adjancecy matrix with the path taken
        let adj = adjMatricies(maze, pointsArr);

        // TSP requires that all nodes are reachable
        // we check if -1 is found in the adjacency matrix, indicating a node is unreachable
        // findPos returns index if value is found in an array, otherwise will return -1
        // if there is an unreachable point, throw error
        let blockedChecker = findPos(adj[0][0], -1);
        if (blockedChecker !== -1) {
            this.setState({unreachableNode:true});
            return null;
        } else if (blockedChecker === -1) {
            this.setState({unreachableNode:false});
        }

        // takes in adjacency matrix of the destired points, and the index of start and end nodes (optional, if no end node is supplied, start node will be considered the end node automatically)
        let fin = runTSP(adj[0],start,end);

        // store the results in the state of the component
        this.setState({
            adjMat: adj[0],
            adjPathMat: adj[1],
            pathDist: fin[0],
            pathMat: fin[1]
        });

        // if all validations have passed, display the results
        this.setState({displayResults:true});
    }

    render() {
        return(
            <div>
                <Button onClick={() => this.runTSPonClick(this.props.maze, this.props.pointsArr, this.props.start, this.props.end)}>Run TSP</Button>
                {this.state.missingStart ? <div>Please select a starting node!</div> : null}
                {this.state.missingEnd ? <div>Ending node not selected. Default ending node will be set to starting node.</div> : null}
                {this.state.tooShort ? <div>Please select more than one point.</div> : null}
                {this.state.unreachableNode ? <div>One or more of the selected points cannot be reached! Please fix before results can be displayed.</div> : null}
                {this.state.displayResults ? <div>Total distance: {this.state.pathDist}. Optimal path: {this.state.pathMat}</div> : null}
            </div>
        )
    }
}

export default Result;