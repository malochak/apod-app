import * as firebase from 'firebase';

import {FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET,
        FIRBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID} from 'react-native-dotenv'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIRBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCBpez2-8pnxM9Z1N8zmw6_Xbpah8Ze1fs",
//   authDomain: "appod-311f7.firebaseapp.com",
//   databaseURL: "https://appod-311f7.firebaseio.com/",
//   projectId: "appod-311f7",
//   storageBucket: "appod-311f7.appspot.com",
//   messagingSenderId: "800570933850",
//   appId: "1:800570933850:web:cc74283ee8ea9621"
// };

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

// apiKey: process.env.FIREBASE_API_KEY,
// authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// databaseURL: process.env.FIREBASE_DATABASE_URL,
// projectId: process.env.FIREBASE_PROJECT_ID,
// storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.FIRBASE_MESSAGING_SENDER_ID,
// appId: process.env.FIREBASE_APP_ID

// .env
// FIREBASE_API_KEY = AIzaSyCBpez2 - 8pnxM9Z1N8zmw6_Xbpah8Ze1fs
// FIREBASE_AUTH_DOMAIN = appod - 311f7.firebaseapp.com
// FIREBASE_DATABASE_URL = https://appod-311f7.firebaseio.com/
// FIREBASE_PROJECT_ID = appod - 311f7
// FIREBASE_STORAGE_BUCKET = appod - 311f7.appspot.com
// FIRBASE_MESSAGING_SENDER_ID = 800570933850
// FIREBASE_APP_ID = 1: 800570933850: web: cc74283ee8ea9621