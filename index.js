const { componentToWidget } = require("./core/widget");
const fs = require("fs");
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("No file specified or distination file specified");
  process.exit(1);
}
const jsx = fs.existsSync(
  args[0].endsWith("/") ? args[0].slice(0, -2) : args[0]
)
  ? fs.readFileSync(args[0], "utf8")
  : (console.error("File not found"), process.exit(1));
const dist = args[1];
(dist && fs.existsSync(dist)) || fs.mkdirSync(dist);

componentToWidget(
  jsx,
  dist + "/" + args[0].replace(/^.*[\\\/]/, "").replace(".jsx", "")
);
