
import * as Google from 'expo-google-app-auth';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '_configs/google';

export class GoogleService {

    /**
     * Google sign-in
     */
    static async signIn() {

        const options = {
            androidClientId: ANDROID_CLIENT_ID,
            iosClientId: IOS_CLIENT_ID,
            scopes: ["profile", "email"]
        }

        try {
            const result = await Google.logInAsync(options)
            if (result.type === "success") {
                return Promise.resolve({
                    accessToken: result.accessToken,
                    user: result.user
                })
            } else {
                return Promise.reject("Google Signin Cancelled");
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * Google Sign out
     * @param {string} accessToken 
     */
    static async signOut(accessToken) {

        const options = {
            accessToken: accessToken,
            androidClientId: ANDROID_CLIENT_ID,
            iosClientId: IOS_CLIENT_ID,
        }

        try {
            const result = await Google.logOutAsync(options)
            if (result.ok) {
                return Promise.resolve(1);
            }
        } catch (e) {
            return Promise.reject("Google Signout : ", e)
        }
    }

}