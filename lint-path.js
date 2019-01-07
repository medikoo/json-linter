"use strict";

const stat          = require("fs2/stat")
    , lintFile      = require("./lint-file")
    , lintDirectory = require("./lint-directory");

module.exports = path =>
	stat(path).then(stats => {
		if (stats.isDirectory()) return lintDirectory(path);
		return lintFile(path);
	});
