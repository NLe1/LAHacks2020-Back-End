const express = require('express');
const router = express.Router();

var firebase = require("firebase/app");

const db = firebase.firestore();

// AUTHENTICATION Routes

if (firebase.firestore()) {
    console.log('Connected to Cloud Firestore!');
} else {
    console.log('Not connected to Cloud Firestore :(');
}

if (firebase.auth()) {
    console.log('Connected to Firebase Auth!');
} else {
    console.log('Not connected to Firebase Auth :(');
}

// Register the user
router.post("/register", (req, res, next) => {
    const { firstName, lastName, email, password, tags } = req.body;

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log(`Successfully registered ${email}`);

            let docRef = db.collection('users').doc(email);
            docRef.set({
                firstName: firstName,
                lastName: lastName,
                tags: tags
            });

            console.log(`Successfully added ${email} to database!`);

            res.status(200).send({
                message: `Successfully registered!`,
                tags: tags
            });
        })
        .catch(err => {
            // Handle Errors here.
            console.log(`Couldn't register: ${err.message}`);
            res.status(400).send({
                message: `Couldn't register: ${err.message}`
            });
        });
});

// Login the user with firebase auth
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            let user = firebase.auth().currentUser;
            console.log(user)
            console.log('Successfully logged in!');
            let userDB = db.collection('users').doc(user.email)
            userDB
                .get()
                .then(doc => {
                    const userData = doc.data();
                    console.log(req.body)
                    //if there is extra tags, write back to the database
                    if (req.body && req.body.tags) {
                        userData.tags = [...userData.tags, ...req.body.tags]
                        //update tags whenever there is extra tags user 
                        userDB.set(userData).then(() => {
                            res.status(200).send({
                                message: `Successfully logged in!`,
                                tags: userData.tags
                            });
                        })
                            .catch(err => console.log(err))
                    }
                });
        })
        .catch(err => {
            // Handle Errors here.
            var errorMsg = err.message;
            res.status(400).send({
                message: `Something went wrong: ${errorMsg}`
            });
        });
});

// Logout the user with firebase auth
router.post("/logout", (req, res, next) => {
    if (firebase.auth().currentUser) {
        firebase.auth()
            .signOut()
            .then(() => {
                res.status(200).send({
                    message: `Successfully logged out!`
                });
            }).catch(err => {
                // Handle Errors here.
                var errorCode = err.code;
                res.status(400).send({
                    message: `Something went wrong [error code ${errorCode}]`
                });
            });
    } else {
        res.status(400).send({
            message: `You aren't logged in in the first place!`
        });
    }
});

// Indicates whether the user's logged in or not
router.get("/token", (req, res, next) => {
    console.log("API Called! Currently " + (firebase.auth().currentUser ? "logged_in" : "logged_out"));
    res.send(firebase.auth().currentUser ? "logged_in" : "logged_out");
});

module.exports = router;