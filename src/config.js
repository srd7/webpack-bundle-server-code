const isProd = process.env.NODE_ENV === "production";

// bundled JavaScript filename
const script = isProd? "app.min.js" : "app.js";

export { script };
