import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import Maintenance from '../../components/landing/Maintenance';
import './Landing.scss';
import Header from "../../components/headers/Header";

class Landing extends Component {
    constructor(props) {
        super(props);
        console.log("received " + JSON.stringify(this.props.location));
    }

    render() {
        return (
            <>
                <Header/>
                <div className="main-wrapper">
                    <Container>
                        <Maintenance/>
                    </Container>
                </div>
            </>
        )
    }
}

export default Landing;
