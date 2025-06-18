const apiKey = "7SME3JWfIcVWRGLY";
const items = [
    { id: 206, name: "Xanax" },
    { id: 283, name: "Donator Pack" },
    { id: 209, name: "Stat Enhancer" },
    { id: 210, name: "Ecstasy" },
    { id: 224, name: "LSD" },
    { id: 227, name: "Vicodin" },
    { id: 226, name: "Ketamine" },
    { id: 225, name: "PCP" },
    { id: 244, name: "FHC" },
];

const table = document.getElementById("price-table");
const refreshButton = document.getElementById("refresh");

async function fetchItemPrice(item) {
    const response = await fetch(`/api/proxy?itemId=${item.id}&key=${apiKey}`);
    const data = await response.json();
    const listings = data?.itemmarket?.[item.id]?.listings || [];

    if (listings.length === 0) return null;

    listings.sort((a, b) => a.price - b.price);
    return {
        price: listings[0].price,
        amount: listings[0].amount,
        link: `https://www.torn.com/imarket.php#/p=shop&type=inventory&searchname=&id=${item.id}`,
    };
}

async function refreshPrices() {
    table.innerHTML = ""; // Clear table

    for (const item of items) {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const priceCell = document.createElement("td");
        const qtyCell = document.createElement("td");
        const buyCell = document.createElement("td");

        nameCell.textContent = item.name;

        try {
            const result = await fetchItemPrice(item);

            if (result) {
                priceCell.textContent = `${result.price.toLocaleString()} $`;
                qtyCell.textContent = `${result.amount}`;
                buyCell.innerHTML = `<a href="${result.link}" target="_blank">Buy</a>`;
            } else {
                priceCell.textContent = "N/A";
                qtyCell.textContent = "N/A";
                buyCell.textContent = "-";
            }
        } catch (e) {
            priceCell.textContent = "Error";
            qtyCell.textContent = "-";
            buyCell.textContent = "-";
        }

        row.append(nameCell, priceCell, qtyCell, buyCell);
        table.appendChild(row);
    }
}

refreshButton.addEventListener("click", refreshPrices);
refreshPrices(); // Load on start
