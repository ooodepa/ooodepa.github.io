const
    PROXY = '127.0.0.1:4000/',
    DEST = {
        SASS: "./uploads/"
    },
    SRC = {
        HTML: [
            './**/*.html',
            '!./**/_site/**/*.html',
            '!./**/node_modules/**/*.html' 
        ],
        MD: [
            './**/*.md',
            '!./**/_site/**/*.md',
            '!./**/node_modules/**/*.md'
        ],
        SASS: [
            './_includes/consts/**/*.sass',
            './**/*.sass',
            '!./**/node_modules/**/*.sass'
        ]
    };

const
    browserSync  = require("browser-sync"),
    gulp         = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    clean_css    = require("gulp-clean-css"),
    concat       = require("gulp-concat"),
    notify       = require("gulp-notify"),
    sass         = require("gulp-sass");
    
gulp.task('sass', function () {
    return gulp.src(SRC['SASS'])
        .pipe(concat('style.sass'))
        .pipe(sass({ outputStyle: 'expanded' })
        .on("error", notify.onError()))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 300 versions']
        }))
        .pipe(clean_css())
        .pipe(gulp.dest(DEST['SASS']))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {
    browserSync({
        proxy: PROXY,
        open: false,
        notify: true,
        tunnel: false
    });
});

gulp.task('watch', function () {
    gulp.watch(SRC['HTML']).on('change', browserSync.reload);
    gulp.watch(SRC['MD']).on('change', browserSync.reload);
    gulp.watch(SRC['SASS']).on('change', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('watch', 'sass', 'serve'));
