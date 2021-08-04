import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const FIREBASE_CONFIGS = {
    apiKey: "#####",
    authDomain: "#####",
    databaseURL: "#####",
    projectId: "expo-starter",
    storageBucket: "#####",
    messagingSenderId: "#####",
    appId: "#####",
    measurementId: "#####"
};

firebase.initializeApp(FIREBASE_CONFIGS);

export default firebase;
