// DoWhop Lifecycle DB:
// test database
// var config = {
//     apiKey: "AIzaSyAJEseLAB0LwiFydCOtT3VFhnBfpw43kbE",
//     authDomain: "dowhop-test.firebaseapp.com",
//     databaseURL: "https://dowhop-test.firebaseio.com",
//     projectId: "dowhop-test",
//     storageBucket: "dowhop-test.appspot.com",
//     messagingSenderId: "1083653835496"


// uncomment this(live database)
var config = {
  apiKey: 'AIzaSyB95x1zEsSkXfaDgOVdTw7ESavk9O9geN0',
  authDomain: 'dowhop-lifecycle.firebaseapp.com',
  databaseURL: 'https://dowhop-lifecycle.firebaseio.com',
  projectId: 'dowhop-lifecycle',
  storageBucket: 'dowhop-lifecycle.appspot.com',
  messagingSenderId: '1090371045772'

  // DowWhop Profile App
  // apiKey: 'AIzaSyB5yNNpFJvQs_O8VEMqIF-NmMUfsMvzHZE',
  // authDomain: 'dowhop-profile-dev.firebaseapp.com',
  // databaseURL: 'https://dowhop-profile-dev.firebaseio.com',
  // projectId: 'dowhop-profile-dev',
  // storageBucket: 'dowhop-profile-dev.appspot.com',
  // messagingSenderId: '563843560362'
};

firebase.initializeApp(config);

var database = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var messaging = firebase.messaging();
