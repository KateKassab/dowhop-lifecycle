// This is a script for managing direct-messaging functionality.
// (c) DoWhop.com, 2017.
'use strict';

// Gathering our DOM elements.
var sendDMButton = document.getElementById('send-direct-message');
sendDMButton.addEventListener('click', revealFormDM);

var directMessageFormDiv = document.getElementById('direct-message-form-div');
var closingButton = document.getElementById('direct-message-form-div-span');
closingButton.addEventListener('click', closeModalView);

function getPersonOne() {
  var user1 = firebase.auth().currentUser.uid;
  return user1;
}

function getPersonTwo() {
  var user2 = sendDMButton.parentNode.id;
  return user2;
}

// This will ensure the viewer and recipient are pointed toward the same root reference:
function createPathDM(user1, user2) {
  return 'chat_' + (user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1);
}

function sendDirectMessage(e) {
  e.preventDefault();
  var message = document.getElementById('direct-message-form-input');

  if (message.value && (message.value !== '' && message.value !== ' ')) {
    var senderRef = firebase.database().ref('/app_users').child(getPersonOne());
    var recipientRef = firebase.database().ref('/app_users').child(getPersonTwo());

    var refTail = createPathDM(getPersonOne(), getPersonTwo());
    var chatDMref = firebase.database().ref('/direct-messages').child(refTail);

    var senderName = '';
    senderName = firebase.auth().currentUser.displayName; // Check.

    var recipientName = '';
    recipientRef.once('value', function(snap) {
      recipientName = snap.val().displayName;
    });

    chatDMref
      .push({
        from: senderName,
        to: recipientName,
        body: message.value
      })
      .then(document.getElementById('direct-message-form').reset());
  } else {
    window.alert('You must fill out the message input!');
  }
}

function revealFormDM(e) {
  e.preventDefault();
  document.getElementById('direct-message-form-button').addEventListener('click', sendDirectMessage);
  document.getElementById('direct-message-form-button-hide').addEventListener('click', hideFormDM);
  directMessageFormDiv.removeAttribute('hidden');
  directMessageFormDiv.style.display = 'block';
  document.getElementById('direct-messages-div').removeAttribute('hidden');
  loadDirectMessagesHistory();

  // New.
  window.onclick = function(event) {
    if (event.target == directMessageFormDiv) {
      directMessageFormDiv.style.display = 'none';
    }
  };
}

function hideFormDM(e) {
  e.preventDefault();
  var directMessageForm = directMessageFormDiv;
  directMessageForm.setAttribute('hidden', 'true');
  var directMessagesDiv = document.getElementById('direct-messages-div');
  directMessagesDiv.setAttribute('hidden', 'true');
}

function loadDirectMessagesHistory() {
  var directMessagesDiv = document.getElementById('direct-messages-div');
  var refTail = createPathDM(getPersonOne(), getPersonTwo());
  var chatDMref = firebase.database().ref('/direct-messages').child(refTail);

  // Reset elements.
  chatDMref.off();
  directMessagesDiv.innerText = '';

  // Loads the last x number of messages and listen for new ones:
  var setMessage = function(data) {
    var val = data.val();
    displayMessage(data.key, val.from, val.to, val.body);
  }.bind(this);

  chatDMref.orderByKey().limitToLast(30).on('child_added', setMessage);
  chatDMref.orderByKey().limitToLast(30).on('child_changed', setMessage);
}

function displayMessage(key, from, to, body) {
  var directMessagesDiv = document.getElementById('direct-messages-div');
  var newDiv = document.createElement('div');
  var bodyText = '';
  bodyText += from + ' says: ';
  bodyText += body;
  newDiv.classList.add('message-container');
  newDiv.classList.add('visible');
  newDiv.innerHTML = "<div class='message'>" + bodyText + '</div>';
  // newDiv.innerText = bodyText;
  directMessagesDiv.appendChild(newDiv);
}

function closeModalView() {
  directMessageFormDiv.style.display = 'none';
}
