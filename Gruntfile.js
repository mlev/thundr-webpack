module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var debugJs = false;

	grunt.config.init({
		basic: {
			src: 'src/main/static',
			gen: 'target/generated-sources',
			dist: 'src/main/webapp/static'
		},
		yeoman: {
			project: 'thundr-webpack',
			port: 8080
		},
		extensions: {
			// file extensions for different asset types
			images: 	'{png,jpg,jpeg,gif,webp,svg}',
			fonts: 		'{css,eot,svg,ttf,woff,woff2,gif,png,jpg,jpeg}',
		},
		srcs: {
			// source location for different asset types
			css: 		'<%= basic.src %>/css/',
			fonts: 		'<%= basic.src %>/fonts/',
			images:		'<%= basic.src %>/images/',
            ts: 		'<%= basic.src %>/typescript/',
            less:		'<%= basic.src %>/less/styles/',
			templates:	'<%= basic.src %>/templates/',
		},

		clean: { // Clean generated assets - basically purges src/main/webapp/static
			static:		{ src: '<%= basic.dist %>',dot: true },
			bower:		{ src: 'bower_components',	dot: true },
			generated:	{ src: '<%= basic.gen %>',	dot: true }
		},
		copy: { // Copy assets from src/main/static to /src/main/webapp/static
			css: 		{ cwd: '<%= srcs.css %>', 		src: '{,*/}*.css',						dest: '<%= basic.dist %>/css/', 		expand: true },
			fonts: 		{ cwd: '<%= srcs.fonts %>', 	src: '{,*/}*.<%= extensions.fonts %>',	dest: '<%= basic.dist %>/fonts/', 		expand: true },
			images: 	{ cwd: '<%= srcs.images %>',	src: '**/*.<%= extensions.images %>',	dest: '<%= basic.dist %>/images/',		expand: true },
			templates:	{ cwd: '<%= srcs.templates %>',	src: '**/*.html',						dest: '<%= basic.dist %>/templates/',	expand: true }
		},
		less: { // Compiles Less files in src/main/static/less/styles into src/main/webapp/static
			generate: {
				options: { 	compress: true, cleancss: true },
				files: [{	cwd: '<%= basic.src %>',	src: ['less/styles/**/*.less'],	dest: '<%= basic.dist %>/styles/',	ext: '.css',	flatten: true, 	expand: true }]
			}
		},
		favicons: { // Generate favicons from one single original favicon file.
			// REQUIRES IMAGE MAGIC - installation instructions here: https://github.com/gleero/grunt-favicons
			options: {
				html: 'src/main/webapp/WEB-INF/tags/meta-favicons.html',
				HTMLPrefix: "/static/images/favicon/"
			},
			generate: {
				src: '<%= srcs.images %>/favicon/original.png',
				dest: '<%= basic.dist %>/images/favicon'
			},
		},
        tslint: {
            options: {
                configuration: "tslint.json",
                force: false
            },
            files: {
                src: [ '<%= srcs.ts %>/**/*.ts']
            }
        },
        typescript: { // compile typescript - generates files into target/generated-sources/temp/javascript
            base: {
                src: [ '<%= srcs.ts %>/**/*.ts'],
                dest: '<%= basic.gen %>/temp/javascript',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        ngAnnotate: { // Automatically add angular annotation for angular DI - Generates files from target/generated-sources/temp/javascript into target/generated-sources/javascript
            js: {
                files: [{
                    cwd: '<%= basic.gen %>/temp/javascript',
                    src : [ '**/*.js' ],
                    dest: '<%= basic.gen %>/javascript',
                    expand: true
                }]
            }
        },
		concat: { // Concatenates application javascript into one uber file
			js: {
				src: ['<%= basic.gen %>/javascript/app.js', '<%= basic.gen %>/javascript/**/*.js', "!<%= basic.gen %>/javascript/application.js"],
				dest: '<%= basic.gen %>/javascript/application.js'
			},
		},
		uglify: { // Uglify javascript from target/generated-sources/javascript into src/main/static/javascript
			js: {
				files: [{
					cwd: '<%= basic.gen %>/javascript',
					src : [ '**/*.js' ],
					dest: '<%= basic.dist %>/javascript',
					expand: true
				}]
			},
			options: {
				beautify: debugJs,
				sourceMap: true,
				sourceMapIncludeSources: true,
				mangle: debugJs ? false : {},
				compress: debugJs ? false : {},
				wrap: true
			}
		},
		bower: { // Install your bower dependencies to src/main/static/lib
			copy: {
				options: {
					targetDir: '<%= basic.dist %>/lib',
					layout: function(type, component, source) {
						// We maintain the original bower layout, but only include main files
						var tokens = source.split("/");
						var end = tokens.length < 3 ? tokens.length : tokens.length - 1;
						return tokens.slice(1, end).join("/");
					}
				}
			}
		},
        typings: {
            install: {}
        },
        injector: { // auto inject application files into page layout
			css: {
				options: {
					relative: false,
					destFile: 'src/main/webapp/WEB-INF/tags/generated-css.html',
					ignorePath: 'src/main/webapp'
				},
				files: [
					{   // Application styles
						expand: true,
						cwd: '<%= basic.dist %>/styles/',
						src: ['**/*.css']
					}
				]
			},
			js: {
				options: {
					relative: false,
					destFile: 'src/main/webapp/WEB-INF/tags/generated-js.html',
					ignorePath: 'src/main/webapp'
				},
				files: [
					{   // Application javascript
						expand: true,
						cwd: '<%= basic.dist %>/javascript/',
						src: debugJs ? ['**/*.js', '!application.js'] : ['application.js']
					}
				]
			}
		},
		wiredep: { // auto inject bower files into page layout (in dependency order
			bowerResources: {
				src: ['src/main/webapp/WEB-INF/tags/generated-css.html', 'src/main/webapp/WEB-INF/tags/generated-js.html'],
				options: {
					ignorePath: "../../../../../bower_components/",
					fileTypes: {
						html: {
							block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
							detect: {
								js: /<script.*src=['"]([^'"]+)/gi,
								css: /<link.*href=['"]([^'"]+)/gi
							},
							replace: {
								js: '<script src="/static/lib/{{filePath}}"></script>',
								css: '<link rel="stylesheet" href="/static/lib/{{filePath}}" />'
							}
						}
					},
					exclude: [/bootstrap.css/]
				}
			}
		},
		cacheBust: {
			options: {
				rename: false
			},
			assets: {
				files: [
					{
						expand: true,
						cwd: 'src/main/webapp/WEB-INF/tags/',
						src: ['generated-css.html', 'generated-js.html'],
						baseDir: "<%= basic.dist %>/../"
					}
				]
			}
		},

		/**
		 * Watch for changes to the asset groups and re-process as necessary.
		 */
		watch: {
			gruntfile: { files: [ 'Gruntfile.js'] },
			bower: 		{ tasks: ['bower'],								files: ['bower.json'] },
			css: 		{ tasks: ['process-css', 'process-layout'], 	files: ['<%= basic.src %>/css/**/*.css'] },
			favicon: 	{ tasks: ['process-favicon'],					files: ['<%= basic.src %>/images/favicon/*.<%= extensions.images %>'] },
			fonts: 		{ tasks: ['process-fonts'], 					files: ['<%= basic.src %>/fonts/**/*.<%= extensions.fonts %>'] },
			images: 	{ tasks: ['process-images'],					files: ['<%= basic.src %>/images/**/*.<%= extensions.images %>'] },
            js: 		{ tasks: ['process-js', 'process-layout'],		files: ['<%= basic.src %>/typescript/**/*.ts'] },
			less: 		{ tasks: ['process-css', 'process-layout'],		files: ['<%= basic.src %>/less/**/*.less' ] },
			layout: 	{ tasks: ['process-layout'],					files: ['src/main/webapp/WEB-INF/tags/layout.tag' ] },
			templates: 	{ tasks: ['process-templates'],					files: ['<%= basic.src %>/templates/**/*.html'] },
		},

		connect : {
			options : { port : '<%= yeoman.port %>', hostname : 'localhost' },
			proxies : [ {
				context : [ '/', '!/static' ],
				host : 'localhost',
				port : '<%= yeoman.port + 1 %>'
			}],
			server: {
				options: {
					host : 'localhost',
					port : '<%= yeoman.port %>',
					base: 'src/main/webapp',
					logger: 'dev',
					middleware: function (connect, options) {
						var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
						return [
							proxy, // Include the proxy first
							connect.static(options.base), // Serve static files.
							connect.directory(options.base) // Make empty directories browsable.
						];
					}
				},
				proxies : [ {
					context : [ '/', '!/static' ],
					host : 'localhost',
					port : '<%= yeoman.port + 1 %>'
				}]
			}
		}
	});

	grunt.registerTask('default', [
		'build',
		'test',
		'configureProxies',
		'connect:server',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:static',
		'create-generated-files',
		'bower',
        'typings',
		'process-favicons',
		'process-templates',
		'process-images',
		'process-fonts',
		'process-css',
		'process-js',
		'process-layout'
	]);
	grunt.registerTask('test', [

	]);

	grunt.registerTask('process-favicons', [
		'favicons'
	]);
	grunt.registerTask('process-js', [
        'tslint',
        'typescript',
        'ngAnnotate',
		'concat',
		'uglify'
	]);

	grunt.registerTask('process-css', [
		'copy:css',
		'less'
	]);

	grunt.registerTask('process-fonts', [
		'copy:fonts'
	]);

	grunt.registerTask('process-templates', [
		'copy:templates'
	]);
	grunt.registerTask('process-layout', [
		'injector',
		'wiredep',
		'cacheBust'
	]);

	grunt.registerTask('process-images', [
		'copy:images'
	]);

	grunt.registerTask('create-generated-files', function(){
		grunt.file.write('src/main/webapp/WEB-INF/tags/generated-css.html','<!-- bower:css -->\n<!-- endbower -->\n<!-- injector:css -->\n<!-- endinjector -->');
		grunt.file.write('src/main/webapp/WEB-INF/tags/generated-js.html','<!-- bower:js -->\n<!-- endbower -->\n<!-- injector:js -->\n<!-- endinjector -->');
	});



};
