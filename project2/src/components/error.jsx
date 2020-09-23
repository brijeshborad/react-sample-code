import React, {Component, Fragment} from "react";
import {NavLink} from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'


class Error extends Component {
    componentDidMount() {
        document.body.classList.add("background");
    }

    componentWillUnmount() {
        document.body.classList.remove("background");
    }

    render() {
        return (
            <Fragment>
                <div className="fixed-background"/>
                <main>
                    <div className="container">
                        <Row className="h-100">
                            <Col xs="12" md="10" className="mx-auto my-auto">
                                <Card className="auth-card">
                                    <CardHeader>
                                        Ooops... looks like an error occurred!
                                    </CardHeader>
                                    <CardBody>
                                        <div className="form-side">
                                            <NavLink to={`/`} className="white">
                                                <span className="logo-single"/>
                                            </NavLink>
                                            <p className="mb-0 text-muted text-small mb-0">
                                                Error code
                                            </p>
                                            <p className="display-1 font-weight-bold mb-5">404</p>
                                            <Button href="/app" color="primary" className="float-right" size="sm">
                                                GO BACK HOME
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </main>
            </Fragment>
        );
    }
}

export default Error;
