import React, {lazy} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AuthRoute from "./AuthRoutes";

const Login = lazy(() => import("../Components/Auth/Login"));
const Dashboard = lazy(() => import("../Components/User/Dashboard"));

function FrontRoutes({match}) {
    return (
        <div>
            {/*Header*/}
            <FrontLayout/>

            <Switch>
                <Route exact path={`${match.url}`} component={Login}/>
                <AuthRoute path={`${match.url}dashboard`} component={Dashboard}/>
                <Redirect to="/error"/>
            </Switch>
            {/*Footer*/}
            <Footer/>
        </div>
    );
}

export default FrontRoutes;
