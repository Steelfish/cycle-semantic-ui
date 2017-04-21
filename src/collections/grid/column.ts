
import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs, addClassName } from "../../common";
import { VerticalAlignment, TextAlignment, Size, Float } from "../../enums";
import { numToText, getScope } from "../../utils";

export namespace Column {
  export interface Props {
    stretched: true;
    width: number;
    mobile: number;
    tablet: number;
    computer: number;
    largescreen: number;
    mobileOnly: boolean;
    tabletOnly: boolean;
    computerOnly: boolean;
    largescreenOnly: boolean;
    size: Size | string;
    alignment: VerticalAlignment | string;
    textAlignment: TextAlignment | string;
    float: Float | string;
  }

  export type ColumnArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type ColumnSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: Partial<Props> | DOMContent | ColumnArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(column, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: ColumnSources, scope: string = getScope()): ComponentSinks {
    return runPropsAndContent(sources, column, ".column", scope);
  }
  export function from(node: VNode, props: Partial<Props> = {}): VNode {
    return addClassName(node, getClassname(props));
  }

  function column(args: ColumnArgs) {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(props) } }, content);
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.width) {
      className += numToText(props.width) + " wide";
    }
    if (props.mobile) {
      className += numToText(props.mobile) + " wide mobile";
    }
    if (props.tablet) {
      className += numToText(props.tablet) + " wide tablet";
    }
    if (props.computer) {
      className += numToText(props.computer) + " wide computer";
    }
    if (props.largescreen) {
      className += numToText(props.largescreen) + " wide large screen";
    }
    if (props.mobileOnly) {
      className += " mobile only";
    }
    if (props.tabletOnly) {
      className += " tablet only";
    }
    if (props.computerOnly) {
      className += " computer only";
    }
    if (props.largescreenOnly) {
      className += " large screen only";
    }
    if (props.stretched) {
      className += " stretched";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    if (typeof (props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    className += " column";
    return className;
  }
}
