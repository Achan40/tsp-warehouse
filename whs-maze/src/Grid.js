import { Component } from "react";
import Cell from "./Cell";
import 'bootstrap/dist/css/bootstrap.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

class Grid extends Component {
    constructor() {
        super();
        this.arr = 
        [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]]

        this.state = {
            currentButton: null
        }

        // bind custom method
        this.toggleCell = this.toggleCell.bind(this)
        this.setCurrent = this.setCurrentButton.bind(this)
    }

    // setting the current toggled button
    setCurrentButton(val) {
        this.setState({currentButton: val})
    }

    // changing state of parent component based on event in child component
    // passing the toggleCell method to child component, which will then trigger (and check validations) based on an event
    toggleCell(row, col, val) {
        this.arr[row][col] = val
        this.forceUpdate()
    }

    // render the grid
    // use a nested loop to generate each cell, set the key of each cell to the index of the cell in the initial array
    render() {
        return (
            <div>
                <div>{this.state.currentButton}</div>
                <ToggleButtonGroup type="radio" name="options" onChange={(event) => {this.setCurrentButton(event);}}>
                    <ToggleButton id="one" value={"Points"}>Place Points</ToggleButton>
                    <ToggleButton id="two" value={"Walls"}>Place Walls</ToggleButton>
                    <ToggleButton id="three" value={"Start"}>Set Start</ToggleButton>
                    <ToggleButton id="three" value={"End"}>Set End</ToggleButton>
                </ToggleButtonGroup>

                <div className="grid">
                    {this.arr.map((row,rowInd) => {
                        return (
                            <div className="gridrow" key={rowInd}>
                                {row.map((value,colInd) => <Cell val={this.arr[rowInd][colInd]} key={[rowInd,colInd]} ind={[rowInd,colInd]} currentButton={this.state.currentButton} toggleCell={this.toggleCell}/>)}
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}

export default Grid