const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const itemId = event.queryStringParameters.itemId;
    const apiKey = event.queryStringParameters.key;

    if (!apiKey) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing Torn API key." })
        };
    }

    const url = `https://api.torn.com/v2/market/${itemId}?selections=itemmarket&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const json = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(json), // <-- ne pas utiliser `json.data`, garder `json` entier
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
