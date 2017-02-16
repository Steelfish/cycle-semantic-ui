
import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderStyleAndContent, runStyleAndContent, makeIsArgs } from "../../common";
import {
  VerticalAlignment, VerticalAlignmentString, TextAlignment,
  TextAlignmentString, Size, SizeString, Float, FloatString
} from "../../enums";
import { numToText } from "../../utils";

export namespace Column {
  export interface Style {
    width: number;
    mobile: number;
    tablet: number;
    computer: number;
    largescreen: number;
    size: Size | SizeString;
    alignment: VerticalAlignment | VerticalAlignmentString;
    textAlignment: TextAlignment | TextAlignmentString;
    float: Float | FloatString;
  }

  export type ColumnArgs = StyleAndContentArgs<Style, DOMContent, ContentObj<DOMContent>>;
  export type ColumnSources = ComponentSources<Style, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: Partial<Style> | DOMContent | ColumnArgs, arg2?: DOMContent): VNode {
    return renderStyleAndContent(column, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: ColumnSources, scope?: string): ComponentSinks {
    return runStyleAndContent(sources, column, ".column", scope);
  }


  function column(args: ColumnArgs) {
    let style = args.style ? args.style : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(style) } }, content);
  }

  function getClassname(style: Partial<Style>): string {
    let className = "ui";
    if (style.width) {
      className += numToText(style.width) + " wide";
    }
    if (style.mobile) {
      className += numToText(style.mobile) + " wide mobile";
    }
    if (style.tablet) {
      className += numToText(style.tablet) + " wide tablet";
    }
    if (style.computer) {
      className += numToText(style.computer) + " wide computer";
    }
    if (style.largescreen) {
      className += numToText(style.largescreen) + " wide largescreen";
    }
    if (typeof (style.size) !== "undefined") {
      className += Size.ToClassname(style.size);
    }
    if (typeof (style.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(style.alignment);
    }
    if (typeof (style.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(style.textAlignment);
    }
    if (typeof (style.float) !== "undefined") {
      className += Float.ToClassname(style.float);
    }
    className += " column";
    return className;
  }
}
