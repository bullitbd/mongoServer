    'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.initConfig({
        jshint: {
            options: {
                node: true
            },
            // dev: {
            //     src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'index.js', 'models/**/*.js', 'routes/**/*.js']
            // },
            jasmine: {
                src: ['test/karma_tests/*test.js'],
                options: {
                    globals: {
                        angular: true,
                        describe: true,
                        it: true,
                        before: true,
                        beforeEach: true,
                        after: true,
                        afterEach: true,
                        expect: true
                    }
                }
            }, 

            mocha: {
                src: ['test/server_tests/*test.js'],
                options: {
                    globals: {
                        describe: true,
                        it: true,
                        before: true,
                        beforeEach: true,
                        after: true,
                        afterEach: true,
                    }
                }
            },
            server: {
                src: ['Gruntfile.js', 'lib/server.js', 'models/*.js', 'routes/*.js']
            },
            client: {
                src: ['app/**/*.js'],
                options: {
                    globals: {
                        angular: true
                    }
                }
            },

        },

        jscs: {
            src: ['lib/**/*.js', 'test/*.js', 'index.js', 'models/**/*.js', 'routes/**/*.js'],
            options: {
                config: '.jscsrc'
            }
        },
        simplemocha: {
            all: {
                src: ['test/server_tests/*.js']
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
                entry: __dirname + '/test/karma_tests/entries_controller_test.js',
                output: {
                    path: 'test/karma_tests',
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
    grunt.registerTask('jshint:all', ['jshint:jasmine', 'jshint:mocha', 'jshint:server', 'jshint:client', 'jscs']);
    grunt.registerTask('servertests', ['jshint:server', 'jscs', 'simplemocha', ]);
    grunt.registerTask('karmatests', ['webpack:karma_test', 'karma:test']);
    grunt.registerTask('build', ['webpack:client', 'copy:html']);
    grunt.registerTask('default', ['jshint:all', 'build', 'servertests', 'karmatests', ]);


};