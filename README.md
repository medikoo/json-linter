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

    $ npm test
