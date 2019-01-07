"use strict";

const { resolve } = require("path")
    , readdir     = require("fs2/readdir")
    , log         = require("log").get("json-lint").info
    , lintFile    = require("./lint-file");

module.exports = dirName => {
	const errors = [], promises = [];
	return readdir(dirName, {
		type: { file: true },
		ignoreRules: "git",
		pattern: /\.json$/u,
		depth: Infinity,
		stream: true
	})
		.on("change", ({ added }) => {
			for (const fileName of added) {
				log("lint %s", fileName);
				promises.push(
					lintFile(resolve(dirName, fileName)).catch(error => {
						error.fileName = fileName;
						errors.push(error);
					})
				);
			}
		})
		.then(() => Promise.all(promises))
		.then(() => {
			if (!errors.length) return;
			throw Object.assign(new Error("Some files errored"), { errors });
		});
};
