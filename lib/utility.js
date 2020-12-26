export function priceToString(n) {
  // 495
  const dollarPrice = (n / 100).toFixed(2);

  return `$${dollarPrice}`;
}

export function displayTotalPrice(price) {
  return priceToString(price);
}

export function calcTotalPriceInCents(price, quantity) {
  return price * quantity;
}
