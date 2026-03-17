type Category = "Water" | "Nature" | "Food" | "Adventure" | "Culture";

type Activity = {
  id: number;
  title: string;
  city: string;
  country: string;
  duration: string;
  price: number;
  rating: number;
  category: Category;
  image: string;
  description: string;
  itinerary: string[];
};

type CartItem = { activityId: number; qty: number };

type RouteName =
  | "home"
  | "activities"
  | "destinations"
  | "deals"
  | "login"
  | "cart"
  | "payment"
  | "confirmation"
  | "success";

const ROUTES: Record<RouteName, string> = {
  home: "./index.html",
  activities: "./activities.html",
  destinations: "./destinations.html",
  deals: "./deals.html",
  login: "./login.html",
  cart: "./cart.html",
  payment: "./payment.html",
  confirmation: "./confirmation.html",
  success: "./success.html"
};

const activities: Activity[] = [
  { id: 1, title: "Phi Phi Islands Premium Snorkel", city: "Phuket", country: "Thailand", duration: "6h", price: 59, rating: 4.8, category: "Water", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80", description: "Snorkel in crystal-clear waters with island transfer.", itinerary: ["08:00 Pickup", "09:00 Speedboat", "10:00 Snorkel", "12:00 Lunch", "14:00 Beach", "16:00 Return"] },
  { id: 2, title: "Mt. Batur Sunrise Trek", city: "Bali", country: "Indonesia", duration: "5h", price: 42, rating: 4.7, category: "Nature", image: "https://images.unsplash.com/photo-1464822759844-d150ad6ba46b?auto=format&fit=crop&w=1200&q=80", description: "Guided pre-dawn hike with volcano sunrise.", itinerary: ["02:30 Pickup", "04:00 Trek", "05:45 Sunrise", "06:30 Breakfast", "09:00 Drop-off"] },
  { id: 3, title: "Seoul Night Street Food Crawl", city: "Seoul", country: "South Korea", duration: "3h", price: 48, rating: 4.9, category: "Food", image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80", description: "Local foodie walk through iconic markets.", itinerary: ["18:00 Meet", "18:30 Tasting", "19:30 BBQ", "20:15 Dessert", "21:00 End"] },
  { id: 4, title: "Dubai Desert Safari + BBQ", city: "Dubai", country: "UAE", duration: "7h", price: 73, rating: 4.6, category: "Adventure", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", description: "Dune bashing and camp dinner experience.", itinerary: ["14:00 Pickup", "15:30 Dune drive", "17:00 Camel ride", "19:00 Dinner", "21:00 Return"] },
  { id: 5, title: "Kyoto Hidden Temples Bike Tour", city: "Kyoto", country: "Japan", duration: "4h", price: 37, rating: 4.5, category: "Culture", image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80", description: "Cycle through scenic old town and temples.", itinerary: ["09:00 Bike fit", "09:30 District", "10:30 Temple", "11:30 Tea", "13:00 End"] },
  { id: 6, title: "Santorini Catamaran Sunset Cruise", city: "Santorini", country: "Greece", duration: "5h", price: 96, rating: 4.9, category: "Water", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80", description: "Premium sunset sail with meal onboard.", itinerary: ["15:00 Transfer", "16:00 Board", "17:30 Swim", "19:00 Dinner", "20:00 Sunset"] },
  { id: 7, title: "Lisbon Coastal E-bike Tour", city: "Lisbon", country: "Portugal", duration: "3h", price: 41, rating: 4.7, category: "Adventure", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80", description: "Ride oceanfront routes with local stories and cafe breaks.", itinerary: ["10:00 Briefing", "10:30 Coastline ride", "11:30 Belem stop", "12:30 Return"] },
  { id: 8, title: "Swiss Alps Panorama Hike", city: "Interlaken", country: "Switzerland", duration: "6h", price: 88, rating: 4.8, category: "Nature", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", description: "Guided mountain trail with iconic alpine viewpoints.", itinerary: ["07:30 Meet", "08:30 Trail", "11:00 Ridge point", "13:30 Return"] }
];

const STORAGE = { cart: "travel-cart-multi", auth: "travel-auth-multi" };

const go = (route: RouteName): void => {
  window.location.href = ROUTES[route];
};

const goDetail = (id: number): void => {
  window.location.href = `./activity-detail.html?id=${id}`;
};

const bindRouteLinks = (root: ParentNode = document): void => {
  root.querySelectorAll<HTMLElement>("[data-route]").forEach((node) => {
    node.addEventListener("click", () => {
      const route = node.dataset.route as RouteName | undefined;
      if (route) go(route);
    });
  });
};

const getCart = (): CartItem[] => JSON.parse(localStorage.getItem(STORAGE.cart) ?? "[]") as CartItem[];
const setCart = (cart: CartItem[]): void => localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
const isLoggedIn = (): boolean => localStorage.getItem(STORAGE.auth) === "true";
const setLoggedIn = (v: boolean): void => localStorage.setItem(STORAGE.auth, v ? "true" : "false");

const addToCart = (activityId: number): void => {
  const cart = getCart();
  const found = cart.find((x) => x.activityId === activityId);
  if (found) found.qty += 1;
  else cart.push({ activityId, qty: 1 });
  setCart(cart);
};

const updateCartQty = (activityId: number, qty: number): void => {
  const next = getCart().map((x) => (x.activityId === activityId ? { ...x, qty } : x)).filter((x) => x.qty > 0);
  setCart(next);
};

const cartRows = (): Array<{ activity: Activity; qty: number; sub: number }> =>
  getCart()
    .map((item) => {
      const activity = activities.find((a) => a.id === item.activityId);
      return activity ? { activity, qty: item.qty, sub: item.qty * activity.price } : null;
    })
    .filter((x): x is { activity: Activity; qty: number; sub: number } => !!x);

const cartQty = (): number => cartRows().reduce((s, x) => s + x.qty, 0);
const cartTotal = (): number => cartRows().reduce((s, x) => s + x.sub, 0);
const money = (n: number): string => `$${n.toFixed(2)}`;

const header = (active: string): string => `
<div class="bg-slate-900 text-slate-200 text-xs py-2"><div class="max-w-7xl mx-auto px-4 flex justify-between"><p>Marketplace style travel activities</p><p>24/7 Support • Free cancellation</p></div></div>
<header class="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
  <button data-route="home" class="text-left font-bold text-2xl text-blue-700">Acenda Travel</button>
  <nav class="flex gap-2 flex-wrap">
    <button data-route="home" class="px-4 py-2 rounded-full border ${active === "home" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-300"}">Home</button>
    <button data-route="activities" class="px-4 py-2 rounded-full border ${active === "activities" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-300"}">Activities</button>
    <button data-route="destinations" class="px-4 py-2 rounded-full border ${active === "destinations" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-300"}">Destinations</button>
    <button data-route="deals" class="px-4 py-2 rounded-full border ${active === "deals" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-300"}">Deals</button>
    <button data-route="login" class="px-4 py-2 rounded-full border ${active === "login" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-300"}">Login</button>
    <button data-route="cart" class="px-4 py-2 rounded-full border ${active === "cart" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-300"}">Cart (${cartQty()})</button>
  </nav>
</header>`;

const footer = `
<footer class="border-t mt-12">
  <div class="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-5 text-sm text-slate-600">
    <div><p class="font-semibold text-slate-800">Acenda Travel</p><p class="mt-2">Designed for modern activity booking.</p></div>
    <div><p class="font-semibold text-slate-800">Company</p><p class="mt-2">About</p><p>Careers</p></div>
    <div><p class="font-semibold text-slate-800">Support</p><p class="mt-2">Help Center</p><p>Refund Policy</p></div>
    <div><p class="font-semibold text-slate-800">Payments</p><p class="mt-2">Visa • MasterCard • PayPal</p></div>
  </div>
</footer>`;

(window as any).TravelApp = { activities, getCart, setCart, isLoggedIn, setLoggedIn, addToCart, updateCartQty, cartRows, cartQty, cartTotal, header, footer, money, go, goDetail, bindRouteLinks };
