import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

// uncomment this
// const config = {
  // LifeCycle App
  var config = {
  apiKey: 'AIzaSyB95x1zEsSkXfaDgOVdTw7ESavk9O9geN0',
  authDomain: 'dowhop-lifecycle.firebaseapp.com',
  databaseURL: 'https://dowhop-lifecycle.firebaseio.com',
  projectId: 'dowhop-lifecycle',
  storageBucket: 'dowhop-lifecycle.appspot.com',
  messagingSenderId: '1090371045772'

//test database
  //   apiKey: "AIzaSyAJEseLAB0LwiFydCOtT3VFhnBfpw43kbE",
  //   authDomain: "dowhop-test.firebaseapp.com",
  //   databaseURL: "https://dowhop-test.firebaseio.com",
  //   projectId: "dowhop-test",
  //   storageBucket: "dowhop-test.appspot.com",
  //   messagingSenderId: "1083653835496"
  };
  firebase.initializeApp(config);


  // DoWhopMe FB Account Creds.
  // apiKey: 'AIzaSyCds_tiUvgDETcaagZ4C3tFZfLLLK8Wuf8',
  // authDomain: 'dowhop-me.firebaseapp.com',
  // databaseURL: 'https://dowhop-me.firebaseio.com',
  // projectId: 'dowhop-me',
  // storageBucket: 'dowhop-me.appspot.com',
  // messagingSenderId: '212713898498'

  // DowWhop Profile App
  // apiKey: 'AIzaSyB5yNNpFJvQs_O8VEMqIF-NmMUfsMvzHZE',
  // authDomain: 'dowhop-profile-dev.firebaseapp.com',
  // databaseURL: 'https://dowhop-profile-dev.firebaseio.com',
  // projectId: 'dowhop-profile-dev',
  // storageBucket: 'dowhop-profile-dev.appspot.com',
  // messagingSenderId: '563843560362'
// };


export default firebase;

export const database = firebase.database();
export const ui = new firebaseui.auth.AuthUI(firebase.auth());
export const auth = firebase.auth();
export const storage = firebase.storage();
export const messaging = firebase.messaging();
