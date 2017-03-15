import { div, a, VNode } from "@cycle/dom";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSinks, ComponentSources } from "../../types";
import { Color, Size, Attachment, Float } from "../../enums";
import { runPropsAndContent, renderPropsAndContent } from "../../common";
import { getScope} from "../../utils";

export namespace Button {
  export interface Props {
    animated: boolean;
    verticalAnimated: boolean;
    labeled: boolean;
    rightlabeled: boolean;
    icon: boolean;
    basic: boolean;
    inverted: boolean;
    active: boolean;
    disabled: boolean;
    loading: boolean;
    compact: boolean;
    circular: boolean;
    fluid: boolean;
    href: string;
    attachment: Attachment | string;
    size: Size | string;
    float: Float | string;
    color: Color | string;
  }

  export interface ContentObj {
    main: DOMContent;
    hidden: DOMContent;
  }

  export type ButtonArgs = StyleAndContentArgs<Props, DOMContent, ContentObj>;
  export type ButtonSources = ComponentSources<Props, DOMContent, ContentObj>;

  export function render(arg1?: ButtonArgs | Partial<Props> | DOMContent, arg2?: DOMContent) {
    return renderPropsAndContent(button, isArgs, isDOMContent, arg1, arg2);
  }
  export function run(sources: ButtonSources, scope: string = getScope()): ComponentSinks {
    return runPropsAndContent(sources, button, ".button", scope);
  }

  function button(args: ButtonArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
    let children = content.hidden
      ? [div({ props: { className: "visible content" } }, content.main),
      div({ props: { className: "hidden content" } }, content.hidden)]
      : content.main;
    return props.href
      ? a({ props: { href: props.href, className: getClassname(props) } }, children)
      : div({ props: { className: getClassname(props) } }, children);
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.animated) {
      className += " animated";
    }
    if (props.verticalAnimated) {
      className += " vertical animated";
    }
    if (props.labeled) {
      className += " labeled";
    }
    if (props.rightlabeled) {
      className += " right labeled";
    }
    if (props.icon) {
      className += " icon";
    }
    if (props.basic) {
      className += " basic";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.active) {
      className += " active";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.fluid) {
      className += " fluid";
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " button";
    return className;
  }

  function isArgs(obj): obj is ButtonArgs {
    return typeof (obj) !== "undefined" && (
      typeof (obj.props) !== "undefined" ||
      isDOMContent(obj.content) || (typeof (obj.content) !== "undefined" && (
        isDOMContent(obj.content.main) || isDOMContent(obj.content.hidden)
      ))
    );
  }
}
