import * as vue from 'vue';
import { h, DefineComponent, VNode, PropType, Plugin } from 'vue';
import { NodeAttributes, NodeTypes, HeadingAttributes, OrderedListAttributes, CodeBlockAttributes, ImageAttributes, EmojiAttributes, LinkAttributes, AnchorAttributes, StyledAttributes, TextStyleAttributes, HighlightAttributes, Node, DocumentNode } from '@marvr/storyblok-rich-text-types';

declare type RenderedNode = ReturnType<typeof h>;
declare type Component = DefineComponent<{}, {}, any>;
declare type BlockResolverFunction = () => RenderedNode | RenderedNode[];
declare type BlockResolverFunctionWithOptions<O extends Record<string, any>> = (options: O) => RenderedNode | RenderedNode[];
declare type BlockResolver = Component | BlockResolverFunction;
declare type BlockResolverWithChildren = Component | BlockResolverFunctionWithOptions<{
    children: RenderedNode[];
}>;
declare type BlockResolverWithAttributes<A extends NodeAttributes> = Component | BlockResolverFunctionWithOptions<{
    attrs: A;
}>;
declare type BlockResolverWithChildrenAndAttributes<A extends NodeAttributes> = Component | BlockResolverFunctionWithOptions<{
    children: RenderedNode[];
    attrs: A;
}>;
declare type MarkResolverFunction = (options: {
    text: VNode;
}) => RenderedNode;
declare type MarkResolverFunctionWithAttributes<A extends NodeAttributes> = (options: {
    text: VNode;
    attrs: A;
}) => RenderedNode;
declare type MarkResolver = Component | MarkResolverFunction;
declare type MarkResolverWithAttributes<A extends NodeAttributes> = Component | MarkResolverFunctionWithAttributes<A>;
declare type ComponentFields = Record<string, any>;
interface ComponentOptions {
    id: string;
    _uid: string;
    component: string;
    fields: Record<string, any>;
}
declare type ComponentResolverFunction = (options: ComponentOptions) => RenderedNode;
declare type ComponentResolvers = Record<string, ComponentResolverFunction>;
declare const componentResolvers: ComponentResolvers;
interface Resolvers {
    [NodeTypes.DOCUMENT]: BlockResolverWithChildren;
    [NodeTypes.HEADING]: BlockResolverWithChildrenAndAttributes<HeadingAttributes>;
    [NodeTypes.PARAGRAPH]: BlockResolverWithChildren;
    [NodeTypes.QUOTE]: BlockResolverWithChildren;
    [NodeTypes.OL_LIST]: BlockResolverWithChildrenAndAttributes<OrderedListAttributes>;
    [NodeTypes.UL_LIST]: BlockResolverWithChildren;
    [NodeTypes.LIST_ITEM]: BlockResolverWithChildren;
    [NodeTypes.CODE_BLOCK]: BlockResolverWithChildrenAndAttributes<CodeBlockAttributes>;
    [NodeTypes.HR]: BlockResolver;
    [NodeTypes.BR]: BlockResolver;
    [NodeTypes.IMAGE]: BlockResolverWithAttributes<ImageAttributes>;
    [NodeTypes.EMOJI]: BlockResolverWithAttributes<EmojiAttributes>;
    [NodeTypes.BOLD]: MarkResolver;
    [NodeTypes.STRONG]: MarkResolver;
    [NodeTypes.STRIKE]: MarkResolver;
    [NodeTypes.UNDERLINE]: MarkResolver;
    [NodeTypes.ITALIC]: MarkResolver;
    [NodeTypes.CODE]: MarkResolver;
    [NodeTypes.LINK]: MarkResolverWithAttributes<LinkAttributes>;
    [NodeTypes.ANCHOR]: MarkResolverWithAttributes<AnchorAttributes>;
    [NodeTypes.SUPERSCRIPT]: MarkResolver;
    [NodeTypes.SUBSCRIPT]: MarkResolver;
    [NodeTypes.STYLED]: MarkResolverWithAttributes<StyledAttributes>;
    [NodeTypes.TEXT_STYLE]: MarkResolverWithAttributes<TextStyleAttributes>;
    [NodeTypes.HIGHLIGHT]: MarkResolverWithAttributes<HighlightAttributes>;
    [NodeTypes.COMPONENT]: () => RenderedNode;
}
declare const defaultResolvers: Resolvers;
declare function getRouterLinkComponent(): false | Component;

declare type ResolversOption = Resolvers & {
    components?: ComponentResolvers;
};
declare type MergedResolvers = Required<ResolversOption>;
interface RendererOptions {
    resolvers: MergedResolvers;
    omitParagraphInListItems?: boolean;
}
declare function createRenderer(options?: Partial<RendererOptions>): {
    renderDocument: (node: Node) => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
};
declare function isComponentResolver(resolver: Resolvers[keyof Resolvers]): resolver is Component;

declare const _default: vue.DefineComponent<{
    document: {
        type: PropType<DocumentNode>;
        required: true;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}> | vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[], unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    document: {
        type: PropType<DocumentNode>;
        required: true;
    };
}>>, {}>;
//# sourceMappingURL=RichTextRenderer.d.ts.map

declare const plugin: (options?: Partial<RendererOptions> | undefined) => Plugin;
declare function useRenderer(): ReturnType<typeof createRenderer>;
declare function defineResolvers(resolvers: Partial<ResolversOption>): MergedResolvers;

export { BlockResolver, BlockResolverFunction, BlockResolverFunctionWithOptions, BlockResolverWithAttributes, BlockResolverWithChildren, BlockResolverWithChildrenAndAttributes, Component, ComponentFields, ComponentOptions, ComponentResolverFunction, ComponentResolvers, MarkResolver, MarkResolverFunction, MarkResolverFunctionWithAttributes, MarkResolverWithAttributes, MergedResolvers, RenderedNode, RendererOptions, Resolvers, ResolversOption, _default as RichTextRenderer, componentResolvers, createRenderer, defaultResolvers, defineResolvers, getRouterLinkComponent, isComponentResolver, plugin, useRenderer };
