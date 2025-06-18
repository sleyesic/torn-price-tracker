const fetch = require('node-fetch');

exports.handler = async function(event) {
  const itemID = event.queryStringParameters.itemID;
  const response = await fetch(`https://api.torn.com/market/${itemID}?selections=itemmarket&key=7SME3JWfIcVWRGLY`);
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  };
};
