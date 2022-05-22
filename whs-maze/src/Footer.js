import { Component } from "react";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

class Footer extends Component {

    // if validations pass, component will render
    render () {
        return (
            <Container className="tsp-footer">
                <hr/>
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="https://github.com/Achan40" target="_blank" style={{color:'red'}}>GitHub</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="https://www.linkedin.com/in/aaron-chan-30393115a/" target="_blank">LinkedIn</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        )
    }
}

export default Footer;