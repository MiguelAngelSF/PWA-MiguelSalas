self.addEventListener('install', e =>{
    const cacheProm = caches.open('cache-v1')
        .then(cache => {
            return cache.addAll([
                'index.html',
                'css/styles.css',
                'js/main.js',
                'img/logo.jpg',
                'img/software.jpg',
                'img/youtube.jpg',
            ])
            
        });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});