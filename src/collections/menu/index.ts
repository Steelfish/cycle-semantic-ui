import { ComponentSources, ValueComponentSinks, StyleAndContentArgs, DOMContent, ContentObj, } from "../../types";
import { Color, Size, Attachment, Float } from "../../enums";
import { renderPropsAndContent, makeIsArgs } from "../../common";
import { numToText, getScope } from "../../utils";
import isolate from "@cycle/isolate";
import { div, a, VNode } from "@cycle/dom";
import xs, {MemoryStream} from "xstream";

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
  export type Content = Array<Partial<MenuItem>>;
  export interface MenuItem {
    dropdown: boolean;
    link: boolean;
    active: boolean;
    disabled: boolean;
    headerOnly: boolean;
    header: boolean;
    fitted: boolean;
    divider: boolean;
    rightMenu: boolean;
    verticallyFitted: boolean;
    horizontallyFitted: boolean;
    icon: boolean;
    color: Color | string;
    float: Float | string;
    href: string;
    main: DOMContent | Content;
  }

  export type MenuArgs = StyleAndContentArgs<Props, Content, ContentObj<Content>>;
  export type MenuSources = ComponentSources<Props, Content, ContentObj<Content>>;

  export function render(arg1?: MenuArgs | Partial<Props> | Content, arg2: Content = []): VNode {
    return renderPropsAndContent(menu, makeIsArgs(isContent), isContent, arg1, arg2);
  }
  export function run<V extends MenuItem>(sources: MenuSources, scope: string = getScope()): ValueComponentSinks<Partial<V>> {
    function main(sources: MenuSources) {
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});

      const click$ = sources.DOM.select(".menu > .item").events("click");
      const items$ = sources.content$.map(c => isContent(c) ? c : c.main).remember() as any as MemoryStream<Partial<V>[]>;
      const clickedId$ = click$.map(ev => parseInt((ev as any).currentTarget.id))
        .filter(n => !isNaN(n) && typeof (n) !== "undefined");
      const clickedItem$ = items$.map(items => clickedId$.map(id => items[id])).flatten()
        .filter(item => !item.disabled);

      const vtree$ = xs.combine(sources.props$, items$).map(
        ([props, content]) => menu({ props, content })
      );
      return {
        DOM: vtree$,
        events: (type) => sources.DOM.select(".menu").events(type),
        value$: clickedItem$
      };
    }
    if (scope === null) {
      return main(sources);
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function menu(args: MenuArgs) {
    let props = args.props ? args.props : {};
    let content = args.content ? isContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(props, content.length) } }, content.map(renderItem));
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
  function getItemClassname(item: MenuItem) {
    let className = "";
    if (item.active) {
      className += " active";
    }
    if (item.header) {
      className += " header";
    }
    if (item.fitted) {
      className += " fitted";
    }
    if (item.verticallyFitted) {
      className += " vertically fitted";
    }
    if (item.horizontallyFitted) {
      className += " horizontally fitted";
    }
    if (item.link) {
      className += " link";
    }
    if (item.icon) {
      className += " icon";
    }
    if (item.disabled) {
      className += " disabled";
    }
    if (typeof (item.float) !== "undefined") {
      className += Float.ToClassname(item.float);
    }
    if (typeof (item.color) !== "undefined") {
      className += Color.ToClassname(item.color);
    }
    className += " item";
    className = className.substring(1);
    return className;
  }

  function renderItem(item: MenuItem, id: number) {
    if (item.divider) {
      return div({ props: { className: "divider" } });
    }
    if (item.headerOnly) {
      return div({ props: { className: "header" } }, item.main);
    }
    if (item.rightMenu) {
      return div({ props: { className: "right menu" } }, (item.main as any[]).map(renderItem));
    }
    if (item.dropdown) {
      let content = item.main as VNode;
      content.data.props.className += " " + getItemClassname(item);
      return content;
    }
    if (item.href) {
      return a({ props: { className: getItemClassname(item), id, href: item.href } }, item.main);
    }
    return div({ props: { className: getItemClassname(item), id } }, item.main);
  }

  function isContent(obj): obj is Content {
    return obj instanceof Array && (
      obj.length === 0 ||
      typeof (obj[0].main) !== "undefined" ||
      typeof (obj[0].divider) !== "undefined" ||
      typeof (obj[0].headerOnly) !== "undefined"
    );
  }
}
