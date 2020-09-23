import axios from 'axios';
import {getSessionCookie, setSessionCookie} from "../Utils/Session";

let loader = document.createElement("div");
loader.id = 'loader-div';
loader.style.cssText = 'position: fixed;\n' +
    '  left: 0;\n' +
    '  opacity: 0.7;\n' +
    '  top: 0;\n' +
    '  width: 100%;\n' +
    '  height: 100%;\n' +
    '  z-index: 9999;\n' +
    '  background: url(\'//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phi_fenomeni.gif/50px-Phi_fenomeni.gif\')\n' +
    '  50% 50% no-repeat rgb(249,249,249);'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 120 * 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': ' application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    if (!config.headers.hasOwnProperty('hideLoader')) {
        document.body.appendChild(loader);
    }
    let userSession = getSessionCookie();
    if (config.headers.hasOwnProperty('Skip-Headers')) {
        delete config.headers['Skip-Headers'];
    } else {
        config.headers.Authorization = `Bearer ${userSession.accessToken}`;
        delete config.headers['Skip-Headers'];
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    let div = document.getElementById('loader-div');
    if (div) {
        document.body.removeChild(div);
    }
    if (response.data) {
        if (response.data.message === 'Unauthorized') {
            let session = {
                authenticated: false,
                user: {
                    role: "visitor"
                },
                accessToken: ""
            };
            setSessionCookie(JSON.stringify(session));
            window.location.href = `${process.env.REACT_APP_BASE_URL}`
        }
    }
    return response;
});

class ApiService {
    static callPost(url, payload, headers, options = {}) {
        return axiosInstance.post(url, payload, {
            headers: {
                ...headers
            },
            ...options
        });
    }

    static callGet(url, params, headers) {
        return axiosInstance.get(url, {
            headers: {
                ...headers
            },
            params: params
        });
    }

    static callPut(url, payload, headers) {
        return axiosInstance.put(url, payload, {
            headers: {
                ...headers
            }
        });
    }

    static callDelete(url, params, headers) {
        return axiosInstance.delete(url, {
            headers: {
                ...headers
            },
            params: params
        });
    }
}

export default ApiService;
