import { Component } from "react";
import './styles/Cell.css';

class Cell extends Component {
    constructor() {
        super();
        this.state = {
            activePoint: false,
            startPoint: false,
            endPoint: false,
            cellColor: "white"
        };

        // bind custom methods
        this.checkToggle = this.checkToggle.bind(this);
        this.resetCell = this.resetCell.bind(this);
    }

    // undo all state changes of an active cell
    resetCell(r,c) {
        if (this.state.startPoint === true) {
            this.props.toggleStart(r,c,'remove');
        }
        if (this.state.endPoint === true) {
            this.props.toggleEnd(r,c,'remove');
        }
        this.setState({ 
            activePoint: false,
            startPoint: false,
            endPoint: false,
            cellColor: "white"
        });
        this.props.togglePoint(r,c,'remove');
    }

    // Perform different actions based on what current toggle is active
    checkToggle() {
        // row index and column index, each cell has these indicies passed to them as props
        let r = this.props.ind[0];
        let c = this.props.ind[1];

        // if the "Walls" button is selected, the user can add or remove walls
        // walls can only be added on cells that are not active
        if (this.props.currentButton === "Walls") {
            if (this.state.activePoint === true) {
                console.log("remove active point before placing a wall!");
            } else if (this.props.val === 0) {
                this.props.toggleWall(r,c,1);
                this.setState({ cellColor:"black" });
            } else if (this.props.val === 1) {
                this.props.toggleWall(r,c,0);
                this.setState({ cellColor:"white" });
            }
        }
        
        // if the "Points" button is selected, the user can add or remove points
        // points can only added on cells that are not active and are not already walls
        if (this.props.currentButton === "Points") {
            if (this.props.val === 1) {
                console.log("remove wall before placing a point!");
            } else if (this.props.val === 0 && this.state.activePoint === false) {
                this.props.togglePoint(r,c,'add');
                this.setState({ cellColor:"blue" });
                this.setState({ activePoint:true });
            } else if (this.state.activePoint === true) {
                this.resetCell(r,c);
            }
        }
        
        // if the "Start" button is selected, the user can choose which active cell is the starting cell
        // only a single cell can be considered a starting cell, and a starting cell must be selected
        // logic is in place to handle flows if the selected cell is already selected as the ending cell
        if (this.props.currentButton === "Start") {
            if (this.state.activePoint === true && this.state.startPoint === false  && this.props.s.length < 1) {
                if (this.state.endPoint === true) {
                    this.props.toggleEnd(r,c,'remove');
                    this.props.toggleStart(r,c,'add');
                    this.setState({ cellColor:"green" });
                    this.setState({ endPoint:false });
                    this.setState({ startPoint:true });
                } else {
                    this.props.toggleStart(r,c,'add');
                    this.setState({ cellColor:"green" });
                    this.setState({ startPoint:true });
                }
            } else if (this.state.startPoint === true) {
                this.resetCell(r,c);
                this.props.togglePoint(r,c,'add');
                this.setState({ cellColor:"blue" });
                this.setState({ activePoint:true });
            }
        }
        
        // if the "End" button is selected, the user can choose which active cell is the ending cell
        // only a single cell can be considered an ending cell
        // logic is in place to handle flows if the selected cell is already selected as the starting cell
        // and ending is optional, if none is selected, the starting cell will automatically be considered the ending cell as well
        if (this.props.currentButton === "End") {
            if (this.state.activePoint === true && this.state.endPoint === false && this.props.e.length < 1) {
                if (this.state.startPoint === true) {
                    this.props.toggleStart(r,c,'remove');
                    this.props.toggleEnd(r,c,'add');
                    this.setState({ cellColor:"red" });
                    this.setState({ startPoint:false });
                    this.setState({ endPoint:true });
                } else {
                    this.props.toggleEnd(r,c,'add');
                    this.setState({ cellColor:"red" });
                    this.setState({ endPoint:true });
                }
            } else if (this.state.endPoint === true) {
                this.resetCell(r,c);
                this.props.togglePoint(r,c,'add');
                this.setState({ cellColor:"blue" });
                this.setState({ activePoint:true });
            }
        }
    }

    render() {
        return (
            <div className="cell" id={"cell"+this.props.ind[0].toString()+this.props.ind[1].toString()} onClick={this.checkToggle} style={{backgroundColor:this.state.cellColor}}>{this.props.pos}</div>
        )
    }
}

export default Cell;