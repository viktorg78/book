// Импорт модулей Gulp
import { series, src, dest, watch, parallel } from 'gulp';

// Импорт плагинов
import gulpSass from 'gulp-sass';
import dartSass from 'sass'; // Компилятор SASS
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin'; // Добавляем плагин для минификации HTML

// Динамический импорт для del (ESM‑только)
const { deleteAsync } = await import('del');

const sass = gulpSass(dartSass);

// Пути к файлам
const paths = {
   sass: 'www/app/sass/**/*.sass',
   css: 'www/app/css/**/*.css',
   getMinCss: '!www/app/css/**/*.min.css',
   img: 'www/app/img/**/*',
   js: 'www/app/js/**/*.js',
   html: 'www/app/**/*.html',
   htmlSrc: 'www/app/html-parts/**/*.html', // Папка с фрагментами HTML
   destCss: 'www/app/css/',
   destLibs: 'www/app/libs/',
   destHtml: 'www/app/' // Куда складывать собранные HTML
};

// Создание экземпляра BrowserSync
const server = browserSync.create();

// Минификация HTML
function minifyHtml() {
   return src([
      'www/app/**/*.html',
      '!www/app/html-parts/**/*.html' // Исключаем исходные фрагменты
   ])
       .pipe(htmlmin({
          collapseWhitespace: true,        // Удаляет пробелы и переносы строк
          removeComments: true,             // Удаляет комментарии
          minifyJS: true,               // Минифицирует встроенный JS
          minifyCSS: true,              // Минифицирует встроенный CSS
          removeAttributeQuotes: true,      // Удаляет кавычки у атрибутов
          removeEmptyAttributes: true,       // Удаляет пустые атрибуты
          collapseBooleanAttributes: true    // Сокращает булевы атрибуты (например, checked="checked" → checked)
       }))
       .pipe(dest('www/dist')) // Сохраняем в ту же папку
       .pipe(browserSync.stream()); // Обновляем в браузере
}


// Сборка HTML из фрагментов
function buildHtml() {
   return src('www/app/html-parts/pages/**/*.html') // Берём файлы из папки pages
       .pipe(fileInclude({
          prefix: '@@', // Префикс для директив включения
          basepath: '@file' // Базовый путь — текущая директория
       }))
       .pipe(dest(paths.destHtml)) // Сохраняем в корневую папку app
       .pipe(browserSync.stream()); // Обновляем в браузере
}


// Компиляция SASS в CSS
function buildStyles() {
   return src(paths.sass)
       .pipe(sass({ implementation: dartSass }).on('error', sass.logError))
       .pipe(
           postcss([
              autoprefixer({
                 overrideBrowserslist: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
                 cascade: true
              })
           ])
       )
       .pipe(dest(paths.destCss))
       .pipe(server.stream());
}

// Минификация CSS
function cssMin() {
   return src([paths.css, paths.getMinCss])
       .pipe(cssnano())
       .pipe(rename({ suffix: '.min' }))
       .pipe(dest(paths.destCss))
       .pipe(server.stream());
}

// Запуск сервера BrowserSync
function browserSyncServe(done) {
   server.init({
      server: { baseDir: 'www/app' },
      notify: false,
      open: true
   });
   done();
}

// Наблюдение за изменениями
function watchFiles() {
   watch(paths.sass, series(buildStyles, cssMin));
   watch(paths.js, series(scripts, server.reload));
   watch(paths.html).on('change', server.reload);
}

// Объединение и минификация JS
function scripts() {
   return src(paths.js)
       .pipe(concat('libs.mini.js'))
       .pipe(uglify())
       .pipe(dest(paths.destLibs));
}

// Очистка кэша Gulp
function clear() {
   return import('gulp-cache').then(({ cache }) => cache.clearAll());
}

// Оптимизация изображений
function img() {
   return src(paths.img, { encoding: false })
       .pipe(
           imagemin({
              interlaced: true,
              progressive: true,
              optimizationLevel: 5,
              svgoPlugins: [{ removeViewBox: true }],
              use: [pngquant()]
           })
       )
       .pipe(dest('www/dist/img'));
}

// Полная очистка сборки
function clean() {
   return deleteAsync(['www/dist/**/*']);
}

function Build(done){
   const buildCss = src(paths.css)
       .pipe(dest('www/dist/css'));

   // const buildFonts = src('app/fonts/**/*')
   //     .pipe(dest('dist/fonts'));
   //
   const buildJs = src('www/app/js/**/*')
       .pipe(dest('www/dist/js'));
   //
   // const buildHtml = src(paths.html, '!www/app/html-parts/**/*')
   //     .pipe(dest('www/dist'));
   done();
}


// Основная задача для разработки
const dev = series(buildHtml, buildStyles, cssMin ,browserSyncServe, watchFiles);

// Сборка проекта
const build = series(clean, img, buildStyles, minifyHtml, Build)

// Экспорт задач
export {
   buildStyles,
   cssMin,
   browserSyncServe,
   scripts,
   watchFiles,
   img,
   clean,
   clear,
   buildHtml,
   minifyHtml,
   build,
   dev as default
};