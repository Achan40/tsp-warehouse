import { Component } from "react";
import Cell from "./Cell";
import Result from "./Result";
import 'bootstrap/dist/css/bootstrap.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

class Grid extends Component {
    constructor() {
        super();

        // array of binary maze, initiate with no walls.
        this.maze = 
        [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]]


        this.state = {
            currentButton: null,
        }

        // dictionary of destinations to visit
        // dictionary is needed so that if we can remove a destination by key if we need to
        this.points = {}

        // array for start and end point
        // a single start point is required, end point is optional
        this.start = []
        this.end = []

        // bind custom methods
        this.setCurrentButton = this.setCurrentButton.bind(this);
        this.toggleWall = this.toggleWall.bind(this);
        this.togglePoint = this.togglePoint.bind(this);
        this.toggleStart = this.toggleStart.bind(this);
        this.toggleEnd = this.toggleEnd.bind(this);
    }

    // setting the current toggled button
    setCurrentButton(val) {
        this.setState({currentButton: val})
    }

    // changing state of parent component based on event in child component
    // passing the toggleCell method to child component, which will then trigger (and check validations) based on an event
    // utilized in child component
    toggleWall(row, col, val) {
        this.maze[row][col] = val
        this.forceUpdate()
    }

    // add destination points to a dictionary
    // remove if a point is unselected
    // utilized in child component
    togglePoint(row, col, action) {
        let key = row.toString() + col.toString()
        if (action === "add") {
            this.points[key] = [row,col]
            this.forceUpdate()
        } else if (action === "remove") {
            delete this.points[key]
            this.forceUpdate()
        }
    }

    // managing the start point
    // utilized in child component
    toggleStart(row, col, action) {
        if (action === "add") {
            this.start = [row,col]
            this.forceUpdate()
        } else if (action === "remove") {
            this.start = []
            this.forceUpdate()
        }
    }

    // managing the end point
    // utilized in child component
    toggleEnd(row, col, action) {
        if (action === "add") {
            this.end = [row,col]
            this.forceUpdate()
        } else if (action === "remove") {
            this.end = []
            this.forceUpdate()
        }
    }

    // render the grid
    // use a nested loop to generate each cell, set the key of each cell to the index of the cell in the initial array
    render() {
        return (
            <div>
                <div>{this.state.currentButton}</div>
                <ToggleButtonGroup type="radio" name="options" onChange={(event) => {this.setCurrentButton(event);}}>
                    <ToggleButton id="one" value={"Points"}>Place/Remove Points</ToggleButton>
                    <ToggleButton id="two" value={"Walls"}>Place/Remove Walls</ToggleButton>
                    <ToggleButton id="three" value={"Start"}>Set Start</ToggleButton>
                    <ToggleButton id="four" value={"End"}>Set End</ToggleButton>
                </ToggleButtonGroup>

                <div className="grid">
                    {this.maze.map((row,rowInd) => {
                        return (
                            <div className="gridrow" key={rowInd}>
                                {row.map((value,colInd) => <Cell val={this.maze[rowInd][colInd]} key={[rowInd,colInd]} ind={[rowInd,colInd]} currentButton={this.state.currentButton} toggleWall={this.toggleWall} togglePoint={this.togglePoint} toggleStart={this.toggleStart} toggleEnd={this.toggleEnd} s={this.start} e={this.end}/>)}
                            </div>
                        )
                    })}
                </div>

                <Result maze={this.maze} points={this.points} start={this.start} end={this.end}/>
            </div>
        )
    }
}

export default Grid