import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";
import { TextAlignment, VerticalAlignment} from "../../enums";
import { numToText, getScope } from "../../utils";

export namespace Row {
  export interface Props {
    width: number;
    doubling: boolean;
    centered: boolean;
    stretched: boolean;
    mobileOnly: boolean;
    tabletOnly: boolean;
    computerOnly: boolean;
    largescreenOnly: boolean;
    equalWidth: boolean;
    alignment: VerticalAlignment | string;
    textAlignment: TextAlignment | string;
  }

  export type RowArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type RowSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: Partial<Props>|DOMContent|RowArgs, arg2?: DOMContent) : VNode {
    return renderPropsAndContent(row, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: RowSources, scope: string = getScope()) : ComponentSinks {
    return runPropsAndContent(sources, row, ".row", scope);
  }

  export function row(args): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main: [];
    return div({ props: { className: getClassname(props, content) } }, content);
  }
  function getClassname(props: Partial<Props>, content: DOMContent): string {
    let className = "ui";
    if (props.doubling) {
      className += " doubling";
    }
    if (props.centered) {
      className += " centered";
    }
    if (props.stretched) {
      className += " stretched";
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
    if (props.equalWidth) {
      className += " equal width";
    }
    if (props.width) {
      className += numToText(props.width) + " column";
    }
    if (typeof(props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    if (typeof(props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    className += " row";
    return className;
  }
}
