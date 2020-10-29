import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBOwiAqz8tkcnzF26DIKpIO-koSCFiK_X4",
    authDomain: "stargazing-487ed.firebaseapp.com",
    databaseURL: "https://stargazing-487ed.firebaseio.com",
    projectId: "stargazing-487ed",
    storageBucket: "stargazing-487ed.appspot.com",
    messagingSenderId: "706021314721",
    appId: "1:706021314721:web:96befadd703feace22e0e0"
});

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };
//   export default db;
