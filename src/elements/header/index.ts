import { div, VNode } from "@cycle/dom";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import {
  Size, SizeString, Attachment, AttachmentString, Float,
  FloatString, TextAlignment, TextAlignmentString, Color, ColorString
} from "../../enums";
import { renderPropsAndContent, runPropsAndContent } from "../../common";

export namespace Header {
  export interface Props {
    icon: boolean;
    divider: boolean;
    dividing: boolean;
    block: boolean;
    disabled: boolean;
    inverted: boolean;
    attachment: Attachment | AttachmentString;
    float: Float | FloatString;
    textAlignment: TextAlignment | TextAlignmentString;
    size: Size | SizeString;
    color: Color | ColorString;
  }
  export interface ContentObj {
    main: DOMContent;
    subtext: DOMContent;
    icon: DOMContent;
  }

  export type HeaderArgs = StyleAndContentArgs<Props, DOMContent, ContentObj>;
  export type HeaderSources = ComponentSources<Props, DOMContent, ContentObj>;

  export function run(sources: HeaderSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, header, ".header", scope);
  }

  export function render(arg1?: HeaderArgs | Partial<Props> | DOMContent, arg2?: DOMContent): VNode {
    return renderPropsAndContent(header, isArgs, isDOMContent, arg1, arg2);
  }

  function header(args: HeaderArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
    let children = [].concat(
      content.main ? content.main : [],
      content.subtext ? div({ props: { className: "sub header" } }, content.subtext) : []
    );
    return div({ props: { className: getClassname(props) } }, content.icon
      ? [].concat(content.icon, div({ props: { className: "content" } }, children))
      : children);
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.icon) {
      className += " icon";
    }
    if (props.dividing) {
      className += " dividing";
    }
    if (props.divider) {
      className += " divider";
    }
    if (props.block) {
      className += " block";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    if (typeof (props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " header";
    return className;
  }

  function isArgs(obj): obj is HeaderArgs {
    return (typeof (obj) !== "undefined") && (
      typeof(obj.props) !== "undefined" ||
      isDOMContent(obj.content) || (
        typeof (obj.content) !== "undefined" && (
          isDOMContent(obj.content.main) ||
          isDOMContent(obj.content.icon) ||
          isDOMContent(obj.content.subtext)
        )
      )
    );
  }
}
