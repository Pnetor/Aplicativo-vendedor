/* Painel do Vendedor — Cançao
   Guarda o painel no aparelho para abrir sem internet.
   Ao publicar uma versão nova no GitHub, troque o número do CACHE abaixo. */
var CACHE = "painel-cancao-v3.6";
var ARQUIVOS = ["./", "./index.html", "./manifest.webmanifest",
                "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(ARQUIVOS).catch(function () { return c.add("./index.html"); });
    })
    /* não assume o controle sozinho: espera o vendedor tocar em "Atualizar",
       para a tela não recarregar no meio de um pedido */
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   /* fontes e CDNs seguem direto */

  /* a página em si: rede primeiro (pega atualização), cache se estiver sem sinal */
  if (req.mode === "navigate" || url.pathname.endsWith("/") ||
      url.pathname.endsWith("index.html")) {
    e.respondWith(
      fetch(req).then(function (r) {
        var copia = r.clone();
        caches.open(CACHE).then(function (c) { c.put("./index.html", copia); });
        return r;
      }).catch(function () {
        return caches.match("./index.html").then(function (r) {
          return r || caches.match("./");
        });
      })
    );
    return;
  }
  /* ícones e manifesto: cache primeiro */
  e.respondWith(
    caches.match(req).then(function (r) {
      return r || fetch(req).then(function (resp) {
        var copia = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copia); });
        return resp;
      });
    })
  );
});

self.addEventListener("message", function (e) {
  if (e.data === "atualizar") self.skipWaiting();
});
