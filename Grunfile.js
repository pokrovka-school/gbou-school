module.exports = function(grunt) {
	require('dotenv').config();
	const DEBUG = parseInt(process.env.DEBUG) || false;
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
  });
  grunt.registerTask('default',	["clean"]);
}
