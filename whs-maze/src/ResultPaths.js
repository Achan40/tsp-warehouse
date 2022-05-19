import { Component } from "react";
import Button from 'react-bootstrap/Button'

class ResultPaths extends Component {
    constructor () {
        super();

        this.showPath = this.showPath.bind(this);
        this.hidePath = this.hidePath.bind(this);
    }

    showPath(path) {
        for (let i=0; i<path.length; i++) {
            let curr = document.getElementById('cell'+path[i][0]+path[i][1]);
            curr.style.borderStyle = 'solid'
            curr.style.borderColor = 'pink'
        }
    }

    hidePath(path) {
        for (let i=0; i<path.length; i++) {
            let curr = document.getElementById('cell'+path[i][0]+path[i][1]);
            curr.style.borderStyle = ''
            curr.style.borderColor = ''
        }
    }

    // if validations pass, component will render
    render () {
        return (
            <div>
                {this.props.resPaths.map((path,ind) => {
                    return (
                        <Button key={ind} onMouseEnter={() => this.showPath(path)} onMouseLeave={() => this.hidePath(path)}>
                            {this.props.resNodes[ind][0]} → {this.props.resNodes[ind][1]} : {path}
                        </Button>
                    )
                })}
            </div>
        )
    }
}

export default ResultPaths;