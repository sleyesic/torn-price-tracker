
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const itemId = event.queryStringParameters.itemId;
  const apiKey = "7SME3JWfIcVWRGLY";
  const url = `https://api.torn.com/v2/market/${itemId}?selections=itemmarket&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(json.data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur proxy Torn." })
    };
  }
};
