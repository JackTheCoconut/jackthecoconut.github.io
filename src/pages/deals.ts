export {};
const app = document.querySelector<HTMLDivElement>("#app");
const T = (window as any).TravelApp;
if (!app) throw new Error("app missing");

const deals = [...T.activities].sort((a: any, b: any) => a.price - b.price).slice(0, 6);

app.innerHTML = `
  ${T.header("deals")}
  <main class="max-w-7xl mx-auto px-4 pb-10">
    <section class="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-400 text-white p-8">
      <h1 class="text-4xl font-bold">Limited-time Deals</h1>
      <p class="mt-2 text-orange-50">Book early and save on top experiences.</p>
    </section>

    <section class="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      ${deals.map((a: any, i: number) => `<article class="bg-white border rounded-2xl overflow-hidden"><img src="${a.image}" class="w-full h-44 object-cover"/><div class="p-4"><p class="text-xs text-orange-600 font-semibold">SAVE ${(12 + i * 2)}%</p><h2 class="font-semibold text-lg">${a.title}</h2><p class="text-sm text-slate-500">${a.city}, ${a.country}</p><p class="text-blue-700 font-bold mt-2">${T.money(a.price)}</p><div class="mt-3 flex gap-2"><button data-detail="${a.id}" class="px-3 py-2 border rounded-lg text-sm">View</button><button data-add="${a.id}" class="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm">Grab deal</button></div></div></article>`).join("")}
    </section>
  </main>
  ${T.footer}
`;

T.bindRouteLinks();
document.querySelectorAll<HTMLButtonElement>("[data-add]").forEach((btn) => btn.addEventListener("click", () => { T.addToCart(Number(btn.dataset.add)); T.go("cart"); }));
document.querySelectorAll<HTMLButtonElement>("[data-detail]").forEach((btn) => btn.addEventListener("click", () => T.goDetail(Number(btn.dataset.detail))));
