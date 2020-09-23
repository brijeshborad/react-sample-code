import React, {useContext} from "react";
import AuthContext from "../Auth/AuthContext";
import {Redirect, Route} from "react-router-dom";
import * as JWT from 'jwt-decode';

const AuthRoute = ({component: Component, ...rest}) => {
    const currentUser = useContext(AuthContext);
    return (
        <Route {...rest} render={props => {
            if (!currentUser || !currentUser.authenticated) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{pathname: '/', state: {from: props.location}}}/>
            } else {
                const decodeJWT = JWT(currentUser.accessToken);
                if (decodeJWT.exp < +new Date()) {
                    currentUser.logout(false);
                    // Token expired so redirect to login page with the return url
                    return <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                } else {
                    // authorised so return component
                    return <Component {...props} />
                }
            }
        }}/>
    );
};

export default AuthRoute
