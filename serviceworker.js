self.addEventListener("fetch", (event) => {
  //> for other routes

  //* if (event.request.url === "/product-*") event.respondWith(fetch("/"));

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        return fetch(event.request);
      }
    })()
  );
});

self.addEventListener("install", async () => {
  const cache = await caches.open("cm-shell");
  cache.addAll([
    "/",
    "/styles.css",
    "/scripts/API.js",
    "/scripts/app.js",
    "/scripts/Menu.js",
    "/scripts/Order.js",
    "/scripts/Router.js",
    "/images/logo.png",
    "/images/logo.svg",
    "/images/icons/icon.png",
    "/images/icons/icon-maskable.png",
    "/app.webmanifest",
    "https://cdn.jsdelivr.net/npm/idb@7/build/umd.js",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap",
  ]);
});
