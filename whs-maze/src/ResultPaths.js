import { Component } from "react";
import './styles/ResultPaths.scss';

class ResultPaths extends Component {
    constructor () {
        super();

        this.showPath = this.showPath.bind(this);
        this.hidePath = this.hidePath.bind(this);
    }

    // easiest way to show path. Modify cell by id
    showPath(path) {
        for (let i=0; i<path.length; i++) {
            let curr = document.getElementById('cell'+path[i][0]+path[i][1]);
            curr.style.borderColor = '#721817'
        }
    }

    // undoing the changes made in the showPath method
    hidePath(path) {
        for (let i=0; i<path.length; i++) {
            let curr = document.getElementById('cell'+path[i][0]+path[i][1]);
            curr.style.borderColor = ''
        }
    }

    // if validations pass, component will render
    render () {
        return (
            <div className="path-desc">Node Traversal Path:
                {this.props.resPaths.map((path,ind) => {
                    return (
                        <div className="link-wrapper">
                            <div className="path-text link hover-2" key={ind} onMouseEnter={() => this.showPath(path)} onMouseLeave={() => this.hidePath(path)}>
                                {this.props.resNodes[ind][0]} → {this.props.resNodes[ind][1]}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ResultPaths;