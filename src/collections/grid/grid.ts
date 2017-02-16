import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";
import { VerticalAlignment, VerticalAlignmentString, TextAlignment, TextAlignmentString } from "../../enums";
import { numToText } from "../../utils";

export namespace Grid {
  export interface Props {
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

  export type GridArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type GridSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;
  export function render(arg1?: Partial<Props> | DOMContent | GridArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(grid, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: GridSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, grid, ".grid", scope);
  }

  export function grid(args: GridArgs): VNode {
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let props = typeof (args.props) !== "undefined" ? args.props : {};
    return div({ props: { className: getClassname(props, content) } }, content);
  }
  export function getClassname(props: Partial<Props>, content: DOMContent): string {
    let className = "ui";
    if (props.equalWidth) {
      className += numToText(content instanceof Array ? content.length : 1) + " column";
    }
    if (props.divided) {
      className += " divided";
    }
    if (props.container) {
      className += " container";
    }
    if (props.celled) {
      className += " celled";
    }
    if (props.intCelled) {
      className += " internally celled";
    }
    if (props.padded) {
      className += " padded";
    }
    if (props.relaxed) {
      className += " relaxed";
    }
    if (props.centered) {
      className += " centered";
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    if (typeof (props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    className += " grid";
    return className;
  }
}
