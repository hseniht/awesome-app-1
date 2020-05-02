import firebase from 'firebase/app'  //only need stuff in its app directory
import 'firebase/firestore'
import 'firebase/auth'


// Your web app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyBafDHI-hM_a4TsLE3djj1-H7Hu6RfFZC0", //dont worry about this being here. This just serves as an ID
   authDomain: "tk-awesome-app.firebaseapp.com",
   databaseURL: "https://tk-awesome-app.firebaseio.com",
   projectId: "tk-awesome-app",
   storageBucket: "tk-awesome-app.appspot.com",
   messagingSenderId: "388323270990",
   appId: "1:388323270990:web:0391389a9289a1e1a6fe1f",
   measurementId: "G-P0HPM4YHMN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
//init firestore
// firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;