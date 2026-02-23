const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

// Пути к файлам
const paths = {
   sass: 'www/app/sass/**/*.sass',
   css: 'www/app/css/**/*.css',
   js: 'www/app/js/**/*.js',
   html: 'www/app/**/*.html',
   destCss: 'www/app/css/',
   destLibs: 'www/app/libs/'
};

// Компиляция SASS в CSS
function buildStyles() {
   return src(paths.sass)
       .pipe(sass().on('error', sass.logError))
       .pipe(postcss([
          autoprefixer({
             overrideBrowserslist: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
             cascade: true
          })
       ]))
       .pipe(dest(paths.destCss))
       .pipe(browserSync.stream());
}

// Минификация CSS
function cssMin() {
   return src(paths.css)
       .pipe(cssnano())
       .pipe(rename({ suffix: '.min' }))
       .pipe(dest(paths.destLibs))
       .pipe(browserSync.stream()); // Обновляем минифицированный CSS
}

// Запуск сервера BrowserSync
function browserSyncServe(done) {
   browserSync.init({
      server: { baseDir: 'www/app' },
      notify: false,
      open: true
   });
   done();
}

// Наблюдение за изменениями
function watchFiles() {
   watch(paths.sass, series(buildStyles)); //cssMin)); // Перекомпилируем и минифицируем
   watch(paths.js, series(scripts, browserSync.reload));
   watch(paths.html).on('change', browserSync.reload);
}

// Объединение и минификация JS
function scripts() {
   return src(paths.js)
       .pipe(concat('libs.mini.js'))
       .pipe(uglify())
       .pipe(dest(paths.destLibs));
}

// Основная задача
const dev = series(buildStyles, browserSyncServe, watchFiles);

// Экспорт задач
exports.buildStyles = buildStyles;
exports.cssMin = cssMin;
exports.browserSyncServe = browserSyncServe;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.default = dev;