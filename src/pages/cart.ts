export {};
const app = document.querySelector<HTMLDivElement>("#app");
const T = (window as any).TravelApp;
if (!app) throw new Error("app missing");
const rows = T.cartRows();

app.innerHTML = `
  ${T.header("cart")}
  <main class="max-w-7xl mx-auto px-4 pb-10">
    <h1 class="text-3xl font-bold mb-4">Your cart</h1>
    ${rows.length ? `<section class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-3">${rows.map((r: any) => `<article class="bg-white border rounded-xl p-4 flex items-center gap-4"><img src="${r.activity.image}" class="w-24 h-20 rounded object-cover"/><div class="flex-1"><h3 class="font-semibold">${r.activity.title}</h3><p class="text-sm text-slate-500">${r.activity.city}, ${r.activity.country}</p></div><div class="flex items-center gap-2"><button data-minus="${r.activity.id}" class="w-8 h-8 border rounded">-</button><span>${r.qty}</span><button data-plus="${r.activity.id}" class="w-8 h-8 border rounded">+</button></div><b>${T.money(r.sub)}</b></article>`).join("")}</div><aside class="bg-white border rounded-xl p-5 h-fit"><p class="flex justify-between"><span>Items</span><span>${T.cartQty()}</span></p><p class="flex justify-between text-lg font-bold mt-2"><span>Total</span><span>${T.money(T.cartTotal())}</span></p><a href="./payment.html" class="block mt-4 text-center bg-orange-500 text-white py-2 rounded-lg">Continue to payment</a></aside></section>` : `<div class="bg-white border rounded-2xl p-10 text-center">No items in cart yet.</div>`}
  </main>
  ${T.footer}
`;

document.querySelectorAll<HTMLButtonElement>("[data-minus]").forEach((btn) => btn.addEventListener("click", () => {
  const id = Number(btn.dataset.minus);
  const row = rows.find((r: any) => r.activity.id === id);
  if (row) T.updateCartQty(id, row.qty - 1);
  location.reload();
}));

document.querySelectorAll<HTMLButtonElement>("[data-plus]").forEach((btn) => btn.addEventListener("click", () => {
  const id = Number(btn.dataset.plus);
  const row = rows.find((r: any) => r.activity.id === id);
  if (row) T.updateCartQty(id, row.qty + 1);
  location.reload();
}));
