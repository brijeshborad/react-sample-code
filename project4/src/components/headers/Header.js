import React from 'react';
import {Navbar, Container, Row, Nav} from 'react-bootstrap';
import './Header.scss';
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <Container>
                <Row>
                    <Navbar variant="dark" expand="lg" className="col-lg-12">
                        <Navbar.Brand as={Link} to="/">
                            <img src="/images/logo.svg" alt="..."/>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/how-it-works">How it works</Nav.Link>
                                <Nav.Link as={Link} to="/plans">Plans</Nav.Link>
                                <Nav.Link as={Link} to="/contact-us">Contact us</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        {/*<Form inline>*/}
                        {/*    <button className="btn btn-link">Login</button>*/}
                        {/*    <button className="btn btn-white">Sign up</button>*/}
                        {/*</Form>*/}
                    </Navbar>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
