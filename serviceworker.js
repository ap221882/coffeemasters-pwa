// self.addEventListener("fetch", (event) => {
//   //> for other routes

//   //* if (event.request.url === "/product-*") event.respondWith(fetch("/"));

//   event.respondWith(
//     (async () => {
//       const cachedResponse = await caches.match(event.request);
//       if (cachedResponse) {
//         return cachedResponse;
//       } else {
//         return fetch(event.request);
//       }
//     })()
//   );
// });

//* NETWORK FIRST APPROACH
self.addEventListener("fetch", async (event) => {
  event.respondWith(
    (async () => {
      try {
        const fetchResponse = await fetch(event.request);
        //! TODO: UPDATE THE CACHE HERE
        const cache = await caches.open("cm-updatedassets");
        //# cloning needed because http responses in JS cant be reused - because they are streams - when you consume the stream, the stream(data) is gone
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
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
