#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var util = require('util');
var $RefParser = require('json-schema-ref-parser');
var argv = require('minimist')(process.argv.slice(2));
var s3Resolver = require('./s3-resolver');

if (!argv.s || !argv.o) {
  console.log('USAGE: ' + process.argv[1] + ' -s <schema> -o <output> [...]');
  process.exit(1);
}

var input = path.resolve(argv.s);

var schema = fs.readFileSync(input, { encoding: 'utf8' });

console.log("Dereferencing schema: " + input);

$RefParser.dereference(input, { resolve: { s3: s3Resolver } }, function(err, schema) {
  if (err) {
    console.error(err);
  } else {
    var output = path.resolve(argv.o);
    var ext = path.parse(output).ext;

    if (ext == '.json') {
      var data = JSON.stringify(schema);
      fs.writeFileSync(output, data, { encoding: 'utf8', flag: 'w' });
    } else if (ext.match(/^\.?(yaml|yml)$/)) {
      var yaml = require('node-yaml');
      yaml.writeSync(output, schema, { encoding: 'utf8' })
    } else {
      console.error("Unrecognised output file type: " + output);
      process.exit(1);
    }
    console.log("Wrote file: " + output);
  }
});
