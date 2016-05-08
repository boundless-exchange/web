/* eslint-disable no-console */
// THIS FILE IS NOT COMPILED BY BABEL.
const CACHE_NAME = 'v1';

self.addEventListener('install', _event => {
  console.info('[SW] installed');
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const pathname = new URL(request.url).pathname;
  console.debug('[SW] fetch:', pathname);

  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          console.debug('[SW] cached:', pathname);
          if (isHtmlRequest(request)) {
            updateHtmlCache();
          }
          return response;
        }

        if (isHtmlRequest(request)) {
          console.debug('[SW] not cached (HTML):', pathname);
          return caches.match('/')
            .then(htmlResponse => {
              if (htmlResponse) {
                updateHtmlCache();
                return htmlResponse;
              } else {
                console.debug('[SW] not cached (HTML root):', pathname);
                return fetchAndCache('/', {cache: 'force-cache'});
              }
            });
        } else {
          console.debug('[SW] not cached:', pathname);
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
  console.debug('[SW] updateHtmlCache');
  // Fetch regardless to make sure the next fetch is fresh.
  fetchAndCache('/', {cache: 'no-cache'});
}
