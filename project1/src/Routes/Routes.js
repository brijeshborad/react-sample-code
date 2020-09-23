import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import React, {Component, lazy, Suspense} from "react";
import './Routes.scss';
import Auth from "../Auth/Auth";
import FrontRoutes from "./FrontRoutes";
import ToasterService from "../Services/ToasterService";

const NotFound = lazy(() => import("../Layout/NotFound/NotFound"));

ToasterService.Configure();

class LoadingComponent extends Component {
    render() {
        return (
            <div className="loader-img">
                <img src={`${process.env.REACT_APP_BASE_URL}/images/loader.gif`} alt="Loader"/>
            </div>
        );
    }
}

class Routes extends Component {
    render() {
        return (
            <Router basename={process.env.REACT_APP_BASE_URL}>
                <Auth>
                    <Suspense fallback={<LoadingComponent/>}>
                        <Switch>
                            <Route exact path="/error" render={props => <NotFound {...props}/>}/>
                            <Route path="/" render={props => <FrontRoutes {...props}/>}/>
                            <Redirect to="/error"/>
                        </Switch>
                    </Suspense>
                </Auth>
            </Router>
        )
    }
}

export default Routes
