import { Component } from "react";
import { convertPoints } from "./helpers/adjmat.js";
import { findPos } from "./helpers/extra.js";
import Cell from "./Cell";
import Result from "./Result";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Grid.css';


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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]];


        this.state = {
            currentButton: null,
        };

        // Map of destinations to visit
        // Map is needed so that if we can remove a destination by key if we need to, and it maintains insertion order, dicitonaries do not
        this.points = new Map();

        // array of the values of the this.points Map. 
        // we need this to track the index of a node in this list, to designate a selected node as node 0,1,2,3 etc.
        // this works because insertion of non-int keys in ES2015 and later maintain insertion order
        this.pointsArr = null;

        // array for start and end point
        // a single start point is required, end point is optional
        this.start = [];
        this.end = [];

        // bind custom methods
        this.setCurrentButton = this.setCurrentButton.bind(this);
        this.toggleWall = this.toggleWall.bind(this);
        this.togglePoint = this.togglePoint.bind(this);
        this.toggleStart = this.toggleStart.bind(this);
        this.toggleEnd = this.toggleEnd.bind(this);
    }

    // setting the current toggled button
    setCurrentButton(val) {
        this.setState({currentButton: val});
    }

    // changing state of parent component based on event in child component
    // passing the toggleCell method to child component, which will then trigger (and check validations) based on an event
    // utilized in child component
    toggleWall(row, col, val) {
        this.maze[row][col] = val;
        this.forceUpdate();
    }

    // add destination points to a Map
    // remove if a point is unselected
    // convert Map of points into array of Map values. Need to do this so we can track ind of node
    // utilized in child component
    togglePoint(row, col, action) {
        let key = row.toString() + col.toString();
        if (action === "add") {
            this.points.set(key,[row,col]);
        } else if (action === "remove") {
            this.points.delete(key);
        }
        
        this.pointsArr = convertPoints(this.points);
        this.forceUpdate();
    }

    // managing the start point
    // utilized in child component
    toggleStart(row, col, action) {
        if (action === "add") {
            this.start = [row,col];
        } else if (action === "remove") {
            this.start = [];
        }
        this.forceUpdate();
    }

    // managing the end point
    // utilized in child component
    toggleEnd(row, col, action) {
        if (action === "add") {
            this.end = [row,col];
        } else if (action === "remove") {
            this.end = [];
        }
        this.forceUpdate();
    }

    // render the grid
    // use a nested loop to generate each cell, set the key of each cell to the index of the cell in the initial array
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card bg='light' className="cust-card">
                                <Card.Body>
                                    <ToggleButtonGroup type="radio" name="options" onChange={(event) => {this.setCurrentButton(event)}}>
                                        <ToggleButton className="toggle-select" variant="secondary" id="one" value={"Points"}>Place/Remove Nodes</ToggleButton>
                                        <ToggleButton className="toggle-select" variant="secondary" id="two" value={"Walls"}>Place/Remove Walls</ToggleButton>
                                        <ToggleButton className="toggle-select" variant="secondary" id="three" value={"Start"}>Set Start</ToggleButton>
                                        <ToggleButton className="toggle-select" variant="secondary" id="four" value={"End"}>Set End</ToggleButton>
                                    </ToggleButtonGroup>

                                    <Container className="grid-maze">
                                        <div className="grid">
                                            {this.maze.map((row,rowInd) => {
                                                return (
                                                    <div className="gridrow" key={rowInd}>
                                                        {row.map((value,colInd) => <Cell 
                                                        val={this.maze[rowInd][colInd]} 
                                                        key={[rowInd,colInd]} 
                                                        ind={[rowInd,colInd]}
                                                        pos={findPos(this.pointsArr, [rowInd,colInd])}
                                                        currentButton={this.state.currentButton}
                                                        s={this.start}
                                                        e={this.end}
                                                        toggleWall={this.toggleWall} 
                                                        togglePoint={this.togglePoint} 
                                                        toggleStart={this.toggleStart} 
                                                        toggleEnd={this.toggleEnd} 
                                                        />)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card bg='light' className="cust-card">
                                <Card.Body>
                                    <Result maze={this.maze} pointsArr={this.pointsArr} start={this.start} end={this.end}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
                        
                    
        )
    }
}

export default Grid;