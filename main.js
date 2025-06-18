
let apiKey = "";

function connect() {
  apiKey = document.getElementById("apiKey").value.trim();
  localStorage.setItem("tornApiKey", apiKey);
  loadPrices();
}

async function loadPrices() {
  apiKey = localStorage.getItem("tornApiKey") || "";
  if (!apiKey) return alert("Clé API manquante.");

  const items = {
    xanax: 206,
    stat: 208,
    dp: 209
  };

  for (const [name, id] of Object.entries(items)) {
    try {
      const res = await fetch(`/api/proxy?itemId=${id}&key=${apiKey}`);
      const data = await res.json();
      const prices = (data?.item?.market?.[id]?.[0]?.price) ? data.item.market[id].slice(0, 3) : [];
      for (let i = 0; i < 3; i++) {
        document.getElementById(`${name}${i}`).textContent = prices[i]
          ? `${prices[i].price.toLocaleString()}$ (${prices[i].amount})`
          : "Erreur de chargement";
      }
    } catch (e) {
      for (let i = 0; i < 3; i++) {
        document.getElementById(`${name}${i}`).textContent = "Erreur de chargement";
      }
    }
  }
}
