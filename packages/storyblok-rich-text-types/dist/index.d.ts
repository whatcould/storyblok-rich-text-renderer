declare enum NodeTypes {
    DOCUMENT = "doc",
    HEADING = "heading",
    PARAGRAPH = "paragraph",
    QUOTE = "blockquote",
    OL_LIST = "ordered_list",
    UL_LIST = "bullet_list",
    LIST_ITEM = "list_item",
    CODE_BLOCK = "code_block",
    HR = "horizontal_rule",
    BR = "hard_break",
    IMAGE = "image",
    EMOJI = "emoji",
    BOLD = "bold",
    STRONG = "strong",
    STRIKE = "strike",
    UNDERLINE = "underline",
    ITALIC = "italic",
    CODE = "code",
    LINK = "link",
    ANCHOR = "anchor",
    STYLED = "styled",
    SUPERSCRIPT = "superscript",
    SUBSCRIPT = "subscript",
    TEXT_STYLE = "textStyle",
    HIGHLIGHT = "highlight",
    TEXT = "text",
    COMPONENT = "blok"
}
declare const blockNodeTypes: NodeTypes[];
interface NodeAttributes {
}
interface Node {
    type: NodeTypes;
    attrs?: NodeAttributes;
}
interface NodeWithContent extends Node {
    content?: BlockNodes[] | TextNode[];
}
interface TextNode extends Node {
    type: NodeTypes.TEXT;
    text: string;
    marks?: MarkNodes[];
}
declare type ComponentBodyShell = Record<string, any>;
interface ComponentBody extends ComponentBodyShell {
    component: string;
    _uid: string;
}
interface ComponentAttributes extends NodeAttributes {
    id: string;
    body: ComponentBody[];
}
interface ComponentNode extends Node {
    type: NodeTypes.COMPONENT;
    attrs: ComponentAttributes;
}
interface DocumentNode extends NodeWithContent {
    type: NodeTypes.DOCUMENT;
    content: RootNodes[];
}
declare type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingAttributes extends NodeAttributes {
    level: HeadingLevels;
}
interface HeadingNode extends NodeWithContent {
    type: NodeTypes.HEADING;
    content: TextNode[];
    attrs: HeadingAttributes;
}
interface ParagraphNode extends NodeWithContent {
    type: NodeTypes.PARAGRAPH;
    content: TextNode[];
}
interface ListItemNode extends NodeWithContent {
    type: NodeTypes.LIST_ITEM;
    content: ParagraphNode[];
    attrs: NodeAttributes;
}
interface OrderedListAttributes extends NodeAttributes {
    order: number;
}
interface OrderedListNode extends NodeWithContent {
    type: NodeTypes.OL_LIST;
    content: ListItemNode[];
    attrs: OrderedListAttributes;
}
interface UnorderedListNode extends NodeWithContent {
    type: NodeTypes.UL_LIST;
    content: ListItemNode[];
}
interface QuoteNode extends NodeWithContent {
    type: NodeTypes.QUOTE;
    content: ParagraphNode[];
}
interface CodeBlockAttributes extends NodeAttributes {
    class: string;
}
interface CodeBlockNode extends NodeWithContent {
    type: NodeTypes.CODE_BLOCK;
    content: TextNode[];
    attrs: CodeBlockAttributes;
}
interface HorizontalRuleNode extends Node {
    type: NodeTypes.HR;
}
interface BreakNode extends Node {
    type: NodeTypes.BR;
}
interface ImageAttributes extends NodeAttributes {
    alt: string;
    src: string;
    title: string | null;
}
interface ImageNode extends Node {
    type: NodeTypes.IMAGE;
    attrs: ImageAttributes;
}
interface EmojiAttributes extends NodeAttributes {
    name: string | null;
    emoji: string | null;
    fallbackImage: string | null;
}
interface EmojiNode extends Node {
    type: NodeTypes.EMOJI;
    attrs: EmojiAttributes;
}
interface BoldNode extends Node {
    type: NodeTypes.BOLD;
}
interface StrongNode extends Node {
    type: NodeTypes.STRONG;
}
interface StrikeNode extends Node {
    type: NodeTypes.STRIKE;
}
interface UnderlineNode extends Node {
    type: NodeTypes.UNDERLINE;
}
interface ItalicNode extends Node {
    type: NodeTypes.ITALIC;
}
interface CodeNode extends Node {
    type: NodeTypes.CODE;
}
declare enum LinkTargets {
    SELF = "_self",
    BLANK = "_blank"
}
declare enum LinkTypes {
    URL = "url",
    STORY = "story",
    ASSET = "asset",
    EMAIL = "email"
}
interface LinkAttributes {
    href: string;
    uuid: string | null;
    target: LinkTargets | null;
    linktype: LinkTypes;
    anchor: string | null;
}
interface LinkNode extends Node {
    type: NodeTypes.LINK;
    attrs: LinkAttributes;
}
interface StyledAttributes {
    class: string;
}
interface StyledNode extends Node {
    type: NodeTypes.STYLED;
    attrs: StyledAttributes;
}
interface AnchorAttributes {
    id: string;
}
interface AnchorNode extends Node {
    type: NodeTypes.ANCHOR;
    attrs: AnchorAttributes;
}
interface SuperscriptNode extends Node {
    type: NodeTypes.SUPERSCRIPT;
}
interface SubscriptNode extends Node {
    type: NodeTypes.SUBSCRIPT;
}
interface TextStyleAttributes {
    color: string | null;
}
interface TextStyleNode {
    type: NodeTypes.TEXT_STYLE;
    attrs: TextStyleAttributes;
}
interface HighlightAttributes {
    color: string | null;
}
interface HighlightNode {
    type: NodeTypes.HIGHLIGHT;
    attrs: HighlightAttributes;
}
declare type BlockNodes = DocumentNode | HeadingNode | ParagraphNode | ListItemNode | OrderedListNode | UnorderedListNode | QuoteNode | CodeBlockNode | HorizontalRuleNode | BreakNode | ImageNode | EmojiNode;
declare type MarkNodes = BoldNode | StrongNode | StrikeNode | UnderlineNode | ItalicNode | CodeNode | LinkNode | StyledNode | AnchorNode | SuperscriptNode | SubscriptNode | TextStyleNode | HighlightNode;
declare type RootNodes = HeadingNode | ParagraphNode | OrderedListNode | UnorderedListNode | QuoteNode | HorizontalRuleNode | ImageNode;
declare type BlockNodesWithContent = DocumentNode | ParagraphNode | QuoteNode | UnorderedListNode | ListItemNode;
declare type BlockNodesWithoutOptions = HorizontalRuleNode | BreakNode;
declare type BlockNodesWithAttributes = ImageNode | EmojiNode;
declare type BlockNodesWithContentAndAttributes = HeadingNode | OrderedListNode | CodeBlockNode;
declare type MarkNodesWithoutOptions = BoldNode | StrongNode | StrikeNode | UnderlineNode | ItalicNode | CodeNode | SuperscriptNode | SubscriptNode;
declare type MarkNodesWithAttributes = LinkNode | AnchorNode | StyledNode | TextStyleNode | HighlightNode;

