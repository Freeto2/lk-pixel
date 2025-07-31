var gulp       = require('gulp'); // Подключаем Gulp
    let sass         = require('gulp-sass')(require('sass')), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Syncnpm 
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    njkRender = require('gulp-nunjucks-render'),
    prettify = require('gulp-html-prettify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

    
gulp.task('sass', function() {
    return gulp.src('app/assets/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
    
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
    
gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/assets/libs/jquery/dist/jquery.min.js', // Берем jQuery
        ])
        // .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        // .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/assets/js')); // Выгружаем в папку app/js
});
    
gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('layout', function() {
    return gulp.src('app/njk/layout/*')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function() {
    return gulp.src('app/assets/css/**/*.css')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
    return gulp.src('app/assets/js/*')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('prebuild', async function() {
    
    var buildCss = gulp.src('app/assets/css/**/*')
    .pipe(gulp.dest('dist/assets/css'))
    
    var buildFonts = gulp.src('app/assets/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/assets/fonts'))
    
    var buildJs = gulp.src('app/assets/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/assets/js'))
    
    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

    var buildImg = gulp.src('app/assets/img/**/*') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist/assets/img'));
    
});
    
gulp.task('clear', function (callback) {
    // return cache.clearAll();
})

gulp.task('nunjucks', function() {
    return gulp.src('app/njk/*.njk')
        .pipe(njkRender())
        .pipe(prettify({
            indent_size : 4 // размер отступа
        })
        .pipe(gulp.dest('app/')));
});

    
gulp.task('watch', function() {
    gulp.watch('app/assets/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/assets/css/**/*.css', gulp.parallel('css')); // Наблюдение за css файлами
    gulp.watch('app/njk/**/*.njk', gulp.parallel('layout')); // Наблюдение за njk файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/njk/**/*', gulp.parallel('nunjucks')); // Компиляция шаблонов njk
    gulp.watch([''], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
    gulp.watch('app/assets/js/**/*.js', gulp.parallel('js'));
});
gulp.task('default', gulp.parallel('sass', 'js', 'scripts', 'browser-sync', 'nunjucks', 'watch'));

gulp.task('build', gulp.parallel('prebuild', 'sass', 'scripts'));