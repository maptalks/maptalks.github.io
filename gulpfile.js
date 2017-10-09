var gulp = require('gulp')
var less = require('gulp-less')
var connect = require('gulp-connect')
var autoprefixer = require('gulp-autoprefixer')
var cleanCSS = require('gulp-clean-css')
var ghPages = require('gulp-gh-pages')

var paths = {
    styleSrc: './src/style/**/*.less',
    styleEntries: ['./src/style/main.less', './src/style/views/demo-entry.less'],
    styleDist: './dist/style',
    scriptSrc: './src/script/**/*',
    scriptDist: './dist/script',
    imageSrc: './src/resource/image/**/*',
    imageDist: './dist/resource/image',
    templateSrc: './src/*',
    templateDist: './dist',
    staticPageSrc: ['./src/gallery/**/*', './src/plugins/**/*', './src/api/**/*'],
    staticPageDist: ['./dist/gallery', './dist/plugins', './dist/api']
}

gulp.task('buildStyle', function () {
    return gulp.src(paths.styleEntries)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styleDist))
})

gulp.task('buildScript', function () {
    return gulp.src(paths.scriptSrc)
        .pipe(gulp.dest(paths.scriptDist))
})

gulp.task('copyPages', function () {
    var tasks = paths.staticPageSrc.map(function (pageSrc, idx) {
        return new Promise(function (resolve, reject) {
            var stream = gulp.src(pageSrc).pipe(gulp.dest(paths.staticPageDist[idx]))
            stream.on('end', function () {
                resolve()
            })
            stream.on('error', function (err) {
                reject(err)
            })
        })
    })
    return Promise.all(tasks)
})

gulp.task('buildImage', function () {
    return gulp.src(paths.imageSrc)
        .pipe(gulp.dest(paths.imageDist))
})

gulp.task('buildTemplate', function () {
    return gulp.src(paths.templateSrc)
        .pipe(gulp.dest(paths.templateDist))
})

gulp.task('watch', function () {
    gulp.watch(paths.scriptSrc, ['buildScript'])
    gulp.watch(paths.styleSrc, ['buildStyle'])
    gulp.watch(paths.templateSrc, ['buildTemplate'])
    gulp.watch(paths.imageSrc, ['buildImage'])
    paths.staticPageSrc.forEach(function (pageSrc) {
        gulp.watch(paths.pageSrc, ['copyPages'])
    })
})

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 2000
    })
})

gulp.task('build', ['buildImage', 'buildTemplate', 'buildStyle', 'buildScript', 'copyPages'])

gulp.task('deploy', ['build'], function () {
    return gulp.src('dist/**/*')
        .pipe(ghPages({
            branch: 'master',
            message: 'Deploy to GitHub Pages [ci skip]'
        }))
})

gulp.task('default', ['build', 'watch', 'connect'])
