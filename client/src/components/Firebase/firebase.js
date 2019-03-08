import app from 'firebase/app';
import 'firebase/auth';

// let x = process.env;
// console.log('process.env: ', x);
// console.log('process: ', process)

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };

//FIXME: Do this for now, .env style later.

const config = {
    apiKey: "AIzaSyAoujJhS45F3Q20CVaevAqF3IivUZTfmk8",
    authDomain: "kiyapp-1551475577402.firebaseapp.com",
    databaseURL: "https://kiyapp-1551475577402.firebaseio.com",
    projectId: "kiyapp-1551475577402",
    storageBucket: "kiyapp-1551475577402.appspot.com",
    messagingSenderId: "552588072009"
};

// console.log('config: ', config)
class Firebase {

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // *** Authentication API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;