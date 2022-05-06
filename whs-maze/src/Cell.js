import { Component } from "react";

class Cell extends Component {
    constructor() {
        super();
        this.state = {

            cellColor: "white"
        }

        // bind custom method
        this.checkToggle = this.checkToggle.bind(this)
    }

    // checking validations then call the method from the parent conditionally, change the value in the parent array by index
    // we do this so that we can check validations at the and change the color of each individual cell
    checkToggle() {
        if (this.props.currentButton === "Walls" && this.props.val === 0) {
            this.props.toggleCell(this.props.ind[0],this.props.ind[1],1);
            this.setState({ cellColor:"black"})
        } else if (this.props.currentButton === "Walls" && this.props.val === 1) {
            this.props.toggleCell(this.props.ind[0],this.props.ind[1],0)
            this.setState({ cellColor:"white"})
        }
    }

    render() {
        return(
            <div className="cell" onClick={this.checkToggle} style={{backgroundColor:this.state.cellColor}}>{this.props.val}</div>
        )
    }
}

export default Cell