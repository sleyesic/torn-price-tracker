
const items = [
  { id: 206, name: "Xanax" },
  { id: 209, name: "Stat Enhancer" },
  { id: 210, name: "Donator Pack" }
];

function connect() {
  const key = document.getElementById("apiKey").value;
  if (!key) return alert("Veuillez entrer une clé API.");
  localStorage.setItem("apiKey", key);
  loadPrices();
}

async function loadPrices() {
  const key = localStorage.getItem("apiKey");
  if (!key) return;

  const container = document.getElementById("priceList");
  container.innerHTML = "";

  for (let item of items) {
    try {
      const response = await fetch(`/api/proxy?itemId=${item.id}&key=${key}`);
      const data = await response.json();

      const listings = data.itemmarket?.listings || [];
      const top3 = listings.slice(0, 3);

      const html = `
        <h2>${item.name}</h2>
        ${top3.map(listing => `
          <p>
            💰 <strong>${listing.price.toLocaleString()}$</strong> – 
            📦 ${listing.amount} 
            <a href="https://www.torn.com/imarket.php#/p=shop&type=item&id=${item.id}" target="_blank">🛒 Acheter</a>
          </p>`).join("")}
      `;

      container.innerHTML += `<div class="item-box">${html}</div>`;
    } catch (err) {
      container.innerHTML += `<div class="item-box"><h2>${item.name}</h2><p>Erreur de chargement.</p></div>`;
    }
  }
}

document.getElementById("connectBtn").addEventListener("click", connect);
document.getElementById("refreshBtn").addEventListener("click", loadPrices);
