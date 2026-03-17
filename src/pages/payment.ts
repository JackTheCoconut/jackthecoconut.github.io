export {};
const app = document.querySelector<HTMLDivElement>("#app");
const T = (window as any).TravelApp;
if (!app) throw new Error("app missing");
if (!T.isLoggedIn()) T.go("login");

const rows = T.cartRows();

app.innerHTML = `
  ${T.header("cart")}
  <main class="max-w-6xl mx-auto px-4 pb-10">
    <div class="mb-5 flex items-center gap-2 text-sm">
      <span class="px-3 py-1 rounded-full bg-blue-600 text-white">1 Cart</span><span class="text-slate-400">→</span>
      <span class="px-3 py-1 rounded-full bg-blue-600 text-white">2 Payment</span><span class="text-slate-400">→</span>
      <span class="px-3 py-1 rounded-full bg-slate-200 text-slate-600">3 Confirmation</span><span class="text-slate-400">→</span>
      <span class="px-3 py-1 rounded-full bg-slate-200 text-slate-600">4 Success</span>
    </div>
    <div class="grid lg:grid-cols-3 gap-6">
      <section class="lg:col-span-2 space-y-5">
        <article class="bg-white border rounded-2xl p-6">
          <h1 class="text-2xl font-bold">Payment details</h1>
          <p class="text-sm text-slate-500 mt-1">Secure checkout (demo). Choose your payment method and billing details.</p>
          <div class="mt-4 grid md:grid-cols-3 gap-3">
            <button class="border rounded-xl px-3 py-3 text-left bg-blue-50 border-blue-300"><p class="font-semibold">💳 Card</p><p class="text-xs text-slate-500 mt-1">Visa / MasterCard</p></button>
            <button class="border rounded-xl px-3 py-3 text-left"><p class="font-semibold">🅿️ PayPal</p><p class="text-xs text-slate-500 mt-1">Fast checkout</p></button>
            <button class="border rounded-xl px-3 py-3 text-left"><p class="font-semibold"> Pay</p><p class="text-xs text-slate-500 mt-1">Mobile supported</p></button>
          </div>
          <form id="pay" class="mt-6 grid md:grid-cols-2 gap-3">
            <input required class="md:col-span-2 border rounded-xl px-3 py-2" placeholder="Cardholder name"/>
            <input required class="md:col-span-2 border rounded-xl px-3 py-2" placeholder="Card number"/>
            <input required class="border rounded-xl px-3 py-2" placeholder="MM/YY"/>
            <input required class="border rounded-xl px-3 py-2" placeholder="CVV"/>
            <input class="md:col-span-2 border rounded-xl px-3 py-2" placeholder="Billing address"/>
            <input class="border rounded-xl px-3 py-2" placeholder="City"/>
            <input class="border rounded-xl px-3 py-2" placeholder="Postal code"/>
            <label class="md:col-span-2 inline-flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" required/> I agree to booking terms and cancellation policy.</label>
            <button class="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold">Review order</button>
          </form>
        </article>
      </section>
      <aside class="space-y-4">
        <article class="bg-white border rounded-2xl p-5 h-fit"><h2 class="font-semibold">Order summary</h2><div class="mt-3 space-y-2 text-sm">${rows.map((r: any) => `<div class="flex justify-between"><span>${r.activity.title} x ${r.qty}</span><span>${T.money(r.sub)}</span></div>`).join("")}</div><hr class="my-3"/><p class="flex justify-between"><span>Items</span><span>${T.cartQty()}</span></p><p class="flex justify-between text-lg font-bold mt-1"><span>Total</span><span>${T.money(T.cartTotal())}</span></p></article>
      </aside>
    </div>
  </main>
  ${T.footer}
`;

T.bindRouteLinks();
document.querySelector<HTMLFormElement>("#pay")?.addEventListener("submit", (e) => { e.preventDefault(); T.go("confirmation"); });
