export {};
const app = document.querySelector<HTMLDivElement>("#app");
const T = (window as any).TravelApp;
if (!app) throw new Error("app missing");

app.innerHTML = `
  ${T.header("login")}
  <main class="max-w-5xl mx-auto px-4 pb-10 grid lg:grid-cols-2 gap-6">
    <section class="rounded-3xl overflow-hidden relative min-h-[460px]"><img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" class="absolute inset-0 w-full h-full object-cover"/><div class="absolute inset-0 bg-gradient-to-b from-black/30 to-blue-900/70"></div><div class="relative text-white p-8"><h2 class="text-4xl font-bold">Welcome back traveler</h2><p class="mt-3 text-blue-100">Sign in to manage bookings and checkout faster.</p></div></section>
    <section class="bg-white border rounded-3xl p-7"><h1 class="text-2xl font-bold">Login</h1><p class="text-slate-500 text-sm">Demo mode: any credentials accepted.</p><form id="login-form" class="mt-4 space-y-3"><input type="email" required placeholder="Email" class="w-full border rounded-xl px-3 py-2"/><input type="password" required placeholder="Password" class="w-full border rounded-xl px-3 py-2"/><button class="w-full bg-blue-600 text-white py-2 rounded-xl">Login</button></form></section>
  </main>
  ${T.footer}
`;

T.bindRouteLinks();
document.querySelector<HTMLFormElement>("#login-form")?.addEventListener("submit", (e) => { e.preventDefault(); T.setLoggedIn(true); T.go("payment"); });
