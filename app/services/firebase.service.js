
import * as firebase from 'firebase';

import { FIREBASE_CONFIGS } from '_libs/firebase/config';

class Firebase {

    constructor() {
        firebase.initializeApp(FIREBASE_CONFIGS)
        this.auth = firebase.auth();
    }

    /**
     * Sign up using email and password
     * @param {string} email 
     * @param {string} password 
     */
    async emailSignUp(email, password) {
        try {
            //create user with email and password
            const response = await this.auth.createUserWithEmailAndPassword(email, password);

            //if user is created it is auto signed-in, get current user
            const user = this.auth.currentUser;

            //send email confirmation link
            try {
                await user.sendEmailVerification();
            } catch (error) {
                return Promise.reject(error.toString(error));
            }
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error.toString(error))
        }
    }

    /**
     * Sign in using email and password
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {bool} allowVerifiedEmail 
     */
    async emailSignIn(email, password, allowVerifiedEmail = false) {
        try {
            //create user with email and password
            const response = await this.auth.signInWithEmailAndPassword(email, password);
            const user = response.user;
            if ((allowVerifiedEmail && user.emailVerified) || !allowVerifiedEmail) {
                return Promise.resolve(user);
            }
            return Promise.reject("Error : Your email address is not verified.");
        } catch (error) {
            return Promise.reject(error.toString(error))
        }
    }

    /**
     * Sign in using email and password
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {bool} allowVerifiedEmail 
     */
    async emailSignIn(email, password, allowVerifiedEmail = false) {
        try {
            //create user with email and password
            const response = await this.auth.signInWithEmailAndPassword(email, password);
            const user = response.user;
            if ((allowVerifiedEmail && user.emailVerified) || !allowVerifiedEmail) {
                return Promise.resolve(user);
            }
            return Promise.reject("Error : Your email address is not verified.");
        } catch (error) {
            return Promise.reject(error.toString(error))
        }
    }

    /**
     * Sign out
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {bool} allowVerifiedEmail 
     */
    async signOut() {
        try {
            //create user with email and password
            const response = await this.auth.signOut();
            return Promise.resolve("You are successfully signed out.");
        } catch (error) {
            return Promise.reject(error.toString(error))
        }
    }
}

export const FirebaseService = new Firebase();