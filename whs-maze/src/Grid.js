import { Component } from "react";
import Cell from './Cell';

class Grid extends Component {
    constructor() {
        super();
        this.arr = 
        [[1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1 ],
        [1, 1, 1, 0, 1, 1, 0, 1, 0, 1 ],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
        [1, 1, 0, 0, 0, 0, 1, 0, 0, 1 ]]

        // bind custom method
        this.getUpdate = this.getUpdate.bind(this)
    }

    // changing state of parent component based on even in child component
    // passing the getUpdate method to child component, which will then trigger based on an event
    getUpdate(row,col) {
        console.log(row,col);
        this.arr[row][col] = 9;
        this.forceUpdate()
    }

    // render the grid
    // use a nested loop to generate each cell, set the key of each cell to the index of the cell in the initial array
    render() {
        return (
            <div className="grid">
                {this.arr.map((row,rowInd) => {
                    return (
                        <div className="gridrow" key={rowInd}>
                            {row.map((value,colInd) => <Cell val={this.arr[rowInd][colInd]} key={rowInd.toString()+colInd.toString()} ind={[rowInd,colInd]} getUpdate={this.getUpdate}/>)}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Grid