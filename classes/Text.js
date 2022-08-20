const Element = require("./Element");

class Text extends Element {
  constructor(props, children) {
    super("Text", {}, children);
  }

  toString() {
    return `Text("${this.children.length > 0 ? this.children[0] : ""}")`;
  }
}

module.exports = Text;
