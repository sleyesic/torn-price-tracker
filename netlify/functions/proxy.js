export default async function handler(req, res) {
    const { itemId, key } = req.query;

    if (!itemId || !key) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await fetch(`https://api.torn.com/v2/market/${itemId}?selections=itemmarket&key=${key}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Proxy fetch failed", details: error.message });
    }
}
