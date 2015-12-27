import $ from "jquery";

setTimeout(() => {
  const mode = process.env.NODE_ENV.toUpperCase();
  const mes = `Hello from "${ mode }" mode client.js!!`;
  $("#app").text(mes);
}, 1000);
