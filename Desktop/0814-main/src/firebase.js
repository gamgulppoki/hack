//firebase.js
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCbDyX1xiLVCZVkugQC6bgA7x6n58ZhULc",
    authDomain: "elementaul-b4828.firebaseapp.com",
    projectId: "elementaul-b4828",
    storageBucket: "elementaul-b4828.appspot.com",
    messagingSenderId: "246049306152",
    appId: "1:246049306152:web:a94c2daad2cd8720fde71d",
    measurementId: "G-1ML6NWE3P8"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };