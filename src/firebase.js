import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCEOopC9paw5TwmTklec8bbRKHUhQjrw_k",
    authDomain: "illenials-2019.firebaseapp.com",
    databaseURL: "https://illenials-2019.firebaseio.com",
    projectId: "illenials-2019",
    storageBucket: "illenials-2019.appspot.com",
    messagingSenderId: "365562628837",
    appId: "1:365562628837:web:7b1b44d4c89f385a"
});

export const FirebaseContext = React.createContext(firebaseApp);