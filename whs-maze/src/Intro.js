import { Component } from "react";
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

class Intro extends Component {

    // if validations pass, component will render
    render () {
        return (
            <Container>
                <Card bg='light' className="cust-card">
                    <Card.Body>
                        <Card.Title>Introduction</Card.Title>
                        <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae varius sapien. Nunc eu libero imperdiet erat efficitur pretium. Sed placerat aliquet augue, nec fermentum mauris pulvinar vel. Integer volutpat, lorem id faucibus mattis, ex augue molestie justo, nec ornare tortor libero a eros. Pellentesque in viverra dolor. Aenean faucibus ullamcorper varius. Ut quis est eget leo elementum malesuada vel a tortor. Donec rutrum ipsum a nunc lobortis, ac commodo justo posuere. Sed venenatis dignissim commodo. Sed sit amet nulla nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla id varius augue. Pellentesque fermentum augue nec tortor facilisis hendrerit. Ut rutrum ipsum id eros convallis, sed pellentesque tellus ullamcorper.</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Intro;