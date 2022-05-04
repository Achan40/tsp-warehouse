import { Component } from "react";

class Cell extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props.ind)
        return(
            <div className="cell">{this.props.ind}</div>
        )
    }
}

export default Cell