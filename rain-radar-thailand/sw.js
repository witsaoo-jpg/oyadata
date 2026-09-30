const CACHE='oyadata-rain-radar-v116-pwa-icons';
const SHELL=['./','./index.html','./app.js','./pwa.js','./bridge.js','./manifest.webmanifest','./assets/styles.css','./assets/near-me.css','./assets/favicon.svg','./assets/icon-192.png','./assets/icon-512.png','./assets/radar-utils.js','./assets/radar-directory.js','./assets/near-me.js','./assets/forecast-core.js','./assets/forecast.js','./assets/weather-intel-core.js','./assets/weather-intel.js','./assets/places-core.js','./assets/places.js','./assets/advisory-core.js','./assets/advisory.js','./assets/selected-map.js','./assets/animation.js','./assets/easy-refresh.js','./assets/public-overview.js','./assets/home.js','./assets/place-name-core.js','./assets/place-name.js','./assets/rain-outlook-core.js','./assets/rain-outlook.js','./assets/verification-core.js','./assets/verification.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));
    return;
  }
  if(SHELL.some(p=>new URL(p,self.registration.scope).pathname===url.pathname)){
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
  }
});