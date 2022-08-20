const { JsxToJson, jsonToFlutterWidget, createElement } = require("./parser");
const fs = require("fs");
const execSync = require("child_process").execSync;

function componentToWidget(content, filename) {
  const { imports, exports, body } = JsxToJson(content);
  const component = jsonToFlutterWidget(body);
  if (!exports || exports.length > 1 || exports.length == 0) {
    console.error(
      "You have to export one component : Component ComponentName extend Stateless :"
    );
    return;
  }
  const componentName = exports[0]
    .match(/Component( )*[a-zA-Z]+[a-zA-Z0-9]*/)[0]
    .split(" ")[1]
    .trim();
  const widgetType = exports[0].match(/(Stateless|Statefull)/)[0].trim();
  const widget = `${imports.join("\n")}
  
  ${
    widgetType == "Stateless"
      ? `
class ${componentName} extends StatelessWidget {
  const ${componentName}({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ${component.toString()};
  }
}
  `
    : `
class ${componentName} extends StatefulWidget {
  const ${componentName}({Key? key}) : super(key: key);

  @override
  MainState createState() => MainState();
}
class MainState extends State<${componentName}> {
  @override
  void initState() {
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {
    return ${component.toString()};
  }
}
    `
  }
    `;
  fs.writeFileSync(`${filename}.dart`, widget);
  let path = process.env.path
    .split(";")
    .filter((p) => p.includes("\\flutter\\bin"));
  path.length > 0 ? (path = path[0]) : (path = null);
  path &&
    execSync(`${path}\\flutter format "${filename}.dart"`, {
      encoding: "utf-8",
    });
  !path && console.log("Please install flutter");
}

module.exports = {
  componentToWidget,
};
