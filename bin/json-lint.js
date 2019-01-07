#!/usr/bin/env node

"use strict";

Error.stackTraceLimit = Infinity;

process.on("unhandledRejection", reason => { throw reason; });

require("log-node")({ defaultNamespace: "json-lint" });

const meta = require("../package");

const argv = require("minimist")(process.argv.slice(2), { boolean: ["pull", "push"] });

const [path] = argv._;

const usage = `json-lint v${ meta.version }

Usage: json-lint [-h | --help] [--no-pull] [--push] <path>

Lint all JSON files at <path>.

If <path> points file. File is linted.

If <path> points directory, then all JSON files found in directory but not marked
as ignored by eventual .gitignore rules are linted

Options:

    --help,            -h  Show this message
    --version,         -v  Show version

`;

if (argv.h || argv.help || !path) {
	process.stdout.write(usage);
	return;
}

if (argv.v || argv.version) {
	process.stdout.write(`${ meta.version }\n`);
	return;
}

require("../lint-path")(path).catch(error => {
	if (error.hash) {
		process.stdout(`${ error.message }\n`);
		process.exit(1);
	}
	if (error.errors) {
		for (const parseError of error.errors) {
			process.stdout(`${ parseError.fileName }\n`);
			process.stdout(`\t${ parseError.message }\n`);
		}
		process.exit(1);
	}
	throw error;
});
