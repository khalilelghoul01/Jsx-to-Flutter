const fs = require('fs');
const jsx2json = require('jsx2json');

const importRegex = /import( )*[^\n]*\n/g;
const exportComponent =
  /('|")Component( )*[a-zA-Z]+[a-zA-Z0-9]*( )*extend( )*(Statefull|Stateless)( )*:('|")( )*(;)?( )*/g;

const classesDir = 'classes';
const classesImport = {};
const classes = fs.readdirSync(classesDir);

function JsxToJson(jsx) {
  const imports = jsx.match(importRegex);
  const exports = jsx.match(exportComponent);
  jsx = jsx.replace(importRegex, '');
  jsx = jsx.replace(exportComponent, '');
  const json = jsx2json(jsx);
  if (json instanceof Array) {
    if (json.length > 1) {
      console.error(
        'Multiple root elements are not supported; only the first element will be returned'
      );
      return { imports: imports || [], exports: exports || [], body: json[0] };
    }
  }
  return { imports: imports || [], exports: exports || [], body: json };
}

function jsonToFlutterWidget(json) {
  if (json instanceof Object) {
    const { children, type, props } = json;
    return createElement(type, props, ...children.map(jsonToFlutterWidget));
  }
  return json;
}

function createElement(type, props, ...children) {
  if (classes.includes(`${type}.js`)) {
    if (!classesImport[type]) {
      classesImport[type] = require(`../${classesDir}/${type}.js`);
      return new classesImport[type](props, ...children);
    }
    return new classesImport[type](props, ...children);
  }
}

module.exports = {
  JsxToJson,
  jsonToFlutterWidget,
  createElement,
};
