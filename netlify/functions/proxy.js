const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { itemId, key } = event.queryStringParameters;
  if (!key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing API key" }),
    };
  }

  const url = `https://api.torn.com/v2/market/${itemId}?selections=itemmarket&key=${key}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur proxy Torn" }),
    };
  }
};
