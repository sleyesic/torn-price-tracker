const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const itemId = event.queryStringParameters.itemId;
  const apiKey = event.queryStringParameters.key;

  if (!itemId || !apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing parameters." })
    };
  }

  const url = \`https://api.torn.com/v2/market/\${itemId}?selections=itemmarket&key=\${apiKey}\`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json.data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur de proxy Torn." })
    };
  }
};