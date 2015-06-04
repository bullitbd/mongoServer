    'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dev: {
                src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'index.js', 'models/**/*.js', 'routes/**/*.js']
            }
        },
        jscs: {
            src: ['lib/**/*.js', 'test/*.js', 'index.js', 'models/**/*.js', 'routes/**/*.js'],
            options: {
                config: '.jscsrc'
            }
        },
        simplemocha: {
            all: {
                src: ['test/**/*.js']
            }
        },
        watch: {
            scripts: {
                files: ['lib/**/*.js', 'test/*.js'],
                tasks: ['jshint']
            }
        },
        
        webpack: {
            client: {
                entry: __dirname + '/app/js/client.js',
                output: {
                    path: 'build/',
                    file: 'bundle.js'
                }
            },
            test: {
                entry: __dirname + '/test/client/test.js',
                output: {
                    path: '/test/client',
                    file: 'test_bundle.js'
                }
            },
            karma_test: {
                entry: __dirname + '/test/karma_tests/test_entry.js',
                output: {
                    path: '/test/karma_tests',
                    file: 'bundle.js'
                }
            }
        },

        karma: {
            test: {
                configFile: 'karma.conf.js'
            }
        },
            
        copy: {
            html: {
                cwd: 'app/',
                expand: true,
                flatten: false,
                src: '**/*.html',
                dest: 'build/',
                filter: 'isFile'
            }
        },
        clean: {
            dev: {
                src: 'build/'
            }
        }
        
    });
    grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
    grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
    grunt.registerTask('build', ['build:dev']);
    grunt.registerTask('karmatest', ['webpack:karma_test', 'karma:test']);
    grunt.registerTask('default', ['test', 'build']);
};