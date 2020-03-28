// npm install newsapi --save

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('0293efdfc1f54c82968b654ed0140230');
var query = 'test';
// 
newsapi.v2.topHeadlines({
  sources: '',
  q: query,
  category: '',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
});
