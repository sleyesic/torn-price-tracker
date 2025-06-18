const items = {
  206: "Xanax",
  208: "Stat Enhancer",
  283: "Donator Pack"
};

function connect() {
  const key = document.getElementById("apiKey").value.trim();
  if (key) {
    localStorage.setItem("tornApiKey", key);
    loadPrices();
  }
}

async function loadPrices() {
  const key = localStorage.getItem("tornApiKey");
  if (!key) return;

  for (const [id, name] of Object.entries(items)) {
    try {
      const res = await fetch(`/api/proxy?itemId=${id}&key=${key}`);
      const data = await res.json();
      const listings = data.itemmarket?.listings || [];
      const top3 = listings.slice(0, 3).map(i => \`\${i.price}$ (\${i.amount})\`);
      document.querySelector(`#priceTable tr:nth-child(${Object.keys(items).indexOf(id)+1})`).innerHTML =
        `<td>${name}</td><td>${top3[0] || "N/A"}</td><td>${top3[1] || "N/A"}</td><td>${top3[2] || "N/A"}</td>`;
    } catch {
      document.querySelector(`#priceTable tr:nth-child(${Object.keys(items).indexOf(id)+1})`).innerHTML =
        `<td>${name}</td><td colspan="3">Erreur de chargement</td>`;
    }
  }
}