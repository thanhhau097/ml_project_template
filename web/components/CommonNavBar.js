import React from "react"
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

class CustomNavBar extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">OCR Service</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default CustomNavBar