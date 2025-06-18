const items = {
  206: "Xanax",
  209: "Stat Enhancer",
  283: "Donator Pack"
};

document.getElementById("loginBtn").addEventListener("click", () => {
  const key = document.getElementById("apiKey").value.trim();
  if (key) {
    localStorage.setItem("tornApiKey", key);
    loadPrices();
  }
});

document.getElementById("refreshBtn").addEventListener("click", loadPrices);

function loadPrices() {
  const key = localStorage.getItem("tornApiKey");
  const table = document.getElementById("dataTable");
  table.innerHTML = "";
  if (!key) return alert("Clé API manquante.");

  Object.entries(items).forEach(([id, name]) => {
    fetch(`/proxy?itemId=${id}&key=${key}`)
      .then(res => res.json())
      .then(data => {
        if (!data.itemmarket?.listings) throw new Error("Pas de données.");
        const top3 = data.itemmarket.listings.slice(0, 3);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${name}</td>
          ${top3.map(i => `<td><a href="https://www.torn.com/imarket.php#/p=shop&type=inventory&searchname=&id=${id}" target="_blank">${i.price.toLocaleString()}$ (${i.amount})</a></td>`).join("")}
          ${"<td>Erreur de chargement</td>".repeat(3 - top3.length)}
        `;
        table.appendChild(row);
      })
      .catch(() => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${name}</td><td colspan="3">Erreur de chargement</td>`;
        table.appendChild(row);
      });
  });
}