declare function isBlockNode(node: Node): node is BlockNodes;
declare function isTextNode(node: Node): node is TextNode;
declare function isComponentNode(node: Node): node is ComponentNode;

export { AnchorAttributes, AnchorNode, BlockNodes, BlockNodesWithAttributes, BlockNodesWithContent, BlockNodesWithContentAndAttributes, BlockNodesWithoutOptions, BoldNode, BreakNode, CodeBlockAttributes, CodeBlockNode, CodeNode, ComponentAttributes, ComponentBody, ComponentBodyShell, ComponentNode, DocumentNode, EmojiAttributes, EmojiNode, HeadingAttributes, HeadingLevels, HeadingNode, HighlightAttributes, HighlightNode, HorizontalRuleNode, ImageAttributes, ImageNode, ItalicNode, LinkAttributes, LinkNode, LinkTargets, LinkTypes, ListItemNode, MarkNodes, MarkNodesWithAttributes, MarkNodesWithoutOptions, Node, NodeAttributes, NodeTypes, NodeWithContent, OrderedListAttributes, OrderedListNode, ParagraphNode, QuoteNode, RootNodes, StrikeNode, StrongNode, StyledAttributes, StyledNode, SubscriptNode, SuperscriptNode, TextNode, TextStyleAttributes, TextStyleNode, UnderlineNode, UnorderedListNode, blockNodeTypes, isBlockNode, isComponentNode, isTextNode };
