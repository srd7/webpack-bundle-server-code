/* eslint no-console: 0 */
import express from "express";
import jade from "jade";

import config from "src/config";

const server = express();

const mode = process.env.NODE_ENV;

// static path
if (mode === "development") {
  // In develop mode, bundled code output directory is "dist"
  server.use(express.static("dist"));
} else if (mode === "production") {
  // In production mode, bundled code is put at "prod" directory
  server.use(express.static("prod"));
}

// All requests expect to static are for "index.jade"
const html = jade.compileFile("src/index.jade")({
  script: "/" + config(mode).script
});

server.use((req, res) => {
  res.type("html");
  res.write(html);
  res.end();
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log("Listening on port %s as %s mode...", port, mode);
