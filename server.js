const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

//Create app instance
const app = express()

//Setup Express server
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


//Server configuration
const PORT = process.env.PORT || 8080;

//Create a route for the app
app.get('/', (req, res) => {
    res.send('Hello World');
});

//Make the server listen to requests
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});