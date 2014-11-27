module.exports = function( grunt ) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var config;

  config = {

    pkg: grunt.file.readJSON('package.json'),

    jekyllConfig: grunt.file.readYAML('_config.yml'),

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
      }
    },

    jshint: {
      files: [ 'src/js/*.js', '!src/js/linkedin.js' ],
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
  grunt.registerTask( 'build', [ 'clean', 'jshint', 'copy', 'concatScripts', 'less:build' ] );
  grunt.registerTask( 'dist', [ 'less:dist', 'uglify' ] );
  grunt.registerTask( 'default', [ 'build', 'dist' ] );

  grunt.registerTask( 'concatScripts', 'concat scripts based on jekyll configuration file _config.yml', function() {

    // concat task provides a process function to load dynamic scripts parameters
    var concat = {
        js: {
          dest: 'assets/scripts.js',
          options: {
            process: function( content, srcPath ) {
              return grunt.template.process( content );
            }
          }
        }
      },
      jekyllConfig = grunt.config.get('jekyllConfig'),
      scriptSrc = [];

    scriptSrc.push('src/js/module.prefix');

    scriptSrc.push('src/js/github.js');

    // only put scripts that will be used

    if ( jekyllConfig.share.twitter ) {
      scriptSrc.push('src/js/twitter.js');
    }

    if ( jekyllConfig.share.facebook ) {
      scriptSrc.push('src/js/facebook.js');
    }

    if ( jekyllConfig.share.google_plus ) {
      scriptSrc.push('src/js/google-plus.js');
    }

    if ( jekyllConfig.share.disqus ) {
      scriptSrc.push('src/js/disqus.js');
    }

    scriptSrc.push('src/js/module.suffix');

    // explicitly put the linkedIn code out of the immediate function to work
    if ( jekyllConfig.share.linkedin ) {
      scriptSrc.push('src/js/linkedin.js');
    }

    // set source
    concat.js.src = scriptSrc;

    // set a new task configuration
    grunt.config.set( 'concat', concat );

    // execute task
    grunt.task.run('concat');
  });
};
