module.exports = function( grunt ) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
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

    delta: {
      less: {
        files: [ 'src/css/**/*.less' ],
        tasks: [ 'less:build' ]
      }
    }
  };

  grunt.initConfig( config );

  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', [ 'build', 'delta' ] );
  grunt.registerTask( 'build', [ 'clean', 'less:build' ] );
  grunt.registerTask( 'dist', [ 'less:dist' ] );
  grunt.registerTask( 'default', [ 'build', 'dist' ] );
};