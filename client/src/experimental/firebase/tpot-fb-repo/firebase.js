// Initialize Firebase
var config = {
    apiKey: "AIzaSyCrRjT-eZQAxfPkDemOe0WiebiWVZju97w",
    authDomain: "tpot-toolbox.firebaseapp.com",
    databaseURL: "https://tpot-toolbox.firebaseio.com",
    projectId: "tpot-toolbox",
    storageBucket: "tpot-toolbox.appspot.com",
    messagingSenderId: "971065099433"
};

var app = firebase.initializeApp(config);

//Initialize Cloud Firestore through Firebase:
var db = firebase.firestore();

const settings = {
    timestampsInSnapshots: true,
};
db.settings(settings);

let usersCollection = db.collection('users');
let pages = db.collection('wp-pages');

var email = 'michael.n.preston@gmail.com';
var password = 'Mercury10';




function login() {
    return app.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(console.log);
}

function ReadData() {
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => `, doc.data());
        });
    });
}

function seed() {

    usersCollection.doc('bp').set({
        firstName: "Braden",
        lastName: "Preston",
        email: "bpfilmsinc@gmail.com",
    });

    usersCollection.doc('mp').set({
        firstName: "Michael",
        lastName: "Preston",
        email: "michael.n.preston@gmail.com"
    });
}

function submit() {

    let first = $('#first-name').val();
    let last = $('#last-name').val();
    let email = $('#email').val();
    let password = $('#password').val();

    if (!first || !last || !email) {
        alert('Fill in all fields!');
        return;
    }

    // if (!userExists({
    //         first,
    //         last,
    //         email
    //     })) {
    //     console.log('well, we must make one!', );
    // }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error Code: ', errorCode);
        console.log('Error Message: ', errorMessage);
    });

    //todo: check if user already exists
    // a) if no, use doc(docName).update(), where docName is the doc associated with that user
    // b) if yes, use doc().set()

    usersCollection.doc().set({
        firstName: first,
        lastName: last,
        email: email,
    })

    $('#status').text(`Welcome, ${first}!`)
    // clearAllFields();
    getCurrentUser();


}

//Not working :&{
function clearAllFields() {
    console.log('clearAll()', );
    $(this).closest('form').find("input[type=text], input").val("");
}

function userExists(user) {
    throw new Error('not implemented!')
}

function getCurrentUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }
    console.log('USER: ', user);
    return user;
}

seed(); //initial data push (so we have stuff)
login(); //login this thread/app
// ReadData(); //sample pull