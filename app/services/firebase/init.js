import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const FIREBASE_CONFIGS = {
    apiKey: "AIzaSyBopyC4i6WnxlfYWi4GMb2iW-IrqbxZeY8",
    authDomain: "expo-starter.firebaseapp.com",
    databaseURL: "https://expo-starter.firebaseio.com",
    projectId: "expo-starter",
    storageBucket: "expo-starter.appspot.com",
    messagingSenderId: "872207307326",
    appId: "1:872207307326:web:964a732a0214119c73776f",
    measurementId: "G-2CHNK6VPBQ"
};

firebase.initializeApp(FIREBASE_CONFIGS);

export default firebase;