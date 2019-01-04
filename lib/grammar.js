"use strict";

// An altered version of
// https://github.com/circlecell/jsonlint-mod/tree/ac1eae7734ab3b340978be9ea49a41285aac524b/src
//
// Differrences:
// - Rejects invalid whitespace
// - Rejects duplicate properties

module.exports = {
	comment: "ECMA-262 5th Edition, 15.12.1 The JSON Grammar. Parses JSON strings into objects.",
	author: "Zach Carter & Mariusz Nowak",

	lex: {
		macros: { frac: "\\.[0-9]+", exp: "[eE][-+]?[0-9]+", int: "-?([0-9]|[1-9][0-9]+)" },
		rules: [
			["[ \\t\\n\\r]+", "/* skip whitespace */"],
			["{int}{frac}?{exp}?\\b", "return 'NUMBER'"],
			[
				"\"(?:\\\\[\\\\\"bfnrt/]|\\\\u[a-fA-F0-9]{4}|[^\\\\\\0-\\x09\\x0a-\\x1f\"])*\"",
				"yytext = yytext.substr(1,yyleng-2); return 'STRING'"
			],
			["\\{", "return '{'"], ["\\}", "return '}'"], ["\\[", "return '['"],
			["\\]", "return ']'"], [",", "return ','"], [":", "return ':'"],
			["true\\b", "return 'TRUE'"], ["false\\b", "return 'FALSE'"],
			["null\\b", "return 'NULL'"], ["$", "return 'EOF'"], [".", "return 'INVALID'"]
		],
		moduleInclude: "\n\n"
	},

	start: "JSONText",

	bnf: {
		JSONString: [
			[
				"STRING",
				`// replace escaped characters with actual character
				$$ = yytext.replace(/\\\\(\\\\|")/g, "$"+"1")
					.replace(/\\\\n/g,'\\n')
					.replace(/\\\\r/g,'\\r')
					.replace(/\\\\t/g,'\\t')
					.replace(/\\\\v/g,'\\v')
					.replace(/\\\\f/g,'\\f')
					.replace(/\\\\b/g,'\\b');
					`
			]
		],
		JSONNumber: [["NUMBER", "$$ = Number(yytext);"]],
		JSONNullLiteral: [["NULL", "$$ = null;"]],
		JSONBooleanLiteral: [["TRUE", "$$ = true;"], ["FALSE", "$$ = false;"]],
		JSONText: [["JSONValue EOF", "return $$ = $1;"]],
		JSONValue: [
			"JSONNullLiteral", "JSONBooleanLiteral", "JSONString", "JSONNumber", "JSONObject",
			"JSONArray"
		],
		JSONObject: [["{ }", "$$ = {};"], ["{ JSONMemberList }", "$$ = $2;"]],
		JSONMember: [["JSONString : JSONValue", "$$ = [$1, $3];"]],
		JSONMemberList: [
			["JSONMember", "$$ = {}; $$[$1[0]] = $1[1];"],
			[
				"JSONMemberList , JSONMember",
				`
			$$ = $1;
			if ($$.hasOwnProperty($3[0])) {
				yy.parser.parseError("Parse error on line " + (yylineno + 1) +
					": Duplicate property key " + JSON.stringify($3[0]), {});
			}
			$1[$3[0]] = $3[1];
			`
			]
		],
		JSONArray: [["[ ]", "$$ = [];"], ["[ JSONElementList ]", "$$ = $2;"]],
		JSONElementList: [
			["JSONValue", "$$ = [$1];"], ["JSONElementList , JSONValue", "$$ = $1; $1.push($3);"]
		]
	}
};
