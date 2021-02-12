const { src, dest, parallel, watch, series } = require('gulp'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  browsersync = require('browser-sync').create(),
  distDel = require('del'),
  imagemin = require('gulp-imagemin')

function delDist() {
  return distDel('dist')
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function minCss() {
  return src('app/scss/*.scss', '!app/scss/null_style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version']
    }))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browsersync.stream())
}

function minImages() {
  return src('app/img/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIds: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/img'))
}

function script() {
  return src('app/js/*.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js'))
    .pipe(browsersync.stream())
}

function watching() {
  watch(['app/scss/*.scss'], minCss)
  watch(['app/js/main.js'], script)
  watch(['app/*.html']).on('change', browsersync.reload)
}

function build() {
  return src([
    'app/css/*.css',
    'app/fonts/**',
    'app/js/main.min.js', 'app/js/slick.min.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

exports.delDist = delDist
exports.browserSync = browserSync
exports.minCss = minCss
exports.minImages = minImages
exports.script = script
exports.watching = watching
exports.build = series(delDist, minImages, build)
exports.default = parallel(browserSync, minCss, script, watching)