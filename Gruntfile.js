/*!
 * APISENSE asset's Gruntfile
 * http://assets.apisense.com
 * Copyright (c) 2014 APISENSE.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    // ==========

    pkg: grunt.file.readJSON('package.json'),    
    
    banner: '/*!\n' +
            ' * <%= pkg.author %>\n' +
            ' * <%= pkg.website %>\n' +
            ' * Copyright (C) 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',
    
    distDir: 'dist',
    compileDir: '<%= distDir %>/compile',
    htmlDir: 'html',
    cssDir: 'stylesheets',
    imgDir: 'images',

    // Task configuration.
    // ==========

    // Clean files and directories.
    clean: {
      dist: ['<%= distDir %>', '<%= compileDir %>']
    },

    // Lint CSS files.
    csslint: {
      options: {
        csslintrc: '<%= cssDir %>/.csslintrc'
      },
      src: [
        '<%= compileDir %>/<%= cssDir %>/style.css'
      ]
    },

    // Compile LESS files to CSS.
    less: {
      compile: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'http://assets.apisense.com/<%= cssDir %>/style.css.map',
          sourceMapFilename: '<%= compileDir %>/<%= cssDir %>/style.css.map'
        },
        files: {
          '<%= compileDir %>/<%= cssDir %>/style.css': '<%= cssDir %>/style.less'
        }
      }
    },

    // Compress CSS files.
    cssmin: {
      compress: {
        options: {
          keepSpecialComments: '*',
          noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
          report: 'min',
          selectorsMergeMode: 'ie8'
        },
        src: [
          '<%= compileDir %>/<%= cssDir %>/style.css'
        ],
        dest: '<%= compileDir %>/<%= cssDir %>/style.min.css'
      }
    },

    // Adds a simple banner to files.
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            '<%= compileDir %>/<%= cssDir %>/style.css',
            '<%= compileDir %>/<%= cssDir %>/style.min.css',            
          ]
        }
      }
    },

    // The grunt plugin for sorting CSS properties in specific order.
    csscomb: {
      sort: {
        options: {
          config: '<%= cssDir %>/.csscomb.json'
        },
        files: {
          '<%= compileDir %>/<%= cssDir %>/style.css': '<%= compileDir %>/<%= cssDir %>/style.css',
        }
      }
    },

    // Grunt plugin for properly prepending a CDN url 
    // to those assets referenced with absolute paths (but not URLs)
    cdn: {
      options: {
        cdn: '//assets.apisense.com/',
        flatten: true
      },
      dist: {
        cwd: '<%= htmlDir %>',
        src: ['*.html'],
        dest: '<%= compileDir %>/<%= htmlDir %>/'
      }
    },

    // Copy files and directories.
    copy: {
      images: {
        files: [{
          expand: true, 
          src: ['<%= imgDir %>/**'], 
          dest: '<%= compileDir %>/'
        }]
      }
    },

    // Compress files and directories.
    compress: {
      dist: {
        options: {
          archive: '<%= distDir %>/dist.zip',
        },
        files: [
          {expand: true, cwd: '<%= compileDir %>/', src: ['./**']}
        ]
      }
    },

    // Run predefined tasks whenever watched
    // file Patterns are added, changed or deleted.
    watch: {
      less: {
        files: '<%= cssDir %>/*.less',
        tasks: 'less'
      }
    },
  });

  
  // Load all plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Grunt tasks:
  // grunt clean
  // grunt watch  => hot compile coding
  // grunt 
  grunt.registerTask('test', ['dist-css', 'csslint']);  

  grunt.registerTask('dist-css', ['less', 'cssmin', 'csscomb', 'usebanner']);
  grunt.registerTask('dist-html', ['cdn']);
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-html', 'copy:images', 'compress:dist']);
  
  grunt.registerTask('default', ['test', 'dist']);

};
