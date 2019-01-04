// A copy of tests at
// https://github.com/circlecell/jsonlint-mod/tree/ac1eae7734ab3b340978be9ea49a41285aac524b/test
// Author: Zach Carter

"use strict";

const { resolve } = require("path")
    , fs          = require("fs")
    , assert      = require("assert")
    , parse       = require("..");

exports["test object"] = function () {
	const json = "{\"foo\": \"bar\"}";
	assert.deepEqual(parse(json), { foo: "bar" });
};

exports["test escaped backslash"] = function () {
	const json = "{\"foo\": \"\\\\\"}";
	assert.deepEqual(parse(json), { foo: "\\" });
};

exports["test escaped chars"] = function () {
	const json = "{\"foo\": \"\\\\\\\"\"}";
	assert.deepEqual(parse(json), { foo: "\\\"" });
};

exports["test escaped \\n"] = function () {
	const json = "{\"foo\": \"\\\\\\n\"}";
	assert.deepEqual(parse(json), { foo: "\\\n" });
};

exports["test string with escaped line break"] = function () {
	const json = "{\"foo\": \"bar\\nbar\"}";
	assert.deepEqual(parse(json), { foo: "bar\nbar" });
	assert.equal(JSON.stringify(parse(json)).length, 18);
};

exports["test string with line break"] = function () {
	const json = "{\"foo\": \"bar\nbar\"}";
	assert.throws(() => parse(json), "should throw error");
};

exports["test string literal"] = function () {
	const json = "\"foo\"";
	assert.equal(parse(json), "foo");
};

exports["test number literal"] = function () {
	const json = "1234";
	assert.equal(parse(json), 1234);
};

exports["test null literal"] = function () {
	const json = "1234";
	assert.equal(parse(json), 1234);
};

exports["test boolean literal"] = function () {
	const json = "true";
	assert.equal(parse(json), true);
};

exports["test unclosed array"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/2.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test unquotedkey keys must be quoted"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/3.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test extra comma"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/4.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test double extra comma"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/5.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test missing value"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/6.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test comma after the close"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/7.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test extra close"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/8.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test extra comma after value"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/9.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test extra value after close with misplaced quotes"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/10.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test illegal expression addition"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/11.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test illegal invocation of alert"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/12.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test numbers cannot have leading zeroes"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/13.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test numbers cannot be hex"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/14.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test illegal backslash escape \\0"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/15.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test unquoted text"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/16.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test illegal backslash escape \\x"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/17.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test missing colon"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/19.json"));
	assert.throws(() => parse(json), "should throw error");
};

exports["test double colon"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/20.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test comma instead of colon"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/21.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test colon instead of comma"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/22.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test bad raw value"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/23.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test single quotes"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/24.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test tab character in string"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/25.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test tab character in string 2"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/26.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test line break in string"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/27.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test line break in string in array"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/28.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test 0e"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/29.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test 0e+"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/30.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test 0e+ 1"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/31.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test comma instead of closing brace"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/32.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test bracket mismatch"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/33.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test extra brace"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/34.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test hidden characters"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/35.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test key duplicates"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "fails/36.json")).toString();
	assert.throws(() => parse(json), "should throw error");
};

exports["test pass-1"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "passes/1.json")).toString();
	assert.doesNotThrow(() => parse(json), "should pass");
};

exports["test pass-2"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "passes/2.json")).toString();
	assert.doesNotThrow(() => parse(json), "should pass");
};

exports["test pass-3"] = function () {
	const json = fs.readFileSync(resolve(__dirname, "passes/3.json")).toString();
	assert.doesNotThrow(() => parse(json), "should pass");
};

Object.keys(exports).forEach(testName => exports[testName]());
