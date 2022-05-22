import { Component } from "react";
import Container from 'react-bootstrap/Container'

class Footer extends Component {

    // if validations pass, component will render
    render () {
        return (
            <Container>
                <hr/>
                <div>This is a footer</div>
            </Container>
        )
    }
}

export default Footer;