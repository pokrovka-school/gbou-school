module.exports = function(grunt) {
	const sass = require('node-sass');
	require('dotenv').config();
	const DEBUG = parseInt(process.env.DEBUG) || false;
	var fs = require('fs'),
		chalk = require('chalk'),
		PACK = grunt.file.readJSON('package.json'),
		uniqid = function () {
			if(DEBUG){
				var md5 = require('md5');
				result = md5((new Date()).getTime()).toString();
				grunt.verbose.writeln("Generate hash: " + chalk.cyan(result) + " >>> OK");
				return result;
			}
			return `v${PACK.font_version}`;
		};
	
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};
	
	var gc = {
			fontvers: `${PACK.font_version}`,
			assets: "assets/templates/projectsoft",
			gosave: "site/assets/templates/projectsoft",
		},
		NpmImportPlugin = require("less-plugin-npm-import");
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : PACK,
		clean: {
			options: {
				force: true
			},
			all: [
				'test/',
				'tests/'
			]
		},
		concat: {
			options: {
				separator: "\n",
			},
			appjs: {
				src: [
					'bower_components/jquery/dist/jquery.js',
					"bower_components/fancybox/src/js/core.js",
					"bower_components/fancybox/src/js/media.js",
					"bower_components/fancybox/src/js/guestures.js",
					"bower_components/fancybox/src/js/slideshow.js",
					"bower_components/fancybox/src/js/fullscreen.js",
					"bower_components/fancybox/src/js/thumbs.js",
					"bower_components/fancybox/src/js/hash.js",
					"bower_components/fancybox/src/js/wheel.js",
					'bower_components/slick-carousel/slick/slick.js',
					'bower_components/js-cookie/src/js.cookie.js',
					'bower_components/jquery.cookie/jquery.cookie.js',
					'bower_components/button-visually-impaired-javascript/dist/js/bvi.js'
				],
				dest: 'test/js/app.js'
			},
			main: {
				src: [
					'src/js/main.js'
				],
				dest: 'test/js/main.js'
			}
		},
		uglify: {
			options: {
				sourceMap: false,
				compress: {
					drop_console: false
				},
				output: {
					ascii_only: true
				}
			},
			app: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'test/js/app.js',
							'test/js/main.js'
						],
						dest: '<%= globalConfig.gosave %>/js',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + src.replace('.js', '.min.js');
						}
					}
				]
			}
		},
		webfont: {
			icons: {
				src: 'src/glyph/*.svg',
				dest: 'src/fonts/',
				options: {
					hashes: true,
					relativeFontPath: '@{fontpath}',
					destLess: 'src/less',
					font: 'pokrovka',
					types: 'ttf',
					fontFamilyName: 'Pokrovka',
					stylesheets: ['less'],
					syntax: 'bootstrap',
					engine: 'node',
					autoHint: false,
					execMaxBuffer: 1024 * 200,
					htmlDemo: false,
					version: PACK.font_version,
					normalize: true,
					startCodepoint: 0xE900,
					iconsStyles: false,
					templateOptions: {
						baseClass: 'icon',
						classPrefix: 'icon-'
					},
					embed: false,
					template: 'src/font-build.template'
				}
			},
		},
		datauri: {
			default: {
				options: {
					classPrefix: '',
					variables: true,
				},
				src: 'bower_components/button-visually-impaired-javascript/dist/img/*.svg',
				dest: [
					"src/scss/base64.scss"
				]
			}
		},
		sass: {
			options: {
				implementation: sass,
				sourceMap: false
			},
			dist: {
				files: {
					'src/less/bvi.less': 'src/scss/bvi.scss'
				}
			}
		},
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [
						new NpmImportPlugin({prefix: '~'})
					],
					modifyVars: {
						'hashes': '\'' + uniqid() + '\'',
						'fontpath': '/assets/templates/projectsoft/fonts',
						'imgpath': '/assets/templates/projectsoft/images',
					}
				},
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					]
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: [
					"last 4 version"
				],
				cascade: true
			},
			css: {
				files: {
					'test/css/prefix.main.css' : [
						'test/css/main.css'
					]
				}
			}
		},
		group_css_media_queries: {
			group: {
				files: {
					'test/css/media/main.css': ['test/css/prefix.main.css']
				}
			}
		},
		replace: {
			css: {
				options: {
					patterns: [
						{
							match: /\/\*.+?\*\//gs,
							replacement: ''
						},
						{
							match: /\r?\n\s+\r?\n/g,
							replacement: '\n'
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/main.css'
						],
						dest: 'test/css/replace/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/main.css'
						],
						dest: 'site/assets/templates/projectsoft/css/',
						filter: 'isFile'
					}
				]
			},
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			minify: {
				files: {
					'site/assets/templates/projectsoft/css/main.min.css' : ['test/css/replace/main.css']
				}
			}
		},
		imagemin: {
			options: {
				optimizationLevel: 3,
				svgoPlugins: [
					{
						removeViewBox: false
					}
				]
			},
			base: {
				files: [
					{
						expand: true,
						cwd: 'src/images', 
						src: ['**/*.{png,jpg,jpeg}'],
						dest: 'test/images/',
					},
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/*.{gif,svg}'
						],
						dest: '<%= globalConfig.gosave %>/images/',
						filter: 'isFile'
					}
				]
			}
		},
		tinyimg: {
			dynamic: {
				files: [
					{
						expand: true,
						cwd: 'test/images', 
						src: ['**/*.{png,jpg,jpeg}'],
						dest: '<%= globalConfig.gosave %>/images/'
					}
				]
			}
		},
		ttf2eot: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: '<%= globalConfig.gosave %>/fonts/'
			}
		},
		ttf2woff: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: '<%= globalConfig.gosave %>/fonts/'
			}
		},
		ttf2woff2: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: '<%= globalConfig.gosave %>/fonts/'
			}
		},
		copy: {
			fonts: {
				expand: true,
				cwd: 'src/fonts',
				src: [
					'**'
				],
				dest: '<%= globalConfig.gosave %>/fonts/',
			},
			js: {
				expand: true,
				cwd: 'test/js',
				src: [
					'**'
				],
				dest: '<%= globalConfig.gosave %>/js/',
			},
			favicons: {
				expand: true,
				cwd: 'src/favicons',
				src: [
					'**'
				],
				dest: __dirname + "/site/",
			},
			form: {
				expand: true,
				cwd: 'src/json',
				src: [
					'**'
				],
				dest: __dirname + "/site/comon/json/",
			}
		},
		pug: {
			serv: {
				options: {
					client: false,
					pretty: '\t',
					separator:  '\n',
					data: function(dest, src) {
						return {
							"base": "[(site_url)]",
							"tem_path" : "/assets/templates/projectsoft",
							"img_path" : "assets/templates/projectsoft/images/",
							"site_name": "[(site_name)]",
							"hash": uniqid(),
							"hash_css": uniqid(),
							"hash_js": uniqid(),
							"hash_appjs": uniqid(),
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: __dirname + '/src/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/' + '<%= globalConfig.gosave %>/',
						ext: '.html'
					}
				]
			},
			tpl: {
				options: {
					client: false,
					pretty: '\t',
					separator:  '\n',
					data: function(dest, src) {
						return {
							"base": "[(site_url)]",
							"tem_path" : "/assets/templates/projectsoft",
							"img_path" : "assets/templates/projectsoft/images/",
							"site_name": "[(site_name)]",
							"hash": uniqid(),
						}
					},
				},
				files: [
					{
						expand: true,
						dest: __dirname + '/<%= globalConfig.gosave %>/tpl/',
						cwd:  __dirname + '/src/pug/tpl/',
						src: '*.pug',
						ext: '.html'
					}
				]
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			less: {
				files: [
					'src/less/**/*.*',
				],
				tasks: ["clean:all", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "pug"]
			},
			js: {
				files: [
					'src/js/**/*.*',
				],
				tasks: ["clean:all", "concat", "uglify", "copy:js", "pug"]
			},
			pug: {
				files: [
					'src/pug/**/*.*',
				],
				tasks: ["clean:all", "pug"]
			},
			images: {
				files: [
					'src/images/**/*.*',
				],
				tasks: ["imagemin", "tinyimg", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "pug"]
			},
			fonts : {
				files: [
					'src/fonts/**/*.*',
				],
				tasks: ["clean:all", "ttf2woff", "ttf2woff2", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "copy:fonts", "pug"]
			},
			//glyph : {
			//	files: [
			//		'src/glyph/**/*.*',
			//	],
			//	tasks: ["clean:all", "webfont", "ttf2woff", "ttf2woff2", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "copy:fonts", "pug"]
			//}
		}
	});
	grunt.registerTask('default',	["clean:all", "concat", "uglify", "webfont", "ttf2woff", "ttf2woff2", "imagemin", "tinyimg", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "copy", "pug"]);
	grunt.registerTask('dev',		["watch"]);
	grunt.registerTask('css',		["clean:all", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "pug"]);
	grunt.registerTask('images',	["imagemin", "tinyimg", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "pug"]);
	grunt.registerTask('js',		["clean:all", "concat", "uglify", "copy:js", "pug"]);
	//grunt.registerTask('glyph',	["clean:all", "webfont", "ttf2woff", "ttf2woff2", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "copy:fonts", "pug"]);
	grunt.registerTask('fonts',		["clean:all", "ttf2woff", "ttf2woff2", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "copy:fonts", "pug"]);
	grunt.registerTask('html',		["clean:all", "pug"]);
	grunt.registerTask('speed',		["clean:all", "concat", "uglify", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "copy", "pug"]);
	grunt.registerTask('work',		["clean:all", "concat", "uglify", "imagemin", "tinyimg", "datauri", "sass", "less", "autoprefixer", "group_css_media_queries", "replace", "cssmin", "copy", "pug"]);
}
