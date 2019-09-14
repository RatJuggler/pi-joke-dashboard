"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const terser = require("gulp-terser");
const replace = require("gulp-replace")

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Based on:\n',
  ' * Start Bootstrap - SB Admin 2 v4.0.6 (https://startbootstrap.com/template-overviews/sb-admin-2)\n',
  ' * Copyright 2013-2019 Start Bootstrap\n',
  ' * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin-2/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./src/"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function cleanVendor() {
  return del(["./src/vendor/"]);
}

function cleanDist() {
  return del(["./dist/"]);
}

function cleanModules() {
  return del(["./node_modules/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function copyModules() {
  // Bootstrap JS
  let bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
    .pipe(gulp.dest('./src/vendor/bootstrap/js'));
  // Bootstrap SCSS
  let bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
    .pipe(gulp.dest('./src/vendor/bootstrap/scss'));
  // ChartJS - Copy to "chartjs" to avoid '.' in folder name.
  let chartJS = gulp.src('./node_modules/chart.js/dist/*.js')
    .pipe(gulp.dest('./src/vendor/chartjs'));
  // ChartJS streaming
  let chartJSstreaming = gulp.src('./node_modules/chartjs-plugin-streaming/dist/*.js')
    .pipe(gulp.dest('./src/vendor/chartjs-plugin-streaming'));
  // dataTables
  let dataTables = gulp.src([
      './node_modules/datatables.net/js/*.js',
      './node_modules/datatables.net-bs4/js/*.js',
      './node_modules/datatables.net-bs4/css/*.css'
    ])
    .pipe(gulp.dest('./src/vendor/datatables'));
  // Font Awesome
  let fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/*.css')
    .pipe(gulp.dest('./src/vendor/fontawesome-free/css'));
  let fontAwesome = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*.*')
    .pipe(gulp.dest('./src/vendor/fontawesome-free/webfonts'));
  // jQuery Easing
  let jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./src/vendor/jquery-easing'));
  // jQuery
  let jquery = gulp.src(['./node_modules/jquery/dist/*', '!./node_modules/jquery/dist/core.js'])
    .pipe(gulp.dest('./src/vendor/jquery'));
  // moment
  let moment = gulp.src(['./node_modules/moment/moment.js', './node_modules/moment/min/*.js'])
    .pipe(gulp.dest('./src/vendor/moment'));
  return merge(bootstrapJS, bootstrapSCSS, chartJS, chartJSstreaming, dataTables, fontAwesome, fontAwesomeCSS, jquery, jqueryEasing, moment);
}

function copyDist() {
  let mySrc = gulp.src(['./src/*.*', '!./src/*.html'])
    .pipe(gulp.dest('./dist'));
  let myImg = gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./dist/img'));
  let myHTML = gulp.src('./src/*.html')
    .pipe(replace('.css', '.min.css'))
    .pipe(replace('.js', '.min.js'))
    .pipe(gulp.dest('./dist'));
  let bootstrapJS = gulp.src('./src/vendor/bootstrap/js/*.min.js')
    .pipe(gulp.dest('./dist/vendor/bootstrap/js'));
  // ChartJS
  let chartJS = gulp.src('./src/vendor/chartjs/*.min.js')
    .pipe(gulp.dest('./dist/vendor/chartjs'));
  // ChartJS streaming
  let chartJSstreaming = gulp.src('./src/vendor/chartjs-plugin-streaming/*.min.js')
    .pipe(gulp.dest('./dist/vendor/chartjs-plugin-streaming'));
  // dataTables
  let dataTables = gulp.src('./src/vendor/datatables/*.min.*')
    .pipe(gulp.dest('./dist/vendor/datatables'));
  // Font Awesome
  let fontAwesomeCSS = gulp.src('./src/vendor/fontawesome-free/css/*.min.css')
    .pipe(gulp.dest('./dist/vendor/fontawesome-free/css'));
  let fontAwesome = gulp.src('./src/vendor/fontawesome-free/webfonts/*.*')
    .pipe(gulp.dest('./dist/vendor/fontawesome-free/webfonts'));
  // jQuery Easing
  let jqueryEasing = gulp.src('./src/vendor/jquery-easing/*.min.js')
    .pipe(gulp.dest('./dist/vendor/jquery-easing'));
  // jQuery
  let jquery = gulp.src('./src/vendor/jquery/*.min.*')
    .pipe(gulp.dest('./dist/vendor/jquery'));
  // moment
  let moment = gulp.src('./src/vendor/moment/*.min.js')
    .pipe(gulp.dest('./dist/vendor/moment'));
  return merge(mySrc, myImg, myHTML, bootstrapJS, chartJS, chartJSstreaming, dataTables, fontAwesome, fontAwesomeCSS, jquery, jqueryEasing, moment)
}

// Build CSS task
function css() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("./src/css"))
}

// Minify CSS task
function mincss() {
  return gulp
    .src("./src/css/*.css")
    .pipe(plumber())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browsersync.stream());
}

// Minify JS task
function minjs() {
  return gulp
    .src('./src/js/*.js')
    .pipe(terser())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./src/scss/**/*", css);
  gulp.watch(["./src/js/**/*", "./src/**/*.html"], browserSyncReload);
}

// Define complex tasks
const cleanAll = gulp.parallel(cleanDist, cleanModules, cleanVendor);
const vendor = gulp.series(cleanVendor, copyModules);
const build = gulp.series(css, vendor, cleanDist, copyDist, gulp.parallel(mincss, minjs));
const watch = gulp.series(css, vendor, gulp.parallel(browserSync, watchFiles));

// Document tasks
css.description = "Compile SASS into CSS.";
mincss.description = "Minify CSS files.";
minjs.description = "Minify JS files.";
cleanDist.description = "Clear don the dist folder.";
cleanAll.description = "Clear down the dist, vendor and node_modules folders.";
vendor.description = "Refresh the vendor dependencies from node_modules.";
build.description = "Build a distribution ready version of the site.";
watch.description = "Watch for code changes and rebuild CSS / refresh browser as required.";

// Export tasks
exports.css = css;
exports.mincss = mincss;
exports.minjs = minjs;
exports.cleandist = cleanDist;
exports.cleanall = cleanAll;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
