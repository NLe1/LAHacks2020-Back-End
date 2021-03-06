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
router.post("/top", (req, res) => {
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
// @param(topic: keyword, pageSize: number of results return per page, 20 is default, page: page number that want to query)
// @access Private
*/
router.post("/results", (req, res) => {
  const { topic, pageSize, page } = req.body;

  // en for language, us for country, and the user input for q, rest can be blank
  newsapi.v2.topHeadlines({
    q: topic,
    pageSize,
    pageSize
    language: 'en',
    country: 'us'
  }).then(response => {
    res.send(response);
  }).catch(err => {
    res.send(err)
  });
});

module.exports = router;