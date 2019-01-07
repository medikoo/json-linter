"use strict";

const readFile = require("fs2/read-file")
    , lint     = require("./");

module.exports = fileName => readFile(fileName).then(lint);
