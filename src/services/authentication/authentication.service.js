import * as firebase from "firebase/compat";

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);
