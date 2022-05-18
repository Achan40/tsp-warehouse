import { Component } from "react";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

class ResultPaths extends Component {
    constructor () {
        super();

    }

    // if validations pass, component will render
    render () {
        return (
            <div>
                {this.props.resPaths}
            </div>
        )
    }
}

export default ResultPaths;