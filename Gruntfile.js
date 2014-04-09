module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'assets-dev/js/functions.js',
        dest: 'assets/js/functions.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'assets-dev/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/images/'
        }]
      }
    },
    less: {
      dist: {
        options: {
            compress: true
        },
        files: {
            'assets/css/style.min.css': 'assets-dev/less/style.less'
        }
      } 
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'globaldigital.cl',
          port: 21,
          authKey: 'key'
        },
        src: '/Applications/MAMP/htdocs/tab-prueba/',
        dest: '/public_html/desarrollo/tab-prueba/',
        exclusions: [
          '/Applications/MAMP/htdocs/tab-prueba/**/.*',
          '/Applications/MAMP/htdocs/tab-prueba/**/.*/', 
          '/Applications/MAMP/htdocs/tab-prueba/**/Thumbs.db',
          '/Applications/MAMP/htdocs/tab-prueba/**/ftppass',
          '/Applications/MAMP/htdocs/tab-prueba/node_modules',
          '/Applications/MAMP/htdocs/tab-prueba/*.json',
          '/Applications/MAMP/htdocs/tab-prueba/Gruntfile.js',
          '/Applications/MAMP/htdocs/tab-prueba/assets-dev'
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['assets-dev/js/*.js'],
        tasks: ['uglify'],
        options: {
            spawn: false
        }
      },
      css: {
        files: ['assets-dev/less/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['*.html'],
        options: {
            livereload: true
        }
      },
      another: {
        files: ['assets-dev/images/*.*'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.registerTask('default', ['uglify','less','imagemin','watch']);

};