const Element = require("./Element");

const optionsMapping = {
  decoration: "BoxDecoration",
  color: "Color",
  backgroundColor: "Color",
};

class Container extends Element {
  constructor(props, ...children) {
    super("Container", props, ...children);
  }
  toString() {
    const { padding, margin } = this.props;
    let paddingFluter = "";
    let marginFluter = "";
    if (padding) {
      paddingFluter =
        typeof padding === "number"
          ? `\npadding: const EdgeInsets.all(${padding}),`
          : `
             ${
               !padding.horizontal && !padding.vertical
                 ? `\npadding: const EdgeInsets.only(${
                     padding.top ? "top:" + padding.top + "," : ""
                   }${padding.bottom ? "bottom:" + padding.bottom + "," : ""}${
                     padding.left ? "left:" + padding.left + "," : ""
                   }${padding.right ? "right:" + padding.right + "," : ""}),`
                 : `\npadding: const EdgeInsets.symmetric(${
                     padding.horizontal
                       ? "horizontal:" + padding.horizontal + ","
                       : ""
                   }${padding.vertical ? "vertical:" + padding.vertical : ""}),`
             }`;
    }
    if (margin) {
      marginFluter =
        typeof margin === "number"
          ? `margin: const EdgeInsets.all(${margin}),`
          : `
             ${
               !margin.horizontal && !margin.vertical
                 ? `margin: const EdgeInsets.only(${
                     margin.top ? "top:" + margin.top + "," : ""
                   }${margin.bottom ? "bottom:" + margin.bottom + "," : ""}${
                     margin.left ? "left:" + margin.left + "," : ""
                   }${margin.right ? "right:" + margin.right + "," : ""}),`
                 : `\nmargin: const EdgeInsets.symmetric(${
                     margin.horizontal
                       ? "horizontal:" + margin.horizontal + ","
                       : ""
                   }${margin.vertical ? "vertical:" + margin.vertical : ""}),`
             }`;
    }
    const sizeProps = {
      width: this.props.width,
      height: this.props.height,
      decoration: this.props.decoration,
    };
    const sizePropsParsing = (sizeProps) =>
      Object.entries(sizeProps)
        .map((data) => {
          const [key, value] = data;
          // console.log("obj",key, value);
          if (!value) return "";
          if (typeof value === "number") {
            return optionsMapping[key]
              ? `${key}:${optionsMapping[key]}(${value})`
              : `${key}:${value}`;
          }
          if (typeof value === "string") {
            if (value.startsWith("!") && optionsMapping[key]) {
              return `${key}:${optionsMapping[key]}.${value.replace("!", "")}`;
            }
            return optionsMapping[key]
              ? `${key}:${optionsMapping[key]}("${value}")`
              : `${key}:"${value}"`;
          }
          if (typeof value === "boolean") {
            return optionsMapping[key]
              ? `${key}:${optionsMapping[key]}(${value})`
              : `${key}:${value}`;
          }
          if (value instanceof Array) {
            return "";
          }
          if (value instanceof Object) {
            return optionsMapping[key]
              ? `${key}:${optionsMapping[key]}(${sizePropsParsing(value)})`
              : `${key}:${sizePropsParsing(value)}`;
          }
          return value;
        })
        .filter((value) => value !== "")
        .join(",");
    const sizePropsParsed = sizePropsParsing(sizeProps);
    // console.log("sizePropsParsed",sizePropsParsed);
    return this.children.length > 0
      ? `Container(${paddingFluter}${marginFluter}\nchild:${this.children[0]},${sizePropsParsed})`
      : "Container()";
  }
}

module.exports = Container;
