# webpack-node-version

A very simple plugin that ensures a version of node is used when compiling through webpack.  Uses semver for versioning.

<br>

#### Install

```bash
npm install --save webpack-node-version
```

<br>

#### Usage
```javascript
var RequireNodeVersion  = require('webpack-node-version');

module.exports = {
  ...
  plugins: [
    new RequireNodeVersion({
      version: '~6.1.0'
    })
  ],
  ...
}
```
