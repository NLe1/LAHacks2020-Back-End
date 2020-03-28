const express = require("express");
const router = express.Router();
const config = require("config")
const axios = require("axios")
const request = require("request")

//Constant
const baseURL = "https://api.twitter.com"
const middleware = require("../../middleware/twitterToken");

/* @POST  api/twitter
// @desc get oauth bearer token
// @access Private
*/
router.post("/", (req, res) => {
    const consumerKey = config.get("twitter.APIKey")
    const consumerSecret = config.get("twitter.APISecret")
    const bearerTokenCredentials = `${consumerKey}:${consumerSecret}`
    const base64Token = Buffer.from(bearerTokenCredentials).toString("base64");

    const options = {
        method: "POST",
        url: `${baseURL}/oauth2/token`,
        headers: {
            'Authorization': `Basic ${base64Token}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'grant_type=client_credentials'
    }

    request(options, (err, resp, body) => {
        if (err) res.send(err)
        if (body) {
            const credentials = JSON.parse(body)
            res.send(credentials)
        }
    });
});

/* @GET  api/twitter/trends
// @desc get oauth bearer token
// @access Private
*/
router.get("/trends", middleware, async (req, res) => {
    console.log(req.header("Authorization"));
    axios.get(`${baseURL}/1.1/trends/place.json?id=1`)
        .then(function (response) {
            // handle success
            res.send(response)
        })
        .catch(function (error) {
            // handle error
            res.send(error)
        }).finally(function () {
            // always executed
            console.log("done")
        });;
})

module.exports = router;