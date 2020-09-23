import React, {Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

const ViewStart = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './start')
);
const Start = ({match}) => (
    <Suspense fallback={<div className="loading"/>}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/start`}/>
            <Route
                path={`${match.url}/start`}
                render={props => <ViewStart {...props} />}
            />
            <Redirect to="/error"/>
        </Switch>
    </Suspense>
);
export default Start;
