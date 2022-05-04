import { Component } from "react";
import Cell from './Cell';

class Grid extends Component {
    constructor() {
        super();
        this.arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]

    }

    // render the grid
    // use a nested loop to generate each cell, set the key of each cell to the index of the cell in the initial array
    render() {
        return (
            <div className="grid">
                {this.arr.map((row,rowInd) => {
                    return (
                        <div className="gridrow" key={rowInd}>
                            {row.map((value,colInd) => <Cell val={value} key={rowInd.toString()+colInd.toString()} ind={[rowInd,colInd]}/>)}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Grid