module.exports = function( grunt ) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var config;

  config = {

    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*!\n' +
          ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          ' * <%= pkg.author %>\n' +
          ' * <%= pkg.description %>\n' +
          ' * <%= pkg.url %>\n' +
          ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
          ' */\n'
    },

    clean: [ 'assets' ],

    copy: {
      font: {
        src: 'fonts/*',
        dest: 'assets',
        expand: true,
        cwd: 'bower_components/font-awesome'
      },
      js: {
        src: 'scripts.js',
        dest: 'assets',
        expand: true,
        cwd: 'src/js'
      }
    },

    jshint: {
      files: [ 'src/js/*.js' ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    less: {
      build: {
        src: 'src/css/site.less',
        dest: 'assets/site.css'
      },
      dist: {
        src: 'assets/site.css',
        dest: 'assets/site.css',
        options: {
          banner: '<%= meta.banner %>',
          cleancss: true,
          compress: true
        }
      }
    },

    uglify: {
      options: {
        banner: "<%= meta.banner %>"
      },
      dist: {
        files: {
          'assets/scripts.js': 'assets/scripts.js'
        }
      }
    },

    delta: {
      jshint: {
        files: [ 'src/js/**/*.js' ],
        tasks: [ 'jshint', 'copy:js' ]
      },
      less: {
        files: [ 'src/css/**/*.less' ],
        tasks: [ 'less:build' ]
      }
    }
  };

  grunt.initConfig( config );

  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', [ 'build', 'delta' ] );
  grunt.registerTask( 'build', [ 'clean', 'jshint', 'copy', 'less:build' ] );
  grunt.registerTask( 'dist', [ 'less:dist', 'uglify' ] );
  grunt.registerTask( 'default', [ 'build', 'dist' ] );
};