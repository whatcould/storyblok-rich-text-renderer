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
export {
  LinkTargets,
  LinkTypes,
  NodeTypes,
  blockNodeTypes,
  isBlockNode,
  isComponentNode,
  isTextNode
};
