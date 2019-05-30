/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: "3rdpartylicenses.txt",
    revision: "927031ce0f6f40361b87c52824f923b3"
  },
  {
    url: "favicon.ico",
    revision: "b9aa7c338693424aae99599bec875b5f"
  },
  {
    url: "index.html",
    revision: "bf00d382981b242ef1975f000d142ab1"
  },
  {
    url: "main.7c52a9f47db58b3937ad.js",
    revision: "e0bdf5d10a499c2dffd5322fd8f7dc9f"
  },
  {
    url: "polyfills.b5f9ecca1a25f91304b8.js",
    revision: "65eede0cbd94e3b40f1a795aa28166cc"
  },
  {
    url: "runtime.a66f828dca56eeb90e02.js",
    revision: "f2c1a0d5e113c332e6bbe7887eb378b2"
  },
  {
    url: "styles.4134736bab5fc6298622.css",
    revision: "5217f9c2d3402a6dc46c2cc554a86d45"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /http:\/\/localhost:5555\/products/,
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [
      new workbox.broadcastUpdate.Plugin({
        channelName: "api-updates"
      })
    ]
  }),
  "GET"
);

const queue = new workbox.backgroundSync.Queue("productOperationQueue");

self.addEventListener("fetch", event => {
  // Clone the request to ensure it's save to read when
  // adding to the Queue.
  const promiseChain = fetch(event.request.clone()).catch(err => {
    console.log("++++++ ", event.request);
    return queue.pushRequest({ request: event.request });
  });

  event.waitUntil(promiseChain);
});

workbox.routing.registerRoute(
  /http:\/\/localhost:5555\/products/,
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.Plugin("addProductQueue", {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
      })
    ]
  }),
  "POST"
);

self.addEventListener("sync", async ev => {
  try {
    await addProductQueue.replayRequests();
  } catch (e) {
    console.error(e);
  }
});
