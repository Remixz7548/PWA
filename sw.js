const CACHE_NAME = 'Gaddys-v1';
self.addEventListener('install', event =>{
    event.waitUntil((async() =>{
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/img',
            '/firebase.js',
            '/index.js',
            '/voz.js',
            '/style.css',
        ]);
    })());
});

self.addEventListener('fetch', event =>{
    event.respondWith((async ()=>{
        const cache = await caches.open(CACHE_NAME);
        //obtiene los recursos desde el cache
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
            //si los rescursos no estan en el cache ,lo intenta en la red
            const fetchResponse = await fetch(event.request);
            //Guarda los recursos en la cache y lo regresa
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
            } catch (e){
            //la red fallo
            }
        }
    })());
});