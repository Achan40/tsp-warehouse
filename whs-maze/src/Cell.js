import { Component } from "react";

class Cell extends Component {
    constructor() {
        super();

        // bind custom method
        this.toggleCell = this.toggleCell.bind(this)
    }

    toggleCell() {
        this.props.getUpdate(this.props.ind[0],this.props.ind[1]);
    }

    render() {
        return(
            <div className="cell" onClick={this.toggleCell}>{this.props.val}</div>
        )
    }
}

export default Cell