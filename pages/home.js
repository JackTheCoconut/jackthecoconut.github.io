const app = document.querySelector("#app");
const T = window.TravelApp;
if (!app)
    throw new Error("app missing");
app.innerHTML = `
  ${T.header("home")}
  <main class="max-w-7xl mx-auto px-4 pb-10">
    <section class="rounded-3xl bg-gradient-to-r from-blue-700 to-sky-500 text-white p-8 md:p-12 shadow-lg">
      <p class="text-xs uppercase tracking-[0.2em] text-blue-100">Booking platform concept</p>
      <h1 class="text-4xl md:text-5xl font-bold mt-3">Discover and book unforgettable activities</h1>
      <p class="mt-3 text-blue-100 max-w-2xl">Inspired by premium travel marketplace layouts with clearer discovery, stronger trust elements, and full conversion pages.</p>
      <div class="mt-6 bg-white rounded-2xl p-3 grid md:grid-cols-5 gap-2 text-slate-700">
        <input placeholder="Search destination or activity" class="md:col-span-3 border rounded-xl px-3 py-2" />
        <a href="./activities.html" class="border rounded-xl px-3 py-2 text-center font-medium">Explore</a>
        <a href="./deals.html" class="bg-orange-500 text-white rounded-xl px-3 py-2 text-center font-semibold">Best deals</a>
      </div>
    </section>

    <section class="mt-8 grid md:grid-cols-4 gap-3">
      ${["Free cancellation", "Instant confirmation", "Secure payment", "Trusted reviews"].map((x) => `<div class="bg-white border rounded-xl px-4 py-3 text-sm font-medium">${x}</div>`).join("")}
    </section>

    <section class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Featured experiences</h2>
        <a href="./activities.html" class="text-sm text-blue-700 font-medium">View all</a>
      </div>
      <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        ${T.activities.slice(0, 8).map((a) => `<article class="bg-white rounded-2xl border overflow-hidden"><img src="${a.image}" class="w-full h-40 object-cover"/><div class="p-4"><h3 class="font-semibold">${a.title}</h3><p class="text-sm text-slate-500 mt-1">${a.city}, ${a.country}</p><p class="text-blue-700 font-bold mt-2">${T.money(a.price)}</p></div></article>`).join("")}
      </div>
    </section>

    <section class="mt-8 grid md:grid-cols-3 gap-4">
      ${[
    { n: "4.8/5", t: "Average rating from global travelers" },
    { n: "98%", t: "Booking confirmation within minutes" },
    { n: "120+", t: "Curated activity partners" }
].map((k) => `<article class="bg-white border rounded-2xl p-5"><h3 class="text-3xl font-bold text-blue-700">${k.n}</h3><p class="text-sm text-slate-600 mt-2">${k.t}</p></article>`).join("")}
    </section>
  </main>
  ${T.footer}
`;
export {};
