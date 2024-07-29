var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  LinkTargets: () => LinkTargets,
  LinkTypes: () => LinkTypes,
  NodeTypes: () => NodeTypes,
  blockNodeTypes: () => blockNodeTypes,
  isBlockNode: () => isBlockNode,
  isComponentNode: () => isComponentNode,
  isTextNode: () => isTextNode
});

// src/nodes.ts
var NodeTypes = /* @__PURE__ */ ((NodeTypes2) => {
  NodeTypes2["DOCUMENT"] = "doc";
  NodeTypes2["HEADING"] = "heading";
  NodeTypes2["PARAGRAPH"] = "paragraph";
  NodeTypes2["QUOTE"] = "blockquote";
  NodeTypes2["OL_LIST"] = "ordered_list";
  NodeTypes2["UL_LIST"] = "bullet_list";
  NodeTypes2["LIST_ITEM"] = "list_item";
  NodeTypes2["CODE_BLOCK"] = "code_block";
  NodeTypes2["HR"] = "horizontal_rule";
  NodeTypes2["BR"] = "hard_break";
  NodeTypes2["IMAGE"] = "image";
  NodeTypes2["EMOJI"] = "emoji";
  NodeTypes2["BOLD"] = "bold";
  NodeTypes2["STRONG"] = "strong";
  NodeTypes2["STRIKE"] = "strike";
  NodeTypes2["UNDERLINE"] = "underline";
  NodeTypes2["ITALIC"] = "italic";
  NodeTypes2["CODE"] = "code";
  NodeTypes2["LINK"] = "link";
  NodeTypes2["ANCHOR"] = "anchor";
  NodeTypes2["STYLED"] = "styled";
  NodeTypes2["SUPERSCRIPT"] = "superscript";
  NodeTypes2["SUBSCRIPT"] = "subscript";
  NodeTypes2["TEXT_STYLE"] = "textStyle";
  NodeTypes2["HIGHLIGHT"] = "highlight";
  NodeTypes2["TEXT"] = "text";
  NodeTypes2["COMPONENT"] = "blok";
  return NodeTypes2;
})(NodeTypes || {});
var blockNodeTypes = [
  "doc" /* DOCUMENT */,
  "heading" /* HEADING */,
  "paragraph" /* PARAGRAPH */,
  "blockquote" /* QUOTE */,
  "ordered_list" /* OL_LIST */,
  "bullet_list" /* UL_LIST */,
  "list_item" /* LIST_ITEM */,
  "code_block" /* CODE_BLOCK */,
  "horizontal_rule" /* HR */,
  "hard_break" /* BR */,
  "image" /* IMAGE */,
  "emoji" /* EMOJI */
];
var LinkTargets = /* @__PURE__ */ ((LinkTargets2) => {
  LinkTargets2["SELF"] = "_self";
  LinkTargets2["BLANK"] = "_blank";
  return LinkTargets2;
})(LinkTargets || {});
var LinkTypes = /* @__PURE__ */ ((LinkTypes2) => {
  LinkTypes2["URL"] = "url";
  LinkTypes2["STORY"] = "story";
  LinkTypes2["ASSET"] = "asset";
  LinkTypes2["EMAIL"] = "email";
  return LinkTypes2;
})(LinkTypes || {});

// src/utils.ts
function isBlockNode(node) {
  return blockNodeTypes.includes(node.type);
}
function isTextNode(node) {
  return node.type === "text" /* TEXT */;
}
function isComponentNode(node) {
  return node.type === "blok" /* COMPONENT */;
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LinkTargets,
  LinkTypes,
  NodeTypes,
  blockNodeTypes,
  isBlockNode,
  isComponentNode,
  isTextNode
});
