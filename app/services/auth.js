import { Environment as env, Data } from '_configs/constants';
import * as SecureStore from 'expo-secure-store';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Accept': 'application/json, text/plan'
};

class AuthService {
    constructor() {
        // this.url = env.url;
    }

    /**
     * Send login request to server
     * 
     * @param {string} username 
     * @param {string} password 
     * @param {string} deviceId 
     */
    async login(username, password, deviceId) {
        //prepare data
        let body = {};
        if (env.isDev) {
            body = {
                phone: Data.username,
                password: Data.password,
                device_id: Data.deviceId
            }
        } else {
            body = {
                phone: username,
                password: password,
                device_id: deviceId
            }
        }

        //prepare url
        const url = env.url + '/users/login';

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            if (response.ok) {
                let result = await response.json();

                //store token
                try {
                    await SecureStore.setItemAsync(env.tokenKey, JSON.stringify(result));
                    return Promise.resolve(result);
                } catch (error) {
                    console.log("Token save", error);
                    return Promise.reject(error);
                }
            } else {
                let error = await response.json();
                return Promise.reject(error);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Send logout request to server
     */
    async logout() {

        //get token
        let token = {};
        try {           
            let strToken = await this.getToken();
            token = JSON.parse(strToken);
            console.log(token);
        } catch (error) {
            return Promise.reject(error);
        }        

        //prepare url and headers
        const url = env.url + '/users/logout';
        const headers = {
            'Authorization': token["token_type"] + " " + token["access_token"]
        };

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: headers
            });
            if (response.ok) {
                let result = await response.json();

                //remove token
                try {
                    await SecureStore.deleteItemAsync(env.tokenKey);
                } catch (error) {
                    return Promise.reject(error);
                }
            } else {
                let error = await response.json();
                return Promise.reject(error);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Get stored token
     */
    async getToken() {
        try {
            token = await SecureStore.getItemAsync(env.tokenKey);
            if (token) {
                return Promise.resolve(token);
            } else {
                return Promise.reject('Not signed-in');
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
}

export const authService = new AuthService();