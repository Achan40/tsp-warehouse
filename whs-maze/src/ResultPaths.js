import { Component } from "react";

class ResultPaths extends Component {
    constructor () {
        super();

        this.showPath = this.showPath.bind(this);
        this.hidePath = this.hidePath.bind(this);
    }

    // easiest way to show path. Modify cell by id, using a style element that does not override a previously used style
    showPath(path) {
        for (let i=0; i<path.length; i++) {
            let curr = document.getElementById('cell'+path[i][0]+path[i][1]);
            curr.style.borderStyle = 'solid'
            curr.style.borderColor = 'pink'
        }
    }

    // undoing the changes made in the showPath method
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
                        <div key={ind} onMouseEnter={() => this.showPath(path)} onMouseLeave={() => this.hidePath(path)}>
                            {this.props.resNodes[ind][0]} → {this.props.resNodes[ind][1]}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ResultPaths;