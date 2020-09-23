import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "",
    timeout: 20 * 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': ' application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    if (response.data) {
        response = response.data;
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
