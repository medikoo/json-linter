[![*nix build status][nix-build-image]][nix-build-url]
[![Windows build status][win-build-image]][win-build-url]
[![npm version][npm-image]][npm-url]

# json-lint

_Derived from [jslint-mod](https://github.com/circlecell/jsonlint-mod) by [Zach Carter](https://github.com/zaach) and [Andrey Gubanov](https://github.com/finom)_

## A JSON parser and validator

-   Confirms valid JSON format
-   Discards invalid whitespace chars
-   Errors on duplicate object keys

### Usage

```javascript
const jsonLint = require("json-linter");

const jsonObject = jsonLint(jsonString); // Throws if JSON is invalid
```

### Tests

```bash
npm test
```

[nix-build-image]: https://semaphoreci.com/api/v1/medikoo-org/json-linter/branches/master/shields_badge.svg
[nix-build-url]: https://semaphoreci.com/medikoo-org/json-linter
[win-build-image]: https://ci.appveyor.com/api/projects/status/x07py6qbye37d1gj?svg=true
[win-build-url]: https://ci.appveyor.com/project/medikoo/json-linter
[npm-image]: https://img.shields.io/npm/v/json-linter.svg
[npm-url]: https://www.npmjs.com/package/json-linter
