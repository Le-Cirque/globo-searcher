const credentialsWatson = require('../credentials/watson-nlu.json')

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const nlu = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: credentialsWatson.apikey,
  }),
  url: credentialsWatson.url,
});

const limitSearch = 4;

async function init(content){

  const analyzeParams = createAnalyzeParams(content);
  const result = await fetchSerchTermsFromContent(analyzeParams);
  const searchTerms = result.join(', ');


  function createAnalyzeParams(content){
    if (content.searchType == 'URL'){
      const analyzeParams = {
        'url': content.input,
        'features': { 'keywords': { 'limit': limitSearch } }
      };
  
      return analyzeParams;
    }else{
      const analyzeParams = {
        'text': content.input,
        'features': { 'keywords': { 'limit': limitSearch } }
      };
  
      return analyzeParams;
    }
  }
  
  async function fetchSerchTermsFromContent(analyzeParams){
    return new Promise((resolve, reject) => {
      nlu.analyze(analyzeParams, (error, response) => {
        if (error) {
          reject(error)
          return
        }
  
        const keywords = response.result.keywords.map( (keyword) => {
          return keyword.text
        })
  
        resolve(keywords)
      })
    })
  }


  return searchTerms;
}

module.exports = init;
