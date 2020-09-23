import {createContext} from "react";

const AuthContext = createContext({
    authenticated: false, // to check if authenticated or not
    user: {}, // store all the user details
    accessToken: "", // accessToken of user for Auth0
    initiateLogin: () => {
        // to start the login process
    },
    handleAuthentication: () => {
        // handle login process
    },
    logout: () => {
        // logout the user
    },
    updateMigrateData: () => {
        // handle migrated data user
    }
});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
