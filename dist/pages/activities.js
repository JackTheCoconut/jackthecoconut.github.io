const app = document.querySelector("#app");
const T = window.TravelApp;
if (!app)
    throw new Error("app missing");
let keyword = "";
let category = "All";
let sort = "recommended";
const render = () => {
    let list = [...T.activities];
    if (keyword.trim()) {
        const key = keyword.toLowerCase();
        list = list.filter((a) => `${a.title} ${a.city} ${a.country} ${a.description}`.toLowerCase().includes(key));
    }
    if (category !== "All")
        list = list.filter((a) => a.category === category);
    if (sort === "price-low")
        list.sort((a, b) => a.price - b.price);
    if (sort === "price-high")
        list.sort((a, b) => b.price - a.price);
    if (sort === "rating")
        list.sort((a, b) => b.rating - a.rating);
    app.innerHTML = `
    ${T.header("activities")}
    <main class="max-w-7xl mx-auto px-4 pb-10">
      <section class="bg-white border rounded-2xl p-4 mb-5 grid lg:grid-cols-4 gap-3">
        <input id="search" value="${keyword.replace(/"/g, "&quot;")}" class="lg:col-span-2 border rounded-xl px-3 py-2" placeholder="Search activities, cities, keywords"/>
        <select id="category" class="border rounded-xl px-3 py-2">${["All", "Water", "Nature", "Food", "Adventure", "Culture"].map((c) => `<option ${category === c ? "selected" : ""}>${c}</option>`).join("")}</select>
        <select id="sort" class="border rounded-xl px-3 py-2">${[["recommended", "Recommended"], ["price-low", "Price: Low to High"], ["price-high", "Price: High to Low"], ["rating", "Highest Rating"]].map(([v, l]) => `<option value="${v}" ${sort === v ? "selected" : ""}>${l}</option>`).join("")}</select>
      </section>
      <p class="text-sm text-slate-500 mb-4">${list.length} results found</p>
      <section class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        ${list.map((a) => `<article class="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"><img src="${a.image}" class="w-full h-44 object-cover"/><div class="p-4"><div class="text-xs text-blue-700 font-semibold">${a.category}</div><h2 class="font-semibold text-lg mt-1">${a.title}</h2><p class="text-sm text-slate-500">${a.city}, ${a.country} • ${a.duration}</p><p class="text-sm mt-2 text-amber-600">★ ${a.rating}</p><p class="text-blue-700 font-bold mt-2">${T.money(a.price)}</p><div class="mt-3 flex gap-2"><button data-detail="${a.id}" class="px-3 py-2 border rounded-lg text-sm">View details</button><button data-add="${a.id}" class="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm">Add cart</button></div></div></article>`).join("")}
      </section>
    </main>
    ${T.footer}
  `;
    T.bindRouteLinks();
    document.querySelectorAll("[data-add]").forEach((btn) => btn.addEventListener("click", () => { T.addToCart(Number(btn.dataset.add)); T.go("cart"); }));
    document.querySelectorAll("[data-detail]").forEach((btn) => btn.addEventListener("click", () => T.goDetail(Number(btn.dataset.detail))));
    document.querySelector("#search")?.addEventListener("input", (e) => { keyword = e.target.value; render(); });
    document.querySelector("#category")?.addEventListener("change", (e) => { category = e.target.value; render(); });
    document.querySelector("#sort")?.addEventListener("change", (e) => { sort = e.target.value; render(); });
};
render();
export {};
