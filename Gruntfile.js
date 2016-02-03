module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['assets/scss/*.scss'],
        tasks: ['sass-task'],
      },
      js: {
        files: ['assets/js/main.js'],
        tasks: ['js-task'],
      },
    },
    concat: {
        options: {
          stripBanners: true,
          separator: ';'
        },
        dist: {
          src: [
                'assets/js/vendor/modernizr.custom.js',
                'assets/js/vendor/jquery.visible.min.js',
                'assets/js/vendor/jquery.fluidbox.min.js', 
                'assets/js/vendor/jquery.fitvids.min.js', 
                'assets/js/vendor/responsive-nav.min.js', 
                'assets/js/vendor/jquery.infinite.scroll.min.js',
                'assets/js/main.js'
                ],
          dest: 'assets/js/main.min.js',
        },
    },
    uglify: {
        build: {
          src: 'assets/js/main.min.js',
          dest: 'assets/js/main.min.js'
        }
    }, 
    sass: {                              
      dist: {                          
        options: {
          style: 'compressed' //output style: nested, compact, compressed, expanded
        },
        files: {                         
          'assets/css/screen.css': 'assets/scss/screen.scss', // 'destination': 'source'
          'assets/css/extra.css': 'assets/scss/extra.scss' // 'destination': 'source'
        }
      }
    }
  });
  
  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('js-task', ['concat', 'uglify']);
  grunt.registerTask('sass-task', ['sass']);

};
