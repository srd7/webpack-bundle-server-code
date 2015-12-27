const config = function (mode) {
  const isProd = mode === "production";

  // bundled JavaScript filename
  const script = isProd? "app.min.js" : "app.js";
  return { script };
};

// If we write `export default ...`,
// `var config = require("config").default` is required.
module.exports = config;
