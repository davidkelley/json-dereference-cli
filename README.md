# JSON Dereference CLI

*Very* simple CLI tool that wraps the excellent [json-schema-ref-parser](https://github.com/BigstickCarpet/json-schema-ref-parser) library.

## Usage

```bash
# Using npx:
npx json-dereference-cli -s <schema> [-b <s3bucket>] [-i <spaces>] [-o <output>] [-t <type>]

# Installing globally:
npm install -g json-dereference-cli
json-dereference -s <schema> [-b <s3bucket>] [-i <spaces>] [-o <output>] [-t <type>]
```

*Note:* The input file can either be `json`, or `yaml` / `yml`.

*Note:* The output file types are either `json` or `yaml` / `yml`. This is determined from the file extension for the output file path passed in or using `-t json|yaml` when writing to stdout.

## Resolving s3 references

This CLI tool will also attempt to resolve S3 references (`$ref: "s3://.."`) using the `aws-sdk`. Take a look [here](s3-resolver.js) to see the custom resolver code.
