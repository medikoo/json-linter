"use strict";

const ensureString = require("es5-ext/object/validate-stringifiable-value")
    , { parse }    = require("./lib/parser");

module.exports = jsonString => parse(ensureString(jsonString));
