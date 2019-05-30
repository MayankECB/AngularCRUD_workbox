module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{txt,ico,html,js,css}"],
  swDest: "dist\\sw.js",
  // Define runtime caching rules
  runtimeCaching: [
    {
      urlPattern: new RegExp("http://localhost:5555/products"),
      handler: "staleWhileRevalidate"
    }
  ]
};
