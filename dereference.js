#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var util = require('util');
var $RefParser = require('json-schema-ref-parser');
var argv = require('minimist')(process.argv.slice(2));

if (!argv.s || !argv.o) {
  console.log('USAGE: ' + process.argv[1] + ' -s <schema> -o <output> [...]');
  process.exit(1);
}

var input = path.resolve(argv.s);

var schema = fs.readFileSync(input, { encoding: 'utf8' });

console.log("Dereferencing schema: " + input);

$RefParser.dereference(input, function(err, schema) {
  if (err) {
    console.error(err);
  } else {
    console.log("Parsed schema");

    var output = path.resolve(argv.o);
    var ext = path.parse(output).ext;

    console.log(ext);

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
