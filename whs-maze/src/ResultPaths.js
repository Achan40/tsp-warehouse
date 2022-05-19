import { Component } from "react";
import Button from 'react-bootstrap/Button'

class ResultPaths extends Component {
    constructor () {
        super();

        this.showPath = this.showPath.bind(this);
        this.hidePath = this.hidePath.bind(this);
    }

    showPath() {
        let tmp = document.getElementById('cell00')
        tmp.style.borderStyle = 'solid'
        tmp.style.borderColor = 'pink'
        console.log('mouse enter')
    }

    hidePath() {
        let tmp = document.getElementById('cell00')
        tmp.style.borderStyle = ''
        tmp.style.borderColor = ''
        console.log('mouse out')
    }

    // if validations pass, component will render
    render () {
        return (
            <div>
                {this.props.resPaths.map((path,ind) => {
                    return (
                        <Button key={ind} onMouseEnter={this.showPath} onMouseLeave={this.hidePath}>
                            {this.props.resNodes[ind][0]} -> {this.props.resNodes[ind][1]} : {path}
                        </Button>
                    )
                })}
            </div>
        )
    }
}

export default ResultPaths;