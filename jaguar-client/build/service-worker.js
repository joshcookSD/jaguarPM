"use strict";var precacheConfig=[["/index.html","ce3a748efd577fc3f2e274cebaa980cd"],["/static/js/0.c2eb1ea3.chunk.js","93bd985e72b9cf55a63d8be462385531"],["/static/js/1.2bc5000b.chunk.js","472b63c91c552a485cdd583f241ba241"],["/static/js/10.c310585b.chunk.js","a2069c233c742f5a5c81c1441273b750"],["/static/js/11.ac64fd58.chunk.js","5561638fbaac7f9ec103c81dcd1af1d1"],["/static/js/2.c41c868e.chunk.js","7d9938c970d8a3be4a8d7789a8c6b9c0"],["/static/js/3.3b21e91b.chunk.js","b8f36db995066dec71b067a4db1b2561"],["/static/js/4.3cefc164.chunk.js","b151bdadf45d52d1a77be2dc2cb6f94a"],["/static/js/5.60e97bc4.chunk.js","6b8a5fa327130a27f4cc57adad5cc2eb"],["/static/js/6.792ddf0e.chunk.js","7df7c55b0d2a47c6b90f01ab98cbdf42"],["/static/js/7.a2935fc1.chunk.js","6d391581bf4ade2e094f5b6eb433141c"],["/static/js/8.18c5b094.chunk.js","db901344b3397a6e99cb5127996df3bb"],["/static/js/9.63f97005.chunk.js","e0792fc49e2dad1763764c77fb009910"],["/static/js/main.399d8ae2.js","39291b6d8eb42d3103ecc6bf20d37c3a"],["/static/media/jaguarLeaping.4742f17b.jpeg","4742f17b52a186ca2e068ccf94b8bb83"],["/static/media/jaguarwhite.7b48d4dc.png","7b48d4dc307c32fb0467a4142c9ac1c7"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),c=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});