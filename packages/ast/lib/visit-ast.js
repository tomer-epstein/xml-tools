const { isFunction } = require("lodash");
const { forEach, curry } = require("ramda");
const { getAstChildrenReflective } = require("./utils");

/**
 * @param {XMLAstVisitor} visitor
 * @param {XMLAstNode} node
 *
 * @returns {void}
 */
const accept = curry((visitor, node) => {
  switch (node.type) {
    case "XMLDocument": {
      if (isFunction(visitor.visitXMLDocument)) {
        visitor.visitXMLDocument(node);
      }
      break;
    }
    case "XMLProlog": {
      if (isFunction(visitor.visitXMLProlog)) {
        visitor.visitXMLProlog(node);
      }
      break;
    }
    case "XMLElement": {
      if (isFunction(visitor.visitXMLElement)) {
        visitor.visitXMLElement(node);
      }
      break;
    }
    case "XMLAttribute": {
      if (isFunction(visitor.visitXMLAttribute)) {
        visitor.visitXMLAttribute(node);
      }
      break;
    }
    case "XMLTextContent": {
      if (isFunction(visitor.visitXMLTextContent)) {
        visitor.visitXMLTextContent(node);
      }
      break;
    }
    /* istanbul ignore next  defensive programming */
    default:
      throw Error("None Exhaustive Match");
  }

  const astChildren = getAstChildrenReflective(node);
  forEach(accept(visitor), astChildren);
});

module.exports = {
  accept: accept
};
