import SecureLS from "secure-ls";

export const setSessionCookie = (session) => {
    let ls = new SecureLS({encodingType: 'aes'});
    ls.removeAll();
    ls.set('session', session);
};

export const getSessionCookie = () => {
    let ls = new SecureLS({encodingType: 'aes'});
    let sessionCookie = null;
    try {
        sessionCookie = ls.get('session');
    } catch (e) {
        ls.removeAll();
    }

    if (sessionCookie === undefined) {
        return {
            authenticated: false,
            user: {
                role: "visitor"
            },
            accessToken: ""
        };
    } else {
        return sessionCookie;
    }
};
