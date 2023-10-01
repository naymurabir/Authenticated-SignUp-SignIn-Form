// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBadnoKAwshzhPRGuiJrZadXfQFp0-P_HA",
    authDomain: "login-form-authenticatio-801b3.firebaseapp.com",
    projectId: "login-form-authenticatio-801b3",
    storageBucket: "login-form-authenticatio-801b3.appspot.com",
    messagingSenderId: "650150073923",
    appId: "1:650150073923:web:573ffdad111e62f405a6f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;