
import * as Facebook from 'expo-facebook';

import { APP_ID } from '_configs/facebook';

export class FacebookService {

    /**
     * Facebook sign-in
     * 
     * @returns {object} - accessToken, expires, user
     */
    static async signIn() {

        //Initializa
        try {
            await Facebook.initializeAsync(APP_ID);
        } catch (e) {
            return Promise.reject("Error in initialization" + e);
        }

        //Login with read permission
        try {
            const result = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            const { token, type, expires, permissions, declinedPermissions } = result;

            if (type === 'success') {

                try {
                    // Get the user's name using Facebook's Graph API
                    const url = "https://graph.facebook.com/me?access_token=" + token;
                    const response = await fetch(url);

                    //get user information
                    const user = await response.json();

                    return Promise.resolve({
                        user: user,
                        accessToken: token,
                        expires: expires
                    });
                } catch (error) {
                    return Promise.reject("Get user detail : " + error);
                }
            } else {
                return Promise.reject("Signin cancelled");
            }
        } catch ({ message }) {
            return Promise.reject('Signin Error : ' + message);
        }
    }


    /**
     * Facebook Sign out
     * @param {string} accessToken 
     */
    static async signOut(accessToken) {

        /**
         * No provison for Signout in Facebook
         */
        return Promise.resolve(1);
    }

}