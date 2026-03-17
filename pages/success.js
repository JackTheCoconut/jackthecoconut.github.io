const app = document.querySelector("#app");
const T = window.TravelApp;
if (!app)
    throw new Error("app missing");
app.innerHTML = `
  ${T.header("home")}
  <main class="max-w-2xl mx-auto px-4 pb-10">
    <section class="bg-white border rounded-2xl p-8 text-center">
      <h1 class="text-3xl font-bold text-emerald-700">🎉 Booking successful</h1>
      <p class="text-slate-600 mt-3">Your order has been placed. Vouchers and details are ready in your account (demo).</p>
      <a href="./activities.html" class="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg">Continue exploring</a>
    </section>
  </main>
  ${T.footer}
`;
export {};
