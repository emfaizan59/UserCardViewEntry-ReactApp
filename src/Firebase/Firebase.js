import * as firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAqea7TdUwIP-xjXim1QI9aIOStRi-_xQM",
    authDomain: "card-view-5cd64.firebaseapp.com",
    databaseURL: "https://card-view-5cd64.firebaseio.com",
    projectId: "card-view-5cd64",
    storageBucket: "card-view-5cd64.appspot.com",
    messagingSenderId: "605877600408", 
    appId: "1:605877600408:web:9740885c3719977a5e10ed",
    measurementId: "G-TFPFNHCFT1"
  };
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);


 

  export default firebase  