module.exports = (grunt) ->
  grunt.initConfig
    watch:
      coffee:
        tasks: 'coffee'
        files: ['coffee/**/*.coffee']
      sass:
        tasks: 'sass'
        files: ['scss/**/*.scss']

    coffee:
      compile:
        options:
          bare: true
        files: [
          expand: true
          cwd: 'coffee/'
          src: ['**/*.coffee']
          dest: 'js/'
          rename: (dest, src) -> dest + src.replace('.coffee', '.js')
        ]

    sass:
      dist:
        files: [
          expand: true
          cwd: 'scss/'
          src: ['**/*.scss']
          dest: 'css/'
          rename: (dest, src) -> dest + src.replace('.scss', '.css')
        ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
