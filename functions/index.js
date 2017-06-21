const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.newDoWhopDescriptionAlert = functions.database.ref('/doWhopDescription/{pushKey}').onWrite(function(event) {
  const description = event.data.val();
  const key = event.params.pushKey;
  console.log('DESCRIPTION: -> ', key, ' <-- ', description, ' --> ');

  const getTokens = admin.database().ref('app_users').once('value').then(snapshot => {
    const tokens = [];
    snapshot.forEach(user => {
      const token = user.child('token').val();
      if (token) tokens.push(token);
    });
    return tokens;
  });

  const getDoer = admin.auth().getUser('VYw0lPDFD3btHJadneuSFGjy8wk1');

  Promise.all([getTokens, getDoer]).then(([tokens, doer]) => {
    const payload = {
      notification: {
        title: description.titleDescription,
        body: 'Has been updated'
      }
    };
    admin.messaging().sendToDevice(tokens, payload).catch(function(error) {
      console.log('ERROR IN INDEX.js -> ', error);
    });
  });
});
