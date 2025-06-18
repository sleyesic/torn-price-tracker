const items = {
  206: "Xanax",
  283: "Donator Pack",
  207: "Ecstasy",
  209: "LSD",
  210: "Opium",
  288: "Plushie",
  235: "Box of Grenades",
  258: "Neumune Tablets",
  208: "Ketamine"
};

async function loadMarket() {
  const table = document.getElementById("market-table");
  table.innerHTML = "";
  for (const [id, name] of Object.entries(items)) {
    const res = await fetch(`/.netlify/functions/proxy?itemID=${id}`);
    const data = await res.json();
    if (!data.itemmarket || !data.itemmarket.listings || !data.itemmarket.listings.length) continue;
    const listing = data.itemmarket.listings[0];
    const row = `<tr>
      <td>${name}</td>
      <td>${listing.price.toLocaleString()}$</td>
      <td>${listing.amount}</td>
      <td><a href="https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname=${name}" target="_blank">Buy</a></td>
    </tr>`;
    table.innerHTML += row;
  }
}

window.onload = loadMarket;
