var doWhopDescriptionRef = database.ref('/doWhopDescription');

var titleDescription = document.getElementById('title-description');
var whoDescription = document.getElementById('who-description');
var whatDescription = document.getElementById('what-description');
var whenDescription = document.getElementById('when-description');
var whereDescription = document.getElementById('where-description');
var howMuchDescription = document.getElementById('how-much-description');
var dowhopImageCapture = document.getElementById('dowhop-image-capture');

var submitNewDoWhopBtn = document.getElementById('create-new-dowhop');
submitNewDoWhopBtn.addEventListener('click', submitNewDoWhopEntry);

function submitNewDoWhopEntry(e) {
  e.preventDefault();

  if (
    !validateAddDoWhopDescription(
      file,
      titleDescription.value,
      whoDescription.value,
      whatDescription.value,
      whenDescription.value,
      whereDescription.value,
      howMuchDescription.value
    )
  ) {
    alert('Please fill out all the fields and add an Image, Try again.');
    return;
  }

  var uid = auth.currentUser.uid;
  var creatorDescription = auth.currentUser.email;
  var doWhopDescriptionKey = doWhopDescriptionRef.push().key;
  var filepath;

  /// new
  function createWelcomingMessage() {
    console.log("creating welcome message for....!", doWhopDescriptionKey);
    var teamName = "TinkerDo Team";
    var messageText = "Welcome to the chat thread for your DoWhop. You can use this space to coordinate the details of your DoWhop. Have fun!"
    // Nesting the message content under chat-id node headings:
    var messagesChatsRef = database.ref().child('messages').child(doWhopDescriptionKey);
    // var currentUser = person;
    messagesChatsRef.push({
      chatId: doWhopDescriptionKey,
      name: teamName,
      text: messageText,
      photoUrl: 'https://static.wixstatic.com/media/de271e_daded027ba1f4feab7b1c26683bc84da~mv2.png/v1/fill/w_512,h_512,al_c/de271e_daded027ba1f4feab7b1c26683bc84da~mv2.png' // <- Customized.
    });

  }/// end.

  filePath = 'doWhopImages/' + uid + '/' + 'titleDescriptionImage/' + doWhopDescriptionKey + '/' + file.name;
  storage.ref(filePath).put(file).then(function(snapshot) {
    doWhopDescriptionRef.child(doWhopDescriptionKey).set({
      createdBy: uid,
      doWhopDescriptionKey: doWhopDescriptionKey,
      downloadURL: snapshot.metadata.downloadURLs[0],
      titleDescription: titleDescription.value,
      whoDescription: whoDescription.value,
      whatDescription: whatDescription.value,
      whenDescription: whenDescription.value,
      whereDescription: whereDescription.value,
      howMuchDescription: howMuchDescription.value,
      creatorDescription: creatorDescription,
      doerDescription: '' // Temp.
    }).then(
      showConfirmationMessage()
    );
    createWelcomingMessage();
    clearNewDoWhopEntryForm();
  });
}

var file = null;

function addDoWhopImage(files_arr, node) {
  return (file = files_arr[0]);
  if (!file.type.match('image/.*')) {
    alert('You can only add images at the moment.');
    return;
  }
}

function validateAddDoWhopDescription(
  file,
  titleDescription,
  whoDescription,
  whatDescription,
  whenDescription,
  whereDescription,
  howMuchDescription
) {
  if (
    titleDescription === '' ||
    whoDescription === '' ||
    whatDescription === '' ||
    whenDescription === '' ||
    whereDescription === '' ||
    howMuchDescription === '' ||
    file === null
  )
    return false;
  return true;
}

function clearNewDoWhopEntryForm() {
  file = null;
  titleDescription.value = '';
  whoDescription.value = '';
  whatDescription.value = '';
  whenDescription.value = '';
  whereDescription.value = '';
  howMuchDescription.value = '';
  dowhopImageCapture.value = '';
}

// Adding function to add a chosen dowhop a user's list:
function addToMyDoWhops(node) {
  firebase
    .database()
    .ref()
    .child('app_users/' + auth.currentUser.uid + '/doer/' + node.parentElement.id)
    .update({ doer: true });
}

// New function to display a welcome message in chatroom.
function createWelcomingMessage(doWhopDescriptionKey) {
  console.log("creating welcome message for....!", doWhopDescriptionKey);
  var teamName = "TinkerDo Team";
  var messageText = "Welcome to the chat thread for your DoWhop. You can use this space to coordinate the details of your DoWhop. Have fun!"
  // Nesting the message content under chat-id node headings:
  var messagesChatsRef = database.ref().child('messages').child(doWhopDescriptionKey);
  // var currentUser = person;
  messagesChatsRef.push({
    chatId: doWhopDescriptionKey,
    name: teamName,
    text: messageText,
    photoUrl: 'https://static.wixstatic.com/media/de271e_daded027ba1f4feab7b1c26683bc84da~mv2.png/v1/fill/w_512,h_512,al_c/de271e_daded027ba1f4feab7b1c26683bc84da~mv2.png' // <- Customized.
  });

}

function showConfirmationMessage() {
  window.alert('Thanks for submitting your DoWhop!');
}
