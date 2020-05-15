import { Environment as env, Data as DataEnv } from '_configs/constants';
import { StorageService as storage } from '_services/storage.service';

const publicHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Accept': 'application/json, text/plan'
};

export class AuthService {
    constructor() {
        // this.url = env.url;
    }

    /**
     * Send login request to server
     * 
     * @param {string} username 
     * @param {string} password 
     */
    static async login(username, password) {
        //prepare data
        let body = {};
        if (env.isDev) {
            body = {
                phone: DataEnv.username,
                password: DataEnv.password,
                device_id: DataEnv.deviceId
            }
        } else {
            body = {
                phone: username,
                password: password,
                device_id: DataEnv.deviceId
            }
        }

        //prepare url
        const url = env.url + '/users/login';

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: publicHeaders,
                body: JSON.stringify(body)
            });
            if (response.ok) {
                let result = await response.json();

                //store token
                try {
                    await storage.store(env.tokenKey, result);
                    return Promise.resolve(result);
                } catch (error) {
                    console.log("Token save : ", error);
                    return Promise.reject(error);
                }
            } else {
                let error = await response.json();
                return Promise.reject(error);
            }
        } catch (error) {
            return Promise.reject(error.message);
        }
    }

    /**
     * Send logout request to server
     */
    static async logout() {

        //get token
        let token = {};
        try {
            token = await this.getToken();
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
                    await storage.delete(env.tokenKey);
                    return Promise.resolve(result);
                } catch (error) {
                    console.log("Delete token : ", error);
                    return Promise.reject(error);
                }
            } else {
                let error = await response.json();
                return Promise.reject(error);
            }
        } catch (error) {
            return Promise.reject(error.message);
        }
    }

    /**
     * Get stored token
     */
    static async getToken() {
        try {
            let token = await storage.retrieve(env.tokenKey);
            if (token) {
                return Promise.resolve(token);
            } else {
                return Promise.reject('Not signed-in');
            }
        } catch (error) {
            console.log("getToken : ", error);
            return Promise.reject(error);
        }
    }

    /**
     * Send register request to server
     * 
     * @param {object} subscriber
     */
    static async register(subscriber) {
        //Mock request
        console.log("Server : ", subscriber);
        return (Math.floor(Math.random() * 2) == 0) ?
            Promise.resolve('Mock registration successful.') :
            Promise.reject('Error is registration.');
    }

    /**
     * Send password reset request to server
     * 
     * @param {string} email
     */
    static async resetPassword(email) {
        //Mock request
        console.log("Server : ", email);
        return (Math.floor(Math.random() * 2) == 0) ?
            Promise.resolve('Password reset successful.') :
            Promise.reject('Error in password reset.');
    }

    /**
     * Get user profile
     */
    static async getUserProfile() {
        //Mock request
        return Promise.resolve(DataEnv.userProfile);
    }

    /**
     * Get token for user authenticated by Google Signin 
     * @param {string} authToken 
     * @param {Object} user 
     */
    static async googleSignIn(authToken, user) {
        /**
         * Send this authtoken and user information to server
         * Server should send the application token in order to create uniform interface
         *      i.e. Google sign-in or normal sign-in
         */
        const userToken = DataEnv.userToken
        //store token
        try {
            await storage.store(env.tokenKey, userToken);
            return Promise.resolve(userToken);
        } catch (error) {
            console.log("Token save : ", error);
            return Promise.reject(error);
        }
    }

    /**
     * Get token for user authenticated by Facebook Signin 
     * @param {string} accessToken 
     * @param {Object} user 
     */
    static async fbSignIn(accessToken, user) {
        /**
         * Send this authtoken and user information to server
         * Server should send the application token in order to create uniform interface
         *      i.e. Facebook sign-in or normal sign-in
         */
        const userToken = DataEnv.userToken
        //store token
        try {
            await storage.store(env.tokenKey, userToken);
            return Promise.resolve(userToken);
        } catch (error) {
            console.log("Token save : ", error);
            return Promise.reject(error);
        }
    }
}