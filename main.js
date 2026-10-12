const form = document.querySelector("#product-form");
const skuNode = document.querySelector("#product-sku");
const priceNode = document.querySelector("#product-price");
const oldPriceNode = document.querySelector("#product-old-price");

const formatPrice = (value) => {
  const number = Number(value);
  const hasCents = Math.round(number * 100) % 100 !== 0;
  const [integer, fraction] = number.toFixed(hasCents ? 2 : 0).split(".");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  const formatted = fraction ? `${grouped},${fraction}` : grouped;

  return `${formatted}\u00A0₽`;
};

const renderPack = (input) => {
  const current = Number(input.dataset.price);
  const previous = Number(input.dataset.oldPrice);
  const hasDiscount = previous > current;

  skuNode.textContent = input.dataset.sku;
  priceNode.textContent = formatPrice(current);
  oldPriceNode.hidden = !hasDiscount;

  if (hasDiscount) {
    oldPriceNode.textContent = formatPrice(previous);
  }
};

form.addEventListener("change", (event) => {
  if (event.target.name !== "pack") {
    return;
  }

  renderPack(event.target);
});
