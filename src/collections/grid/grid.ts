import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderStyleAndContent, runStyleAndContent, makeIsArgs } from "../../common";
import { VerticalAlignment, VerticalAlignmentString, TextAlignment, TextAlignmentString } from "../../enums";
import { numToText } from "../../utils";

export namespace Grid {
  export interface Style {
    equalWidth: boolean;
    divided: boolean;
    container: boolean;
    celled: boolean;
    intCelled: boolean;
    padded: boolean;
    relaxed: boolean;
    centered: boolean;
    alignment: VerticalAlignment | VerticalAlignmentString;
    textAlignment: TextAlignment | TextAlignmentString;
  }

  export type GridArgs = StyleAndContentArgs<Style, DOMContent, ContentObj<DOMContent>>;
  export type GridSources = ComponentSources<Style, DOMContent, ContentObj<DOMContent>>;
  export function render(arg1?: Partial<Style> | DOMContent | GridArgs, arg2?: DOMContent): VNode {
    return renderStyleAndContent(grid, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: GridSources, scope?: string): ComponentSinks {
    return runStyleAndContent(sources, grid, ".grid", scope);
  }

  export function grid(args: GridArgs): VNode {
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let style = typeof (args.style) !== "undefined" ? args.style : {};
    return div({ props: { className: getClassname(style, content) } }, content);
  }
  export function getClassname(style: Partial<Style>, content: DOMContent): string {
    let className = "ui";
    if (style.equalWidth) {
      className += numToText(content instanceof Array ? content.length : 1) + " column";
    }
    if (style.divided) {
      className += " divided";
    }
    if (style.container) {
      className += " container";
    }
    if (style.celled) {
      className += " celled";
    }
    if (style.intCelled) {
      className += " internally celled";
    }
    if (style.padded) {
      className += " padded";
    }
    if (style.relaxed) {
      className += " relaxed";
    }
    if (style.centered) {
      className += " centered";
    }
    if (typeof (style.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(style.alignment);
    }
    if (typeof (style.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(style.textAlignment);
    }
    className += " grid";
    return className;
  }
}
