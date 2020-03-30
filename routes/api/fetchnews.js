// npm install newsapi --save
const NewsAPI = require('newsapi');
const express = require("express");
const config = require("config");
const router = express.Router();
var query = 'test';

// Set up
const newsapi = new NewsAPI(config.get("newsapi.APIKey"));

/* @GET  api/news/top
// @desc get oauth bearer token
// @access Private
*/
router.get("/top", (req, res) => {
  newsapi.v2.topHeadlines({
    sources: '',
    q: query,
    category: '',
    language: 'en',
    country: 'us'
  }).then(response => {
    res.send(response)
  }).catch(err => {
    res.send(err)
  });
});

/* @GET  api/news/results
// @desc get oauth bearer token
// @access Private
*/
router.get("/results", (req, res) => {
  const { topic } = req.body;

  // en for language, us for country, and the user input for q, rest can be blank
  newsapi.v2.topHeadlines({
    q: topic,
    language: 'en',
    country: 'us'
  }).then(response => {
    res.send(response);
  }).catch(err => {
    res.send(err)
  });
});

module.exports = router;