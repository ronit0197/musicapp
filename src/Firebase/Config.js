// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZFmfFPvKbcR_luVACGPcjeaqu7zTQzUQ",
    authDomain: "musicapp-7cb4e.firebaseapp.com",
    projectId: "musicapp-7cb4e",
    storageBucket: "musicapp-7cb4e.firebasestorage.app",
    messagingSenderId: "157314050168",
    appId: "1:157314050168:web:ee323e5a235416c869258d",
    measurementId: "G-R3HLHFKTPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);