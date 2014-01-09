'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through');
var prop = gutil.colors.blue;
var header = gutil.colors.underline;

function tildify(path) {
	return path.replace(/^\/Users\/\w+\//, '~/');
}

module.exports = function (options) {
	return through(function (file) {
		if (file.isStream()) {
			return this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
		}

		var nowDateTime = (new Date()).toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC';

		var fileObj =
			(file.cwd ? 'cwd:      ' + prop(tildify(file.cwd)) : '') +
			(file.base ? '\nbase:     ' + prop(tildify(file.base)) : '') +
			(file.path ? '\npath:     ' + prop(tildify(file.path)) : '') +
			(file.stat ? '\nstat:     ' + prop(file.stat) : '') +
			(file.contents ? '\ncontents: ' + prop(file.contents.toString('utf8', 0, 40).trim() + '...\n') : '');

		gutil.log(
			'gulp-debug: ' + gutil.colors.gray('(' + nowDateTime + ')') + '\n\n' +
			header('File\n') + fileObj
		);

		this.queue(file);
	});
};
