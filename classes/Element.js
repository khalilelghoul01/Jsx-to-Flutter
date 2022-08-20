const Color = {
  red: "!red",
  blue: "!blue",
  green: "!green",
  yellow: "!yellow",
  black: "!black",
};

class Element {
  constructor(type, props, ...children) {
    this.type = type;
    this.props = this.parseProps(props);
    this.children = children;
  }

  parseProps(props) {
    const result = {};
    for (const key in props) {
      let data = `const data= ${props[key].replace(/[\n\r\t]/g, "")}; data`;
      try {
        result[key] = eval(data);
      } catch (error) {
        console.error(error);
        result[key] = data;
      }
    }
    return result;
  }
}

module.exports = Element;
