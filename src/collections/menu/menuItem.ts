import { ComponentSources, ComponentSinks, StyleAndContentArgs, DOMContent, ContentObj, isDOMContent } from "../../types";
import { Color, Float } from "../../enums";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";
import { div, a, VNode } from "@cycle/dom";

export namespace MenuItem {
  export interface Props {
    dropdown: boolean;
    link: boolean;
    active: boolean;
    disabled: boolean;
    header: boolean;
    fitted: boolean;
    rightMenu: boolean;
    verticallyFitted: boolean;
    horizontallyFitted: boolean;
    icon: boolean;
    color: Color | string;
    float: Float | string;
    href: string;
  }

  export type MenuArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type MenuSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: MenuArgs | Partial<Props> | DOMContent, arg2: DOMContent = []): VNode {
    return renderPropsAndContent(menuItem, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: MenuSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, menuItem, ".item", scope);
  }

  function menuItem(args: MenuArgs) {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    if (props.href) {
      return a({ props: { className: getClassname(props), href: props.href } }, content);
    }
    return div({ props: { className: getClassname(props) } }, content);
  }

  function getClassname(props: Partial<Props> | string) {
    if (typeof(props) === "string") {
      return props;
    }
    let className = "";
    if (props.active) {
      className += " active";
    }
    if (props.header) {
      className += " header";
    }
    if (props.fitted) {
      className += " fitted";
    }
    if (props.verticallyFitted) {
      className += " vertically fitted";
    }
    if (props.horizontallyFitted) {
      className += " horizontally fitted";
    }
    if (props.link) {
      className += " link";
    }
    if (props.icon) {
      className += " icon";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.dropdown) {
      className += " dropdown";
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " item";
    className = className.substring(1);
    return className;
  }
}
