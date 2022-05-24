import { Component } from "react";
import { adjMatricies } from "./helpers/adjmat.js";
import { findPos } from "./helpers/extra.js";
import { runTSP } from "./helpers/tsp.js";
import ResultPaths from "./ResultPaths.js";
import Button from 'react-bootstrap/Button';
import './styles/Result.css';

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
            nodeDist: null,
            nodePaths: null,

            resNodes: null,
            resPaths: null
        };

        // bind custom methods
        this.runTSPonClick = this.runTSPonClick.bind(this);
        this.findPaths = this.findPaths.bind(this);
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
            nodeDist: fin[0],
            nodePaths: fin[1]
        });

        // find the optimal path, generate using adjPathMat(adj matrix where values are the paths between two nodes) and nodePaths (optimal node order traversal)
        this.findPaths(adj[1], fin[1], end);

        // if all validations have passed, display the results
        this.setState({displayResults:true});
    }

    // get a list of the optimal paths to travel
    findPaths (adjPathMat, nodePaths, end) {
        // initiate the array of paths we traverse during TSP
        let tmp = [];
        let tmp2 = [];
        
        // find the cells we traverse using adjPathMat, which is an adjacency matrix where each value is an array of paths from one node to the next
        let initial = nodePaths[0];
        
        // if end node array is selected, the nodePaths array will have two extra entries at the end
        // the dummy node and the start node. We must account for these placeholders.
        if (typeof(end) === 'number') {
            for (let i=1; i<nodePaths.length-2; i++) {
                tmp.push(adjPathMat[initial][nodePaths[i]]);
                tmp2.push([initial,nodePaths[i]])
                initial = nodePaths[i];
            }
        } else {
            for (let i=1; i<nodePaths.length; i++) {
                tmp.push(adjPathMat[initial][nodePaths[i]]);
                tmp2.push([initial,nodePaths[i]])
                initial = nodePaths[i];
            }
        }
        
        this.setState({
            resNodes: tmp2,
            resPaths: tmp
        })
    }

    render() {
        return (
            <div>
                <Button className="gen-res-button" onClick={() => this.runTSPonClick(this.props.maze, this.props.pointsArr, this.props.start, this.props.end)}>Run TSP</Button>
                {this.state.missingStart ? <div className="error-text">Please select a starting node!</div> : null}
                {this.state.missingEnd ? <div className="error-text">Ending node not selected. Default ending node will be set to starting node if it exists.</div> : null}
                {this.state.tooShort ? <div className="error-text">Please select more than one point.</div> : null}
                {this.state.unreachableNode ? <div className="error-text">One or more of the selected nodes cannot be reached! Please fix before results can be displayed.</div> : null}
                {this.state.displayResults ? <div className="error-text total-dist">Total Distance: {this.state.nodeDist} Units</div> : null}
                {this.state.displayResults ? <ResultPaths resNodes={this.state.resNodes} resPaths={this.state.resPaths}/> : null}        
            </div>
        )
    }
}

export default Result;