import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Intro extends Component {

    // if validations pass, component will render
    render () {
        return (
            <Container>
                <Card bg='light' className="cust-card">
                    <Card.Body>
                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <Card.Title>Introduction</Card.Title>
                            <Card.Text className="intro-text">
                                The <a class="footer-link" href="https://en.wikipedia.org/wiki/Travelling_salesman_problem" target="_blank" rel="noreferrer">Traveling Salesman Problem (TSP)</a> seeks to determine the shortest path to reach each target location exactly once and return to the starting node. 
                                This project is my attempt at solving the TSP, and is inspired by warehouse operations at my workplace. The goal is to identify the best path to take 
                                to pick up a number of goods, and return them not only to a set starting point, but also a desired end point if one is selected.
                            </Card.Text>

                            <Card.Title>Quick Start Guide</Card.Title>
                            <Card.Text className="intro-text">
                                This app is modeled after a maze. A user can select the desired nodes they want to reach in the maze traversal, and even place barriers to impede movement.
                                A number of validations are checked upon submission, assiting the user with providing the correct inputs.
                            </Card.Text>
                        </Col>
                    
                        <Col md={6}>
                            <ul className="bullet-list">
                                <li>Walls and destination nodes can be placed/removed by clicking on the corresponding toggle button, and then clicking on the cell</li>
                                <li>Start/end can only be placed/removed on an active destination node</li>
                                <li>If no end node is selected, the final destination will default to the selected starting node</li>
                                <li>Select the "Run TSP" button to display the results</li>
                                <li>Hovering over a traversal path will display the path taken from one node to another on the maze.</li>
                                <li className="bullet-warning">It is NOT RECOMMENDED to select more than 10 destination nodes</li>
                            </ul>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Intro;