"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var storyblokRichTextTypes = require("@marvr/storyblok-rich-text-types");
const componentResolvers = {
  button1: ({ _uid, id, component, fields }) => vue.h("div", { _uid, id, component }, fields.title)
};
const defaultResolvers = {
  [storyblokRichTextTypes.NodeTypes.DOCUMENT]: ({ children }) => children,
  [storyblokRichTextTypes.NodeTypes.HEADING]: ({ children, attrs }) => vue.h(`h${attrs.level}`, children),
  [storyblokRichTextTypes.NodeTypes.PARAGRAPH]: ({ children }) => vue.h("p", children),
  [storyblokRichTextTypes.NodeTypes.QUOTE]: ({ children }) => vue.h("blockquote", children),
  [storyblokRichTextTypes.NodeTypes.OL_LIST]: ({ children }) => vue.h("ol", children),
  [storyblokRichTextTypes.NodeTypes.UL_LIST]: ({ children }) => vue.h("ul", children),
  [storyblokRichTextTypes.NodeTypes.LIST_ITEM]: ({ children }) => vue.h("li", children),
  [storyblokRichTextTypes.NodeTypes.CODE_BLOCK]: ({ children, attrs }) => vue.h("pre", attrs, children),
  [storyblokRichTextTypes.NodeTypes.HR]: () => vue.h("hr"),
  [storyblokRichTextTypes.NodeTypes.BR]: () => vue.h("br"),
  [storyblokRichTextTypes.NodeTypes.IMAGE]: ({ attrs }) => vue.h("img", attrs),
  [storyblokRichTextTypes.NodeTypes.EMOJI]: ({ attrs }) => {
    const props = {
      "data-type": "emoji",
      "data-name": attrs.name,
      emoji: attrs.emoji
    };
    const fallbackProps = {
      src: attrs.fallbackImage,
      draggable: "false",
      loading: "lazy",
      align: "absmiddle",
      alt: attrs.name,
      style: `height: 1em; width: 1em;`,
      height: 16,
      width: 16
    };
    const fallback = vue.h("img", fallbackProps);
    return vue.h("span", props, attrs.emoji || fallback);
  },
  [storyblokRichTextTypes.NodeTypes.BOLD]: ({ text }) => vue.h("b", text),
  [storyblokRichTextTypes.NodeTypes.STRONG]: ({ text }) => vue.h("strong", text),
  [storyblokRichTextTypes.NodeTypes.STRIKE]: ({ text }) => vue.h("s", text),
  [storyblokRichTextTypes.NodeTypes.UNDERLINE]: ({ text }) => vue.h("u", text),
  [storyblokRichTextTypes.NodeTypes.ITALIC]: ({ text }) => vue.h("i", text),
  [storyblokRichTextTypes.NodeTypes.CODE]: ({ text }) => vue.h("code", text),
  [storyblokRichTextTypes.NodeTypes.LINK]: ({ text, attrs }) => {
    let href = "";
    switch (attrs.linktype) {
      case storyblokRichTextTypes.LinkTypes.ASSET:
      case storyblokRichTextTypes.LinkTypes.URL:
        href = attrs.href;
        break;
      case storyblokRichTextTypes.LinkTypes.EMAIL:
        href = `mailto:${attrs.href}`;
        break;
      case storyblokRichTextTypes.LinkTypes.STORY: {
        const RouterLink = getRouterLinkComponent();
        if (!RouterLink)
          return vue.h("a", { href, target: attrs.target }, text);
        return vue.h(RouterLink, { to: attrs.href, target: attrs.target }, { default: () => text });
      }
    }
    return vue.h("a", { href: attrs.href, target: attrs.target }, text);
  },
  [storyblokRichTextTypes.NodeTypes.ANCHOR]: ({ text, attrs }) => vue.h("span", attrs, text),
  [storyblokRichTextTypes.NodeTypes.SUPERSCRIPT]: ({ text }) => vue.h("sup", text),
  [storyblokRichTextTypes.NodeTypes.SUBSCRIPT]: ({ text }) => vue.h("sub", text),
  [storyblokRichTextTypes.NodeTypes.STYLED]: ({ text, attrs }) => vue.h("span", attrs, text),
  [storyblokRichTextTypes.NodeTypes.TEXT_STYLE]: ({ text, attrs }) => vue.h("span", { style: attrs.color ? `color: ${attrs.color};` : void 0 }, text),
  [storyblokRichTextTypes.NodeTypes.HIGHLIGHT]: ({ text, attrs }) => vue.h("mark", {
    style: attrs.color ? `background-color: ${attrs.color};` : void 0
  }, text),
  [storyblokRichTextTypes.NodeTypes.COMPONENT]: () => vue.h("div", "fallback: component is not handled")
};
function getRouterLinkComponent() {
  const component = vue.resolveDynamicComponent("RouterLink");
  return typeof component === "string" ? false : component;
}
function createRenderer(options) {
  const {
    resolvers = (options == null ? void 0 : options.resolvers) || __spreadProps(__spreadValues({}, defaultResolvers), { components: {} }),
    omitParagraphInListItems = false
  } = options || {};
  const renderNode = (node) => {
    if (storyblokRichTextTypes.isTextNode(node)) {
      if (!node.marks)
        return renderTextNode(node);
      return node.marks.reduce((text, mark) => renderMarkNode(mark, text), renderTextNode(node));
    } else if (storyblokRichTextTypes.isBlockNode(node)) {
      return renderBlockNode(node);
    } else if (storyblokRichTextTypes.isComponentNode(node)) {
      return renderComponentNode(node);
    }
    return vue.h("span", `fallback: the node "${node.type}" is not handled`);
  };
  const renderNodeList = (nodes) => {
    const nodeList = [];
    nodes.forEach((node) => {
      const renderedNode = renderNode(node);
      if (Array.isArray(renderedNode)) {
        renderedNode.forEach((childNode) => {
          nodeList.push(childNode);
        });
      } else {
        nodeList.push(renderedNode);
      }
    });
    return nodeList;
  };
  function renderBlockNode(node) {
    switch (node.type) {
      case storyblokRichTextTypes.NodeTypes.DOCUMENT:
      case storyblokRichTextTypes.NodeTypes.PARAGRAPH:
      case storyblokRichTextTypes.NodeTypes.QUOTE:
      case storyblokRichTextTypes.NodeTypes.UL_LIST:
      case storyblokRichTextTypes.NodeTypes.LIST_ITEM:
        return resolveBlockNodeWithContent(node);
      case storyblokRichTextTypes.NodeTypes.HEADING:
      case storyblokRichTextTypes.NodeTypes.OL_LIST:
      case storyblokRichTextTypes.NodeTypes.CODE_BLOCK:
        return resolveBlockNodeWithContentAndAttributes(node);
      case storyblokRichTextTypes.NodeTypes.HR:
      case storyblokRichTextTypes.NodeTypes.BR:
        return resolveBlockNodeWithoutOptions(node);
      case storyblokRichTextTypes.NodeTypes.IMAGE:
      case storyblokRichTextTypes.NodeTypes.EMOJI:
        return resolveBlockNodeWithAttributes(node);
      default:
        return vue.h("span", `fallback: block "${node.type}" is not handled`);
    }
  }
  function renderMarkNode(node, text) {
    switch (node.type) {
      case storyblokRichTextTypes.NodeTypes.BOLD:
      case storyblokRichTextTypes.NodeTypes.STRONG:
      case storyblokRichTextTypes.NodeTypes.STRIKE:
      case storyblokRichTextTypes.NodeTypes.UNDERLINE:
      case storyblokRichTextTypes.NodeTypes.ITALIC:
      case storyblokRichTextTypes.NodeTypes.CODE:
      case storyblokRichTextTypes.NodeTypes.SUPERSCRIPT:
      case storyblokRichTextTypes.NodeTypes.SUBSCRIPT:
        return resolveMarkNode(node, text);
      case storyblokRichTextTypes.NodeTypes.LINK:
      case storyblokRichTextTypes.NodeTypes.ANCHOR:
      case storyblokRichTextTypes.NodeTypes.STYLED:
      case storyblokRichTextTypes.NodeTypes.TEXT_STYLE:
      case storyblokRichTextTypes.NodeTypes.HIGHLIGHT:
        return resolveMarkNodeWithAttributes(node, text);
      default:
        return vue.h("span", `fallback: the mark "${node.type}" is not handled`);
    }
  }
  function renderComponentNode(node) {
    const components = [];
    node.attrs.body.forEach((body) => {
      const { component } = body;
      const resolver = resolvers.components[component];
      if (resolver) {
        components.push(vue.h(resolver, { props: body }));
      } else {
        components.push(resolvers[storyblokRichTextTypes.NodeTypes.COMPONENT]());
      }
    });
    return components;
  }
  function renderTextNode(node) {
    return vue.createTextVNode(node.text);
  }
  const renderChildren = (node) => node.content && node.content.length ? renderNodeList(node.content) : [];
  function resolveBlockNodeWithContent(node) {
    const resolver = resolvers[node.type];
    let children = renderChildren(node);
    if (omitParagraphInListItems && node.type === storyblokRichTextTypes.NodeTypes.LIST_ITEM && node.content.length === 1 && node.content[0].content) {
      children = renderNodeList(node.content[0].content);
    }
    if (isComponentResolver(resolver))
      return vue.h(resolver, null, { default: () => children });
    return resolver({ children });
  }
  function resolveBlockNodeWithAttributes(node) {
    const resolver = resolvers[node.type];
    if (isComponentResolver(resolver))
      return vue.h(resolver, node.attrs);
    return resolver({ attrs: node.attrs });
  }
  function resolveBlockNodeWithContentAndAttributes(node) {
    const resolver = resolvers[node.type];
    const children = renderChildren(node);
    if (isComponentResolver(resolver))
      return vue.h(resolver, node.attrs, { default: () => children });
    return resolver({
      children,
      attrs: node.attrs
    });
  }
  function resolveBlockNodeWithoutOptions(node) {
    const resolver = resolvers[node.type];
    if (isComponentResolver(resolver))
      return vue.h(resolver);
    return resolver();
  }
  function resolveMarkNode(node, text) {
    const resolver = resolvers[node.type];
    if (isComponentResolver(resolver))
      return vue.h(resolver, { default: () => text });
    return resolver({ text });
  }
  function resolveMarkNodeWithAttributes(node, text) {
    const resolver = resolvers[node.type];
    if (isComponentResolver(resolver))
      return vue.h(resolver, node.attrs, { default: () => text });
    return resolver({ text, attrs: node.attrs });
  }
  const renderDocument = (node) => {
    if (Array.isArray(node))
      return renderNodeList(node);
    return renderNode(node);
  };
  return { renderDocument };
}
function isComponentResolver(resolver) {
  return typeof resolver !== "function" && !vue.isVNode(resolver);
}
var RichTextRenderer = vue.defineComponent({
  name: "RichTextRenderer",
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const renderer = useRenderer();
    return () => renderer.renderDocument(props.document);
  }
});
const key = Symbol("Rich Text Renderer");
const plugin = (options) => ({
  install(app) {
    const renderer = createRenderer(options);
    app.provide(key, renderer);
  }
});
function useRenderer() {
  const renderer = vue.inject(key);
  if (!renderer)
    throw new Error("Rich Text Renderer not provided.");
  return renderer;
}
function defineResolvers(resolvers) {
  const _a = resolvers, { components = {} } = _a, rest = __objRest(_a, ["components"]);
  return __spreadValues(__spreadProps(__spreadValues({}, defaultResolvers), { components }), rest);
}
exports.RichTextRenderer = RichTextRenderer;
exports.componentResolvers = componentResolvers;
exports.createRenderer = createRenderer;
exports.defaultResolvers = defaultResolvers;
exports.defineResolvers = defineResolvers;
exports.getRouterLinkComponent = getRouterLinkComponent;
exports.isComponentResolver = isComponentResolver;
exports.plugin = plugin;
exports.useRenderer = useRenderer;
