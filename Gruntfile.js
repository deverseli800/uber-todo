'use strict';
var LIVERELOAD_PORT = 35729;
var path = require('path');


module.exports = function(grunt) {

  // Load Grunt tasks declared in package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    external_daemon: {
      mongod: {
        cmd: 'mongod'
      }
    },
    express: {
      options: {
        port: 3000,
        hostname: '0.0.0.0'
      },
      dev: {
        options: {
          livereload: true,
          server: path.resolve('app.js')
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:<%= express.options.port %>'
      }
    }
  });

  grunt.registerTask('server', [
    'external_daemon:mongod',
    'express',
    'open',
    'express-keepalive'
  ]);

  grunt.registerTask('default', ['server']);
};
