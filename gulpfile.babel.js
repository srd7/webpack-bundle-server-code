import gulp from "gulp";

import rimraf from "rimraf";
import minimist from "minimist";

import nodemon from "gulp-nodemon";
import webpack from "webpack-stream";

gulp.task("clean:dev", (callback) => {
  rimraf("./dist/*", callback);
});
gulp.task("clean:prod", (callback) => {
  rimraf("./prod/*", callback);
});

// develop server
gulp.task("server:dev", () => {
  const argv = minimist(process.argv.slice(2), {
    alias: { p: "port" },
    default: { port: 3000 }
  });
  nodemon({
    script: "./src/start.js",
    ext: "js",
    ignore: ["dist/**"],
    env: {
      NODE_ENV: "development",
      NODE_PATH: ".",
      PORT: argv.port
    }
  });
});

// develop webpack build
gulp.task("webpack:dev", () => {
  return gulp.src("./src/client.js")
    .pipe(webpack(require("./webpack.dev")))
    .pipe(gulp.dest("dist"));
});

// production webpack build
gulp.task("webpack:prod", () => {
  const { client, server } = require("./webpack.prod");
  gulp.src("./src/client.js")
    .pipe(webpack(client))
    .pipe(gulp.dest("prod"));
  gulp.src("./src/server.js")
    .pipe(webpack(server))
    .pipe(gulp.dest("prod"));
});

gulp.task("default");
gulp.task("dev", ["clean:dev"], () => {
  ["server:dev", "webpack:dev"].forEach((task) => gulp.start(task));
});
gulp.task("build", ["clean:prod"], () => {
  ["webpack:prod"].forEach((task) => gulp.start(task));
});
