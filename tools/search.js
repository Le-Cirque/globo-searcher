const credentialsCS = require('../credentials/customsearch.json')

const {google} = require('googleapis');
const customsearch = google.customsearch('v1');

const limitsearch = 3;

async function init(content){
  const response = await fetchSearchsFromGlobo();
  const newscontent = fetchNewsDataFromResponse(response)

  async function fetchSearchsFromGlobo(){
    const res = await customsearch.cse.list({
      cx: credentialsCS.cx,
      q: content.searchTerm,
      auth: credentialsCS.apiKey,
      sort: 'date'
    });
  
    return res.data;
  }

  async function fetchNewsDataFromResponse(){
    news = []

    for (item of response.items.slice(0, limitsearch)){
      news.push({
        title: item.title,
        link: item.link,
        urlImage: item.pagemap.cse_thumbnail[0].src
      });
    }

    return news
  }

  return newscontent
}

module.exports = init;