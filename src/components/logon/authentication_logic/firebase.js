import * as firebase from 'firebase';

  const firebaseConfig = {

};

  let app = null;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  }

  const provider = new firebase.auth.FacebookAuthProvider();
  const auth = firebase.auth();


export {
  provider,
  auth,
  app
};
