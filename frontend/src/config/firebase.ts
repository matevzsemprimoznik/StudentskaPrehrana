import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID, REACT_APP_FIREBASE_MEASUREMENT_ID} from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';
import axios from "axios/index";

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
};

const getAuthenticationModule = () => {
    if(getApps().length === 0) {
        const app = initializeApp(firebaseConfig);
        return initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
        });
    }
    else {
        const app = getApp();
        return getAuth(app)
    }
}
export const auth = getAuthenticationModule()

auth.onAuthStateChanged(async (user) => {
    if(user != null) {
        const token = await user.getIdToken(true)
        console.log(user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
})

