export {};
const app = document.querySelector<HTMLDivElement>("#app");
const T = (window as any).TravelApp;
if (!app) throw new Error("app missing");

const id = Number(new URLSearchParams(window.location.search).get("id") ?? "1");
const a = T.activities.find((x: any) => x.id === id) ?? T.activities[0];

app.innerHTML = `
  ${T.header("activities")}
  <main class="max-w-7xl mx-auto px-4 pb-10">
    <section class="grid lg:grid-cols-5 gap-6">
      <img src="${a.image}" class="lg:col-span-3 w-full h-[430px] object-cover rounded-2xl"/>
      <aside class="lg:col-span-2 bg-white border rounded-2xl p-5">
        <div class="text-xs text-blue-700 font-semibold">${a.category}</div>
        <h1 class="text-2xl font-bold mt-1">${a.title}</h1>
        <p class="text-slate-500 mt-1">${a.city}, ${a.country} • ${a.duration}</p>
        <p class="text-sm text-slate-600 mt-3">${a.description}</p>
        <p class="mt-4 text-blue-700 text-2xl font-bold">${T.money(a.price)}</p>
        <button id="add" class="mt-4 w-full bg-orange-500 text-white rounded-xl py-2.5 font-semibold">Add to cart</button>
        <button data-route="activities" class="mt-2 w-full border rounded-xl py-2.5">Back to activities</button>
      </aside>
    </section>
    <section class="bg-white border rounded-2xl p-6 mt-6">
      <h2 class="text-xl font-bold">Activity itinerary</h2>
      <div class="mt-4 grid md:grid-cols-2 gap-3">${a.itinerary.map((s: string, i: number) => `<div class="border rounded-xl p-3"><p class="text-xs text-blue-700 font-semibold">STOP ${i + 1}</p><p class="mt-1 text-slate-700">${s}</p></div>`).join("")}</div>
    </section>
  </main>
  ${T.footer}
`;

T.bindRouteLinks();
document.querySelector<HTMLButtonElement>("#add")?.addEventListener("click", () => { T.addToCart(a.id); T.go("cart"); });
