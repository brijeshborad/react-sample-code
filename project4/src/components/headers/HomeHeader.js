import './HomeHeader.scss';
import React from "react";
import {Link} from "react-router-dom";

function HomeHeader() {
    return (
        <header className="landing-header">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg col-lg-12">
                        <Link className="navbar-brand" to="/">
                            <img src="/images/logo.svg" alt="..."/>
                        </Link>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                                data-target="#navb">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navb">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/how-it-works">How it works</Link>
                                    {/*<a className="nav-link" href="/how-it-works">How it works</a>*/}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/plans">Plans</Link>
                                    {/*<a className="nav-link" href="#">Plans</a>*/}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact-us">Contact us</Link>
                                </li>
                            </ul>
                            {/*<form className="sign-in-btn">*/}
                            {/*    <a href="#" className="btn orange-btn small">Sign In</a>*/}
                            {/*</form>*/}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default HomeHeader;
