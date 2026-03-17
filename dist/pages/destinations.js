const app = document.querySelector("#app");
const T = window.TravelApp;
if (!app)
    throw new Error("app missing");
const grouped = T.activities.reduce((acc, item) => {
    if (!acc[item.country])
        acc[item.country] = [];
    acc[item.country].push(item);
    return acc;
}, {});
app.innerHTML = `
  ${T.header("destinations")}
  <main class="max-w-7xl mx-auto px-4 pb-10">
    <h1 class="text-3xl font-bold">Destinations</h1>
    <p class="text-slate-500 mt-1">Explore activities by country.</p>
    <section class="mt-6 grid md:grid-cols-2 gap-5">
      ${Object.entries(grouped).map(([country, list]) => `<article class="bg-white border rounded-2xl p-5"><h2 class="text-xl font-semibold">${country}</h2><p class="text-sm text-slate-500 mt-1">${list.length} activities</p><div class="mt-3 space-y-2">${list.map((a) => `<button data-detail="${a.id}" class="block text-left text-blue-700 hover:underline">${a.title}</button>`).join("")}</div></article>`).join("")}
    </section>
  </main>
  ${T.footer}
`;
T.bindRouteLinks();
document.querySelectorAll("[data-detail]").forEach((btn) => btn.addEventListener("click", () => T.goDetail(Number(btn.dataset.detail))));
export {};
