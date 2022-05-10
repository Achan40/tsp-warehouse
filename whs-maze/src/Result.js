import { Component } from "react";
import Button from 'react-bootstrap/Button'

class Result extends Component {
    constructor() {
        super();

        // bind custom methods
        this.runTSP = this.runTSP.bind(this);
    }

    runTSP(event) {
        console.log(event)
    }

    render() {
        return(
            <Button onClick={() => this.runTSP(this.props.arr)}>Run TSP</Button>
        )
    }
}

export default Result