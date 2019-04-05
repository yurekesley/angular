let gulp = require("gulp");
let rename = require("gulp-rename");
let uglify = require("gulp-uglify");
let concat = require('gulp-concat');
let zip = require('gulp-zip');
let clean = require("gulp-clean");
let htmlreplace = require('gulp-html-replace');

let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");

let browserSync = require("browser-sync");
reload = browserSync.reload;

gulp.task("compile", function() {
  let tsResult = gulp.src(["./app/src/**/*.ts"]).pipe(
    ts().pipe(tsProject()), undefined, ts.reporter.fullReporter());
  return tsResult.js.pipe(gulp.dest("./WebContent/public/app/"));
});

gulp.task('compress', ['compile'],  function() {
  return gulp.src('./WebContent/public/app/**/**.js')
    .pipe(concat('project.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/app/'));
});

gulp.task('replace', ['compress'], function() {
  gulp.src('./WebContent/public/**/*.html')
    .pipe(htmlreplace({
        'js': 'app/project.min.js'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task("clean", function() {
  return gulp
    .src(['./dist', './build'])
    .pipe(clean());
});



gulp.task('dist', ['clean'], () =>
    gulp.src(['./WebContent/public/**/*'], ['!./WebContent/public/index.html'])
     .pipe(gulp.dest('./dist'))
);

gulp.task('build', ['dist', 'replace'], () =>
    gulp.src(['./dist/**/*'])
        .pipe(zip('angularjs.war'))
        .pipe(gulp.dest('./build'))
);

gulp.task("html", function() {
  gulp.src(["./app/src/**/*.template.html"])
  .pipe(rename(function (path) {
    path.basename = path.basename.replace('.template', '');
    }))
  .pipe(gulp.dest("./WebContent/public/app"));
});

gulp.task("watch", ['compile','html','server'], function() {
  gulp.watch("./app/src/**/*.ts", ['compile'])
     .on('change', browserSync.reload);

  gulp.watch("./app/src/**/*.html", ['html'])
  .on('change', browserSync.reload);

  gulp.watch("./WebContent/public/**/*.css", ['css'])
   .on('change', browserSync.reload);;
});

gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "./WebContent/public/",
      serveStaticOptions: {
        extensions: ["html", "js", "css"]
    }
  },
    open: false
  });
});

