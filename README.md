# JSON Dereference CLI

*Very* simple CLI tool that wraps the excellent [json-schema-ref-parser](https://github.com/BigstickCarpet/json-schema-ref-parser) library.

### Usage

```
npm install -g json-dereference-cli
json-dereference -s my-schema.json -o compiled-schema.yaml
```

_Note: The input file can either be `json`, or `yaml` / `yml`._

_Note: The output file types are either `json` or `yaml` / `yml`. This is determined from the file extension for the output file path passed in._
