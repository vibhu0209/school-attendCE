import firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA9al5tIZAVqURolj54UpwukgnLFIXXnfg",
    authDomain: "attendance-school-app.firebaseapp.com",
    databaseURL: "https://attendance-school-app-default-rtdb.firebaseio.com",
    projectId: "attendance-school-app",
    storageBucket: "attendance-school-app.appspot.com",
    messagingSenderId: "468777350759",
    appId: "1:468777350759:web:9e17ae778437c99af1c6c2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default  firebase.database()