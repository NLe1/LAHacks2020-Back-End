const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require("config");

// Create app instance
const app = express();

// Setup Express server
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// DATABASE CONNECTION
// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
    apiKey: config.get("firebase.APIKey"),
    authDomain: config.get("firebase.AuthDomain"),
    databaseURL: config.get("firebase.DatabaseURL"),
    projectId: config.get("firebase.ProjectId"),
    storageBucket: config.get("firebase.StorageBucket"),
    messagingSenderId: config.get("firebase.MessagingSenderId"),
    appId: config.get("firebase.AppId"),
    measurementId: config.get("firebase.MeasurementId")
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Routing configuration
const PORT = process.env.PORT || 8080;
app.use("/api/twitter", require("./routes/api/twitter"));
app.use("/api/news", require("./routes/api/fetchnews"));
app.use("/api/auth", require("./routes/api/auth"));

// Default route for the app
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Make the server listen to requests
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});