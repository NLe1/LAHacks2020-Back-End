// npm install newsapi --save
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('0293efdfc1f54c82968b654ed0140230');
const express = require("express");
const router = express.Router();
var query = 'test';


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

module.exports = router;