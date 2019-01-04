#!/usr/bin/env node

"use strict";

Error.stackTraceLimit = Infinity;
process.on("unhandledRejection", reason => { throw reason; });

const { Generator } = require("jison")
    , grammar       = require("../lib/grammar");

process.stdout.write(
	new Generator(grammar, { moduleType: "commonjs", moduleName: "jsonparse" }).generate()
);
