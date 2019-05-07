import { auth, provider } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () =>
  auth.signOut();

export const doSignInWithPopup = () =>
  auth.signInWithPopup(provider).then((user, error) => {
    if (error) alert("Can't login by FaceBook");
  })

export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = (password) => {
  auth.currentUser.updatePassword(password);
  auth.signOut();
}