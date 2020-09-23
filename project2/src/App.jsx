import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import ToasterService from "./Services/ToasterService";
import Loader from './layouts/loader'

const ViewAuth = React.lazy(() =>
    import(/* webpackChunkName: "views-user" */ './components/auth')
);
const ViewError = React.lazy(() =>
    import(/* webpackChunkName: "views-error" */ './components/error')
);

ToasterService.Configure();

const AuthRoute = ({component: Component, authUser, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                authUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
};

const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
};

class App extends Component {
    render() {
        const {loginUser} = this.props;

        return (
            <React.Fragment>
                <Suspense fallback={<Loader/>}>
                    <Router basename={process.env.REACT_APP_BASE_URL}>
                        <Route component={ScrollToTop}/>
                        <Switch>
                            <Route
                                path="/auth"
                                render={props => !loginUser ? (
                                    <ViewAuth {...props} />
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/app',
                                            state: {from: props.location}
                                        }}
                                    />
                                )}
                            />
                            <Route
                                path="/error"
                                exact
                                render={props => <ViewError {...props} />}
                            />
                            <Redirect from="/" to="/app"/>
                            <Redirect to="/error"/>
                        </Switch>
                    </Router>
                </Suspense>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user: loginUser} = authUser;
    return {loginUser};
};
const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(App);
