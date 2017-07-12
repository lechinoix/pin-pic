import './style';
import App from './components/app';
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDC667EJjYSIY_gyMOJT_hhbYZsqEhB_j0",
  authDomain: "pinpic-49e36.firebaseapp.com",
  databaseURL: "https://pinpic-49e36.firebaseio.com",
  projectId: "pinpic-49e36",
  storageBucket: "pinpic-49e36.appspot.com",
  messagingSenderId: "458064906379"
};
firebase.initializeApp(config);

export default App;
