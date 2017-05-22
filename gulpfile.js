var gulp = require('gulp')
var less = require('gulp-less')
var connect = require('gulp-connect')
var autoprefixer = require('gulp-autoprefixer')
var paths = {
    styleSrc: './src/style/**/*.less',
    styleEntries: ['./src/style/main.less'],
    styleDist: './dist/style',
    scriptSrc: './src/script/**/*.js',
    scriptDist: './dist/script',
    imageSrc: './src/resource/image/**/*',
    imageDist: './dist/resource/image',
    templateSrc: './src/*.html',
    templateDist: './dist'
}

gulp.task('buildStyle', function () {
    gulp.src(paths.styleEntries)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.styleDist))
})

gulp.task('buildScript', function () {
    gulp.src(paths.scriptSrc)
        .pipe(gulp.dest(paths.scriptDist))
})

gulp.task('buildImage', function () {
    gulp.src(paths.imageSrc)
        .pipe(gulp.dest(paths.imageDist))
})

gulp.task('buildTemplate', function () {
    gulp.src(paths.templateSrc)
        .pipe(gulp.dest(paths.templateDist))
})


gulp.task('watch', function () {
    gulp.watch(paths.scriptSrc, ['buildScript'])
    gulp.watch(paths.styleSrc, ['buildStyle'])
    gulp.watch(paths.templateSrc, ['buildTemplate'])
    gulp.watch(paths.imageSrc, ['buildImage'])
})

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 7071
    })
})

gulp.task('build', ['buildImage', 'buildTemplate', 'buildStyle', 'buildScript'])

gulp.task('default', ['build', 'watch', 'connect'])