import { VNode, a, div } from "@cycle/dom";
import { Size,  VerticalAlignment, Float } from "../../enums";
import { DOMContent, ContentObj, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs, addClassName } from "../../common";
import { getScope} from "../../utils";

export namespace List {
  export interface Props {
    bulleted: boolean;
    ordered: boolean;
    horizontal: boolean;
    inverted: boolean;
    selection: boolean;
    animated: boolean;
    relaxed: boolean;
    divided: boolean;
    celled: boolean;
    size: Size | string;
    alignment: VerticalAlignment | string;
    float: Float | string;
  }
  export interface ListItem {
    left: DOMContent;
    main: DOMContent;
    icon: DOMContent;
    right: DOMContent;
    header: DOMContent;
    description: DOMContent;
    href: string;
  }

  export type Content = Array<Partial<ListItem>>;
  export type ListArgs = StyleAndContentArgs<Props, Content, ContentObj<Content>>;
  export type ListSources = ComponentSources<Props, Content, ContentObj<Content>>;
 
  export function render(arg1?: ListArgs | Partial<Props> | Content, arg2?: Content) : VNode {
    return renderPropsAndContent(list, makeIsArgs(isContent), isContent, arg1, arg2);
  }

  export function run(sources: ListSources, scope: string = getScope()): ComponentSinks {
    return runPropsAndContent(sources, list, ".list", scope);
  }
  export function from(node: VNode, props: Partial<Props> = {}): VNode {
    return addClassName(node, getClassname(props));
  }

  export function list(args: ListArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(props) } },
      content.map(({header, icon, main, description, href, left, right}) => {
        let l = left ? div({ props: { className: "left floated content" } }, left) : [];
        let r = right ? div({ props: { className: "right floated content" } }, right) : [];
        let h = header ? div({ props: { className: "header" } }, header) : [];
        let d = description ? div({ props: { className: "description" } }, description) : [];
        let i = icon ? icon : [];
        let c = (header || description) ? div({ props: { className: "content" } }, [].concat(h, d, main)) : main;
        let children = [].concat(l, r, i, c);
        return href
          ? a({ props: { className: "item", href: href } }, children)
          : div({ props: { className: "item" } }, children);
      })
    );
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.bulleted) {
      className += " bulleted";
    }
    if (props.ordered) {
      className += " ordered";
    }
    if (props.horizontal) {
      className += " horizontal";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.selection) {
      className += " selection";
    }
    if (props.animated) {
      className += " animated";
    }
    if (props.relaxed) {
      className += " relaxed";
    }
    if (props.divided) {
      className += " divided";
    }
    if (props.celled) {
      className += " celled";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    className += " list";
    return className;
  }

  function isContent(obj): obj is Content {
    return obj instanceof Array;
  }
}
