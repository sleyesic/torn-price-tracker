
const fetch = require('node-fetch');

exports.handler = async function(event) {
  const itemId = event.queryStringParameters.itemId;
  const apiKey = event.queryStringParameters.key;

  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing API key." })
    };
  }

  const url = `https://api.torn.com/market/${itemId}?selections=market&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ item: json }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur Torn." })
    };
  }
};
