import gulp from "gulp";

import rimraf from "rimraf";
import minimist from "minimist";

import nodemon from "gulp-nodemon";
import webpack from "webpack-stream";

gulp.task("clean", (callback) => {
  rimraf("./dist/*", callback);
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
      NODE_ENV: "develop",
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

gulp.task("default");
gulp.task("dev", ["clean"], () => {
  ["server:dev", "webpack:dev"].forEach((task) => gulp.start(task));
});
