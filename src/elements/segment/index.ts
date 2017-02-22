import { VNode, div } from "@cycle/dom";
import { DOMContent,  isDOMContent, StyleAndContentArgs, ContentObj, ComponentSources, ComponentSinks } from "../../types";
import { Color, ColorString, Attachment, AttachmentString, Float, FloatString, TextAlignment, TextAlignmentString } from "../../enums";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Segment {
  export interface Props {
    raised: boolean;
    stacked: boolean;
    tallStacked: boolean;
    piled: boolean;
    vertical: boolean;
    loading: boolean;
    inverted: boolean;
    padded: boolean;
    veryPadded: boolean;
    compact: boolean;
    circular: boolean;
    clearing: boolean;
    basic: boolean;
    color: Color | ColorString;
    attachment: Attachment | AttachmentString;
    float: Float | FloatString;
    textAlignment: TextAlignment | TextAlignmentString;
  }

  export type SegmentArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type SegmentSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: SegmentArgs|Partial<Props>|DOMContent, arg2?: DOMContent) : VNode {
    return renderPropsAndContent(segment, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }

  export function run(sources: SegmentSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, segment, ".segment", scope);
  }


  function segment(args: SegmentArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(props) } }, content);
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.raised) {
      className += " raised";
    }
    if (props.stacked) {
      className += " stacked";
    }
    if (props.tallStacked) {
      className += " tall stacked";
    }
    if (props.piled) {
      className += " piled";
    }
    if (props.vertical) {
      className += " vertical";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.padded) {
      className += " padded";
    }
    if (props.veryPadded) {
      className += " very padded";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.clearing) {
      className += " clearing";
    }
    if (props.basic) {
      className += " basic";
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
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
    className += " segment";
    return className;
  }
}
