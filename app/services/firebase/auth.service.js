import firebase from './init';

export default class FirebaseAuthService {

    constructor() {        
        this.firebase = firebase;
        this.configs = firebase.app().options;
        this.auth = firebase.auth();
    }

    /**
     * Return firebase configs
     */
    getConfig = () => {
        return this.configs;
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

    /**
     * Send verification code on phone number using recapthac verifier
     * 
     * @param {string} phoneNumber 
     * @param {object} recaptchaVerifier 
     */
    async verifyPhone(phoneNumber, recaptchaVerifier) {
        try {
            const phoneProvider = new this.firebase.auth.PhoneAuthProvider()
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            return Promise.resolve(verificationId);
        } catch (error) {
            console.log(error);
            return Promise.reject(error.message);
        }
    }

    /**
     * Confirm verification code against verification id
     * 
     * @param {string} verificationId 
     * @param {string} verificationCode 
     */
    async confirmPhone(verificationId, verificationCode) {
        try {
            const credentials = this.firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            )
            this.auth.signInWithCredential(credentials);
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}