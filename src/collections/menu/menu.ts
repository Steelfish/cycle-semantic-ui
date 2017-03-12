import { ComponentSources, ValueComponentSinks, StyleAndContentArgs, DOMContent, ContentObj, isDOMContent} from "../../types";
import { Color, Size, Attachment } from "../../enums";
import { renderPropsAndContent, makeIsArgs } from "../../common";
import { numToText } from "../../utils";
import isolate from "@cycle/isolate";
import { div, VNode } from "@cycle/dom";
import xs from "xstream";

export namespace Menu {
  export interface Props {
    submenu: boolean;
    right: boolean;
    secondary: boolean;
    pointing: boolean;
    tabular: boolean;
    text: boolean;
    vertical: boolean;
    pagination: boolean;
    fixed: boolean;
    stackable: boolean;
    inverted: boolean;
    icon: boolean;
    labeledIcons: boolean;
    compact: boolean;
    equalWidth: boolean;
    borderless: boolean;
    fluid: boolean;
    color: Color | string;
    attachment: Attachment | string;
    size: Size | string;
  }

  export type MenuArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type MenuSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: MenuArgs | Partial<Props> | DOMContent, arg2: DOMContent = []): VNode {
    return renderPropsAndContent(menu, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: MenuSources, scope?: string): ValueComponentSinks<VNode> {
    function main(sources: MenuSources) {
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});

      const click$ = sources.DOM.select(".menu > .item").events("click");
      const items$ = sources.content$.map(c => isDOMContent(c) ? c : c.main).remember();
      const clickedId$ = click$.map(ev => parseInt((ev as any).currentTarget.id))
        .filter(n => !isNaN(n) && typeof (n) !== "undefined");
      const clickedItem$ = items$.map(items => clickedId$.map(id => items[id])).flatten()
        .filter(item => item.data.className.indexOf("disabled") === -1);

      const vtree$ = xs.combine(sources.props$, items$).map(
        ([props, content]) => menu({ props, content })
      );
      return {
        DOM: vtree$,
        events: (type) => sources.DOM.select(".menu").events(type),
        value$: clickedItem$
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function menu(args: MenuArgs) {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let children:VNode[];
    if (!(content instanceof Array)) {
      if (typeof(content) === "string") {
        content = div({props: {className: "text"}}, content);
      }
      children = [content];
    }
    children = children.map((vNode, id) => {
      vNode.data.attrs = Object.assign({}, vNode.data.attrs, {id});
      return vNode;
    });
    return div({ props: { className: getClassname(props, children.length) } }, children);
  }

  function getClassname(props: Partial<Props>, length: number) {
    let className = "ui";
    if (props.secondary) {
      className += " secondary";
    }
    if (props.fluid) {
      className += " fluid";
    }
    if (props.right) {
      className += " right";
    }
    if (props.pointing) {
      className += " pointing";
    }
    if (props.tabular) {
      className += " tabular";
    }
    if (props.text) {
      className += " text";
    }
    if (props.vertical) {
      className += " vertical";
    }
    if (props.pagination) {
      className += " pagination";
    }
    if (props.fixed) {
      className += " fixed";
    }
    if (props.stackable) {
      className += " stackable";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.icon) {
      className += " icon";
    }
    if (props.labeledIcons) {
      className += " labeled icon";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.borderless) {
      className += " borderless";
    }
    if (props.equalWidth) {
      className += numToText(length) + " item";
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    className += " menu";
    if (props.submenu) {
      className = className.substring(3);
    }
    return className;
  }
}
