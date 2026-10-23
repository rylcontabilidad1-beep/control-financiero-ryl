// Solo gestiona el lanzador de GitHub. No guarda credenciales ni páginas de Apps Script.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil(caches.delete('ryl-financiero-v3').then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url),scope=new URL(self.registration.scope);
  if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  if(event.request.mode!=='navigate')return;
  event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>new Response('<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>RYL</title><h1>Sin conexión</h1><p>Conéctate a internet y vuelve a abrir la aplicación.</p></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}})));
});
