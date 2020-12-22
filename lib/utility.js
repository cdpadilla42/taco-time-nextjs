export function priceToString(n) {
  // 495
  const dollarPrice = (n / 100).toFixed(2);

  return `$${dollarPrice}`;
}
