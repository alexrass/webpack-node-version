'use strict';

var chalk = require('chalk');
var semver = require('semver');

function Plugin(options) {
  options = options || {};

  if (!options.version) {
    var e = new Error();
    e.stack = 'Missing required parameter (version)';
    throw e;
  }

  this.options = options;
}

function NodeVersionFailure() {
  this.name = 'NodeVersionFailure';
  this.message = chalk.red([
    'Invalid node version found.',
    'Version ' + arguments[0] + ' required.',
    'Version ' + arguments[1] + ' found.',
  ].join('\n'));
  this.stack = this.message;
}
NodeVersionFailure.prototype = Object.create(Error.prototype, {
  constructur: {
    value: NodeVersionFailure,
    writable: true,
    configurable: true,
  }
});

Plugin.prototype.apply = function(compiler) {
  var versionRange = semver.validRange(this.options.version);
  var nodeVersion = semver.valid(process.version);
  var validVersion = semver.satisfies(nodeVersion, versionRange);

  if (!validVersion) {
    var e = new NodeVersionFailure(versionRange, nodeVersion);
    throw e;
  }
};

module.exports = Plugin;
