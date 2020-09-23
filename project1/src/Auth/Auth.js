import React, {Component} from "react";
import {AuthProvider} from "./AuthContext";
import {getSessionCookie, setSessionCookie} from "../Utils/Session";
import {withRouter} from "react-router";

class Auth extends Component {
    state = getSessionCookie();

    initiateLogin = (response) => {
        this.handleAuthentication(response).then(() => {
            if (this.state.authenticated) {
                this.props.history.push('/user/dashboard');
            } else {
                this.props.history.push('/');
            }
        });
    };

    logout = (redirect = true) => {
        const session = {
            authenticated: false,
            user: {
                role: "visitor"
            },
            accessToken: ""
        };
        localStorage.clear();
        this.setState(session, () => {
            if (redirect) {
                this.props.history.push('/');
            }
        });
    };

    handleAuthentication = (response) => {
        return new Promise((resolve) => {

            const session = getSessionCookie();
            let authToken = '';
            let refreshToken = ''

            if (response.authToken) {
                authToken = response.authToken;
            } else {
                if (session && session.accessToken) {
                    authToken = session.accessToken;
                }
            }

            if (response.refreshToken) {
                refreshToken = response.refreshToken;
            } else {
                if (session && session.refreshToken) {
                    refreshToken = session.refreshToken;
                }
            }

            this.setSession({
                id: response._id || null,
                email: response.email || '',
                phone: response.phone || '',
                accessToken: authToken,
                refreshToken: refreshToken,
                auth: !!response._id,
            });

            resolve(true);
        });
    };

    setSession(data) {
        const user = {
            id: data.id,
            email: data.email,
            phone: data.phone,
            role: data.role,
        };

        const session = {
            authenticated: data.auth,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user
        };
        setSessionCookie(session);
        this.setState(getSessionCookie());
    }

    updateMigrateData = (data) => {
        setSessionCookie(data);
        this.setState(getSessionCookie());
    }

    render() {
        const authProviderValue = {
            ...this.state,
            initiateLogin: this.initiateLogin,
            handleAuthentication: this.handleAuthentication,
            logout: this.logout,
            updateMigrateData: this.updateMigrateData
        };
        return (
            <AuthProvider value={authProviderValue}>
                {this.props.children}
            </AuthProvider>
        );
    }
}

export default withRouter(Auth);
