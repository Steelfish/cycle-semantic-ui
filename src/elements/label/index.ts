import { Size, SizeString, Attachment, AttachmentString, Color, ColorString } from "../../enums";
import { VNode, div } from "@cycle/dom";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import { renderPropsAndContent, runPropsAndContent } from "../../common";

export namespace Label {
  export interface Props {
    circular: boolean;
    empty: boolean;
    pointing: boolean;
    leftPointing: boolean;
    rightPointing: boolean;
    basic: boolean;
    leftCorner: boolean;
    rightCorner: boolean;
    tag: boolean;
    ribbon: boolean;
    rightRibbon: boolean;
    horizontal: boolean;
    floating: boolean;
    attachment: Attachment | AttachmentString;
    size: Size | SizeString;
    color: Color | ColorString;
  }

  export interface ContentObj {
    main: DOMContent;
    detail: DOMContent;
  }

  export type LabelArgs = StyleAndContentArgs<Props, DOMContent, ContentObj>;
  export type LabelSources = ComponentSources<Props, DOMContent, ContentObj>;

  export function run(sources: LabelSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, label, ".label", scope);
  }

  export function render(arg1?: LabelArgs | Partial<Props> | DOMContent, arg2?: DOMContent) {
    return renderPropsAndContent(label, isArgs, isDOMContent, arg1, arg2);
  }

  function label(args: LabelArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
    let children = [].concat(content.main ? content.main : [], content.detail ? div({ props: { className: "detail" } }, content.detail) : []);
    return div({ props: { className: getClassname(props) } }, children);
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.circular) {
      className += " circular";
    }
    if (props.empty) {
      className += " empty";
    }
    if (props.pointing) {
      className += " pointing";
    }
    if (props.leftPointing) {
      className += " left pointing";
    }
    if (props.rightPointing) {
      className += " right pointing";
    }
    if (props.basic) {
      className += " basic";
    }
    if (props.leftCorner) {
      className += " left corner";
    }
    if (props.rightCorner) {
      className += " right corner";
    }
    if (props.tag) {
      className += " tag";
    }
    if (props.ribbon) {
      className += " ribbon";
    }
    if (props.rightRibbon) {
      className += " right ribbon";
    }
    if (props.horizontal) {
      className += " horizontal";
    }
    if (props.floating) {
      className += " floating";
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " label";
    return className;
  }

  function isArgs(obj): obj is LabelArgs {
    return typeof (obj) !== "undefined" && (
      typeof (obj.props) !== "undefined" ||
      typeof (obj.content) !== "undefined" && (
        isDOMContent(obj.content) || (
          isDOMContent(obj.content.main) || isDOMContent(obj.content.detail)
        )
      )
    );
  }
}
