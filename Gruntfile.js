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
      coffee: {
        files: ['assets/coffee/*.coffee'],
        tasks: ['coffee']
      }
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
    },
    coffee: {
      compile: {
        options:{
          join:true
        },
        files:{
          'assets/js/booking.coffee.js':['assets/coffee/booking.coffee'],
          'assets/js/config.coffee.js':['assets/coffee/config.coffee'],
          'assets/js/detail.coffee.js':['assets/coffee/detail.coffee']
        }
      }
    }

  });
  
  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'coffee', 'watch']);
  grunt.registerTask('js-task', ['concat', 'uglify']);
  grunt.registerTask('sass-task', ['sass']);

};
