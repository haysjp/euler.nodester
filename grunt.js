/*global module:false*/
module.exports = function(grunt) {
  
  // NPM task registration
  grunt.loadNpmTasks('grunt-css');

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'app.js', 'routes/index.js']
    },
    cssmin: {
      dist: {
        src: ['styles/base.css', 'styles/skeleton.css', 'styles/layout.css', 'styles/style.css'],
        dest: 'public/css/style.min.css'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        laxcomma: true,
        expr: true
      },
      globals: {
        exports: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint', 'cssmin');

};
