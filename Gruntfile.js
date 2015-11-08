module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),

		'meta': {
			'jsFilesForTesting': [
				'bower_components/jquery/jquery.js',
				'bower_components/angular/angular.js',
				'bower_components/angular-route/angular-route.js',
				'bower_components/angular-sanitize/angular-sanitize.js',
				'bower_components/angular-mocks/angular-mocks.js',
				'bower_components/restangular/dist/restangular.js',
				'bower_components/underscore/underscore.js',
				'bower_components/underscore/underscore.js',
				'test/**/*Spec.js'
			]
		},

		'karma': {
			'development': {
				'configFile': 'karma.conf.js',
				'options': {
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'source/**/*.js'
					],
				}
			},
			'dist': {
				'options': {
					'configFile': 'karma.conf.js',
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
					],
				}
			},
			'minified': {
				'options': {
					'configFile': 'karma.conf.js',
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js'
					],
				}
			}
		},

		'jshint': {
			'beforeconcat': ['source/**/*.js'],
		},

		'concat': {
			'dist': {
				'src': ['source/**/*.js'],
				'dest': 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
			}
		},

		'uglify': {
			'options': {
				'mangle': false
			},  
			'dist': {
				'files': {
					'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.namelower %>-<%= pkg.version %>.js']
				}
			}
		},
		
		'jsdoc': {
			'src': ['source/**/*.js'],
			'options': {
				'destination': 'doc'
			}
		},
		sass: {
			dist: {
				files: {
					'styles/css/constants.css': 'styles/scss/constants.scss',
					'styles/css/generic.css': 'styles/scss/generic.scss'
				}
			}
		},
		cssmin: {
			dist: {
				options: {
					banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
				},
				files: {
					'dist/css/style.min.css': ['styles/scss/*.scss']
				}
			}
		}
	});

	grunt.registerTask('test', ['karma:development']);
	grunt.registerTask('build',
		[
			/*'jshint',
			'karma:development',
			'concat',
			'karma:dist',
			'uglify',
			'karma:minified',
			'jsdoc',*/
			'cssmin',
			'sass'
		]);

};