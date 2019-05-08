import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "test"
};

  let app = null;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(config);
  }

  const provider = new firebase.auth.FacebookAuthProvider();
  const auth = firebase.auth();


export {
  provider,
  auth,
  app
};