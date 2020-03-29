const express = require('express');
const router = express.Router();

var firebase = require("firebase/app");

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
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Are any fields blank?
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        res.status(400).send({
            message: 'Some information is missing!'
        });
    }
    // Do the passwords match?
    else if (password !== confirmPassword) {
        res.status(400).send({
            message: 'Passwords don\'t match!'
        });
    }
    // Everything look's good, create the user in auth and the DB... 
    else {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                let docRef = db.collection('users').doc(email);
                docRef.set({
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                });
                res.status(200).send({
                    message: `Successfully registered!`
                });
            })
            .catch(err => {
                // Handle Errors here.
                var errorCode = err.code;
                res.status(400).send({
                    message: `Something went wrong [error code ${errorCode}]`
                });
            });
    }
});

// Login the user with firebase auth
router.post("/login", (req, res, next) => {
    firebase.auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(() => {
            res.status(200).send({
                message: `Successfully logged in!`
            });
        })
        .catch(err => {
            // Handle Errors here.
            var errorCode = err.code;
            res.status(400).send({
                message: `Something went wrong [error code ${errorCode}]`
            });
        });
});

// Logout the user with firebase auth
router.post("/logout", (req, res, next) => {
    console.log("Logout API called!");
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