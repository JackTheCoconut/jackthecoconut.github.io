const app = document.querySelector("#app");
const T = window.TravelApp;
if (!app)
    throw new Error("app missing");
app.innerHTML = `
  ${T.header("cart")}
  <main class="max-w-4xl mx-auto px-4 pb-10">
    <section class="bg-white border rounded-2xl p-6">
      <h1 class="text-2xl font-bold">Confirm your booking</h1>
      <p class="text-sm text-slate-500 mt-1">Review all items before placing order.</p>
      <div class="mt-4 space-y-2">${T.cartRows().map((r) => `<div class="flex justify-between border-b pb-2"><span>${r.activity.title} x ${r.qty}</span><span>${T.money(r.sub)}</span></div>`).join("")}</div>
      <p class="flex justify-between font-bold text-lg mt-4"><span>Total</span><span>${T.money(T.cartTotal())}</span></p>
      <button id="place" class="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg">Place order</button>
    </section>
  </main>
  ${T.footer}
`;
document.querySelector("#place")?.addEventListener("click", () => {
    T.setCart([]);
    window.location.href = "./success.html";
});
export {};
