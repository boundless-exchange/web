// THIS FILE IS NOT COMPILED BY BABEL.
const CACHE_NAME = 'v1';

self.addEventListener('fetch', event => {
  const request = event.request;

  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          if (isHtmlRequest(request)) {
            updateHtmlCache();
          }
          return response;
        }

        if (isHtmlRequest(request)) {
          return caches.match('/')
            .then(htmlResponse => {
              if (htmlResponse) {
                updateHtmlCache();
                return htmlResponse;
              } else {
                return fetchAndCache('/', {cache: 'force-cache'});
              }
            });
        } else {
          return fetchAndCache(request);
        }
      })
  );
});

function fetchAndCache(request, init) {
  return fetch(request, init)
    .then(response => {
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, response);
      });
      return response.clone();
    });
}

function isHtmlRequest(request) {
  return new URL(request.url).pathname.indexOf('.') === -1;
}

function updateHtmlCache() {
  // Fetch regardless to make sure the next fetch is fresh.
  fetchAndCache('/', {cache: 'no-cache'});
}
