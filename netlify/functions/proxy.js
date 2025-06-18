export default async function handler(req, res) {
    const { itemId, key } = req.query;

    if (!itemId || !key) {
        return res.status(400).json({ error: "Missing itemId or API key." });
    }

    try {
        const url = `https://api.torn.com/v2/market/${itemId}?selections=itemmarket&key=${key}`;
        const response = await fetch(url);
        const data = await response.json();

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Fetch failed", details: err.message });
    }
}
