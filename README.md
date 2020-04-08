[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40jeltemx%2Fmendix-react-widget-utils.svg)](https://www.npmjs.com/package/@jeltemx/mendix-react-widget-utils)
[![Dependencies](https://david-dm.org/JelteMX/mendix-react-widget-utils.svg)](https://david-dm.org/JelteMX/mendix-react-widget-utils)
[![DevDependencies](https://david-dm.org/JelteMX/mendix-react-widget-utils/dev-status.svg)](https://david-dm.org/JelteMX/mendix-react-widget-utils?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/JelteMX/mendix-react-widget-utils)](https://github.com/JelteMX/mendix-react-widget-utils/issues)

# Mendix (React) Widget Utils

Makes building widgets a little easier by providing a couple of convenient methods & helper functions. This is tied to Typescript development of widgets. All methods & classes have been properly described, so your code editor (VSCode preferred) should give you code completion, type checking and proper comments.

## Usage

```ts
import { createObject } from "@jeltemx/mendix-react-widget-utils";

const mendixObject = await createObject("MyFirstModule.Entity");
```

## License

MIT
