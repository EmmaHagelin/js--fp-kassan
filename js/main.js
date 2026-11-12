// Kassan
// import { checkout } from './kassa-imperativ.js';   // bortkommenterad: den ändrar products
import { products, lines, discountCodes, VAT_RATE } from './data.js';
import { formatReceipt } from './receipt.js';
import { createCart } from './cart.js';

// 1. Kör den gamla kassan. Kör den sedan en gång till, med samma rabattkod.
// TODO: Gissa först. Blir kvittot detsamma båda gångerna? Varför inte?
// Svar: Nej. checkout ändrar product.price (rabatten dras igen varje gång),
// total och receiptText är globala och nollställs aldrig, och line.sum ändrar lines.
// checkout('STUDENT');
// checkout('STUDENT');

// --- Del A ---
console.log(formatReceipt(lines, products, 'STUDENT', discountCodes, VAT_RATE));
console.log(formatReceipt(lines, products, 'STUDENT', discountCodes, VAT_RATE));

// --- Del B ---
const cart = createCart(products);
cart.add('latte', 2);
cart.add('bulle', 3);
cart.add('macka');
console.log(cart.lines());
console.log(cart.total());

// --- Del C ---
const receiptText = formatReceipt(cart.lines(), products, 'STUDENT', discountCodes, VAT_RATE);
document.querySelector('#receipt').textContent = receiptText;