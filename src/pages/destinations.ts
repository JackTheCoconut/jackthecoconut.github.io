export {};
const app = document.querySelector<HTMLDivElement>("#app");
const T = (window as any).TravelApp;
if (!app) throw new Error("app missing");

const grouped = T.activities.reduce((acc: Record<string, any[]>, item: any) => {
  const key = item.country;
  if (!acc[key]) acc[key] = [];
  acc[key].push(item);
  return acc;
}, {} as Record<string, any[]>);

app.innerHTML = `
  ${T.header("destinations")}
  <main class="max-w-7xl mx-auto px-4 pb-10">
    <h1 class="text-3xl font-bold">Destinations</h1>
    <p class="text-slate-500 mt-1">Explore activities by country.</p>
    <section class="mt-6 grid md:grid-cols-2 gap-5">
      ${Object.entries(grouped).map(([country, list]) => `
        <article class="bg-white border rounded-2xl p-5">
          <h2 class="text-xl font-semibold">${country}</h2>
          <p class="text-sm text-slate-500 mt-1">${(list as any[]).length} activities</p>
          <div class="mt-3 space-y-2">
            ${(list as any[]).map((a: any) => `<a href="./activity-detail.html?id=${a.id}" class="block text-blue-700 hover:underline">${a.title}</a>`).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  </main>
  ${T.footer}
`;
