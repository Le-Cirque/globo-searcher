const readline = require('readline-sync')
const tools = {
  watson: require('./tools/watson.js'),
  search: require('./tools/search.js')
};

async function start(){
  const content = {};

  content.searchType = askAndReturnSearchType();
  content.input = askAndReturnInput(content.searchType);


  content.searchTerm = await tools.watson(content);
  content.news = await tools.search(content);

  console.log('\n');
  console.log(content);

  function askAndReturnSearchType(){
    const types = ['URL', 'text'];

    const selectedTypeIndex = readline.keyInSelect(types);
    const selectedTypeText = types[selectedTypeIndex];

    return selectedTypeText;
  }

  function askAndReturnInput(searchType){
    return readline.question("Type a " + searchType + ": ");
  }
  
}

start()
