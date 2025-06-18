let apiKey = '';

function connect() {
  const input = document.getElementById("apiKeyInput").value.trim();
  if (!input) return alert("Veuillez entrer une clé API Torn valide.");
  apiKey = input;
  localStorage.setItem("tornApiKey", apiKey);
  loadPrices();
}

async function loadPrices() {
  const ids = {
    "xanax": 208,
    "stat": 209,
    "dp": 206
  };

  for (const [name, id] of Object.entries(ids)) {
    const el = document.getElementById("prix-" + name);
    el.textContent = "Chargement...";
    try {
      const res = await fetch(`/api/proxy?itemId=${id}&key=${apiKey}`);
      const data = await res.json();
      if (!data.listings || data.listings.length === 0) {
        el.textContent = "Aucune donnée.";
        continue;
      }
      const prix = data.listings.slice(0, 3)
        .map(p => `${p.price.toLocaleString()}$ (${p.amount})`)
        .join(" | ");
      el.textContent = prix;
    } catch {
      el.textContent = "Erreur de chargement.";
    }
  }
}

window.onload = () => {
  const stored = localStorage.getItem("tornApiKey");
  if (stored) {
    document.getElementById("apiKeyInput").value = stored;
    apiKey = stored;
    loadPrices();
  }
};
