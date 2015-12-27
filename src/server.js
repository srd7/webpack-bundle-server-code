/* eslint no-console: 0 */
import express from "express";
import jade from "jade";

import { script } from "src/config";

const server = express();

// static path for "dist" directory
server.use(express.static("dist"));

// All requests expect to static are for "index.jade"
const html = jade.compileFile("src/index.jade")({
  script: "/" + script
});

server.use((req, res) => {
  res.type("html");
  res.write(html);
  res.end();
});

const port = process.env.PORT;
const mode = process.env.NODE_ENV;

server.listen(port);
console.log("Listening on port &s as %s mode...", port, mode);
