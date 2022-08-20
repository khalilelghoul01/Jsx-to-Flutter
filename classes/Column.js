const Element = require("./Element");

class Column extends Element {
  constructor(props, ...children) {
    super("Column", props, ...children);
  }
  toString() {
    return `Column(children: [${this.children
      .map((child) => child.toString())
      .join(",")}])`;
  }
}

module.exports = Column;
