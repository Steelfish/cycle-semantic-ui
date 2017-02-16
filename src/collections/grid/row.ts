import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderStyleAndContent, runStyleAndContent, makeIsArgs } from "../../common";
import { numToText } from "../../utils";

export namespace Row {
  export interface Style {
    stretched: boolean;
    mobile: boolean;
    tablet: boolean;
    computer: boolean;
    largescreen: boolean;
    equalWidth: boolean;
  }

  export type RowArgs = StyleAndContentArgs<Style, DOMContent, ContentObj<DOMContent>>;
  export type RowSources = ComponentSources<Style, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: Partial<Style>|DOMContent|RowArgs, arg2?: DOMContent) : VNode {
    return renderStyleAndContent(row, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: RowSources, scope?: string) : ComponentSinks {
    return runStyleAndContent(sources, row, ".row", scope);
  }

  export function row(args): VNode {
    let style = args.style ? args.style : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main: [];
    return div({ props: { className: getClassname(style, content) } }, content);
  }
  function getClassname(style: Partial<Style>, content: DOMContent): string {
    let className = "ui";
    if (style.stretched) {
      className += " stretched";
    }
    if (style.mobile) {
      className += " mobile only";
    }
    if (style.tablet) {
      className += " tablet only";
    }
    if (style.computer) {
      className += " computer only";
    }
    if (style.largescreen) {
      className += " largescreen only";
    }
    if (style.equalWidth) {
      className += numToText(content instanceof Array ? content.length : 1) + " column";
    }
    className += " row";
    return className;
  }
}
