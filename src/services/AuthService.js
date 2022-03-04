import api from "./api";
import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDszgNzL4VO2LxkoVUfmBZICt86_6B85NM",
  authDomain: "citius-web.firebaseapp.com",
  projectId: "citius-web",
  storageBucket: "citius-web.appspot.com",
  messagingSenderId: "1036579598962",
  appId: "1:1036579598962:web:f836d6a2e184b365a6c8eb",
};

// Initialize Firebase
if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}

const getToken = () => auth.currentUser.getIdToken(true);

const auth = firebase.auth();

const AuthService = {
  signIn: (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return getToken().then((token) => {
          api.defaults.headers.common["Authorization"] = token;
          return user;
        });
      }),
  userLoggedIn: (success, onError) =>
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        getToken()
          .then((token) => {
            api.defaults.headers.common["Authorization"] = token;
            if (success) success(user);
          })
          .catch((error) => {
            console.log("get token error");
            console.log(error);
            onError(error);
          });
      } else {
        onError();
      }
    }),
  signOut: () => auth.signOut(),
  signUp: (correo, password) =>
    auth.createUserWithEmailAndPassword(correo, password),
  recoverPassword: (email) => auth.sendPasswordResetEmail(email),
  getToken: () => auth.currentUser.getIdToken(true),
  verifyEmail: () => auth.currentUser.sendEmailVerification(),
  updateEmail: (email) => auth.currentUser.updateEmail(email),
  setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
};

export default AuthService;
