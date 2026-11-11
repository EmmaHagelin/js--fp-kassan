// Rena funktioner för kassan. Inga sidoeffekter här.
// Rena funktioner för kassan. Inga sidoeffekter här.

export const findProduct = (products, id) =>
  products.find((product) => product.id === id);

export const lineTotal = (line, products) =>
  findProduct(products, line.productId).price * line.quantity;

export const subtotal = (lines, products) =>
  lines.reduce((sum, line) => sum + lineTotal(line, products), 0);

export const applyDiscount = (amount, code, codes) =>
  amount * (1 - (codes[code] ?? 0));

export const vatOf = (amount, rate) => amount - amount / (1 + rate);

export const formatReceipt = (lines, products, code, codes, vatRate) => {
  const rows = lines.map((line) => {
    const product = findProduct(products, line.productId);
    return `${product.name} x${line.quantity}  ${lineTotal(line, products)} kr`;
  });
  const sum = subtotal(lines, products);
  const total = applyDiscount(sum, code, codes);
  const discount = sum - total;
  const discountRow = discount > 0 ? [`Rabatt (${code}): -${discount.toFixed(2)} kr`] : [];

  return [
    ...rows,
    ...discountRow,
    `Totalt: ${total.toFixed(2)} kr (varav moms ${vatOf(total, vatRate).toFixed(2)} kr)`,
  ].join('\n');
};
