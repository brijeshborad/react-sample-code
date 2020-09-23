import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import React, {lazy, Suspense, Component, useEffect} from "react";
import ApiService from "../service/ApiService";
import {banners} from '../service/constants'

const Landing = lazy(() => import("../containers/Landing/Landing"));
// const Header = lazy(() => import("../components/headers/LandingHeader"));
const NotFound = lazy(() => import("../components/NotFound"));
const Home = lazy(() => import("../containers/Home/Home"));
const SocietyDetails = lazy(() => import("../containers/SocietyDetails/SocietyDetails"));
const Plans = lazy(() => import("../containers/Plans/Plans"));
const ContactUs = lazy(() => import("../containers/ContactUs/ContactUs"));
const HowItWorks = lazy(() => import("../containers/HowItWorks/HowItWorks"));


class LoadingComponent extends Component {
    render() {
        return (
            <div className="loader-img">
                <img src={`/images/logo.svg`} alt="Loader"/>
            </div>
        );
        // return <div/>;
    }
}

function Routes() {

    useEffect(() => {
        ApiService.callGet('/public/banners').then((bannersResponse) => {
            banners.length = 0;
            banners.push(...bannersResponse)
            console.log(bannersResponse)
        })
    }, [])

    return (
        <Router>
            <Suspense fallback={<LoadingComponent/>}>
                {/*<Header/>*/}
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/search" component={Landing}/>
                    <Route path="/society-details/:id?" component={SocietyDetails}/>
                    <Route path="/plans" component={Plans}/>
                    <Route path="/contact-us" component={ContactUs}/>
                    <Route path="/how-it-works" component={HowItWorks}/>
                    <Route exact path="/error" render={props => <NotFound {...props}/>}/>
                    <Redirect to="/error"/>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default Routes
