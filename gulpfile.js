const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Компиляция SASS в CSS
function buildStyles() {
   return src('www/app/sass/**/*.sass')
       .pipe(sass().on('error', sass.logError))
       .pipe(dest('www/app/css/')) // Указываем папку, а не файл
       .pipe(browserSync.stream()); // Обновляем стили без перезагрузки страницы
}

// Запуск сервера BrowserSync
function browserSyncServe(done) {
   browserSync.init({
      server: {
         baseDir: 'www/app' // Корневая папка проекта
      },
      notify: false, // Отключить уведомления
      open: true     // Автоматически открывать браузер
   });
   done(); // Обязательный callback для завершения задачи
}

// Наблюдение за изменениями в SASS
function watchFiles() {
   watch('www/app/sass/**/*.sass', buildStyles);
   // Дополнительно можно отслеживать HTML/JS:
   // watch('www/app/**/*.html').on('change', browserSync.reload);
}

// Основная задача: запустить сервер и отслеживание
const dev = series(browserSyncServe, watchFiles);

// Экспорт задач
exports.buildStyles = buildStyles;
exports.watchFiles = watchFiles;
exports.browserSyncServe = browserSyncServe;
exports.default = dev; // Запуск по команде `gulp`