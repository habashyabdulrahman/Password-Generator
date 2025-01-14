const CACHE_NAME = "password-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/main.js",
  "/icon.png",
  "/icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("password-cache-v1")
      .then((cache) => {
        return Promise.allSettled(
          urlsToCache.map((url) => cache.add(url))
        ).then((results) => {
          results.forEach((result) => {
            if (result.status === "rejected") {
              console.error(
                `Failed to cache ${result.reason.url}:`,
                result.reason
              );
            }
          });
        });
      })
      .catch((error) => {
        console.error("Failed to open cache:", error);
      })
  );
});
