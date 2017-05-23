/// <binding Clean='clean' />
"use strict";

var gulp = require('gulp');
var config = require('./gulp.config')();
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task("clean:js", function (cb) {
    //return $.rimraf('wwwroot/js/*.min.js', cb);
    return gulp.src('wwwroot/js/*.min.js', { read: false }).pipe(clean());
});

gulp.task("clean:css", function (cb) {
    //return $.rimraf('wwwroot/css/*.min.css', cb);
    return gulp.src('wwwroot/css/*.min.css', { read: false }).pipe(clean());
});

gulp.task('minify:css', function () {
    return gulp.src(config.css)
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.cssDest));
});

gulp.task("clean", ["clean:js", "clean:css"]);
gulp.task('minify', ['minify:css']);

gulp.task("copy:angular", function () {

    return gulp.src(config.angular,
        { base: config.node_modules + "@angular/" })
        .pipe(gulp.dest(config.lib + "@angular/"));
});

gulp.task("copy:angularWebApi", function () {
    return gulp.src(config.angularWebApi,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:corejs", function () {
    return gulp.src(config.corejs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:zonejs", function () {
    return gulp.src(config.zonejs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:reflectjs", function () {
    return gulp.src(config.reflectjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:systemjs", function () {
    return gulp.src(config.systemjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:rxjs", function () {
    return gulp.src(config.rxjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:app", function () {
    return gulp.src(config.app)
        .pipe(gulp.dest(config.appDest));
});

gulp.task("copy:jasmine", function () {
    return gulp.src(config.jasminejs,
        { base: config.node_modules + "jasmine-core/lib" })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:jquery", function () {
   return gulp.src(config.jquery,
         { base: config.node_modules })
       .pipe(gulp.dest(config.lib));
});

gulp.task("copy:bootstrap", function () {
   return gulp.src(config.bootstrap,
         { base: config.node_modules })
      .pipe(gulp.dest(config.lib));
});

gulp.task("copy:bootstrapCSS", function () {
   return gulp.src(config.bootstrapCSS,
         { base: config.node_modules })
      .pipe(gulp.dest(config.cssDest));
});

gulp.task("copy:favicon", function () {
    return gulp.src(config.favicon).pipe(gulp.dest("./wwwroot/"));
});

gulp.task("copy:index", function () {
   //return gulp.src(config.index,
         //{ base: config.webroot })
      //.pipe(gulp.dest(config.cssDest));
   return gulp.src(config.index).pipe(gulp.dest("./wwwroot/"));
});

gulp.task("dependencies", [
    "copy:angular",
    "copy:angularWebApi",
    "copy:corejs",
    "copy:zonejs",
    "copy:reflectjs",
    "copy:systemjs",
    "copy:rxjs",
    "copy:jquery",
    "copy:bootstrap",
    "copy:bootstrapCSS",
    "copy:index",
    "copy:favicon",
    "copy:jasmine",    
    "copy:app"
]);

gulp.task("watch", function () {
    return $.watch(config.app)
        .pipe(gulp.dest(config.appDest));
});

gulp.task("default", ["clean", 'minify', "dependencies"]);