import { div, VNode } from "@cycle/dom";
import { DOMContent, isDOMContent, StyleAndContentArgs, ContentObj, ComponentSources, ComponentSinks } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Divider {
  export interface Props {
    horizontal: boolean;
    vertical: boolean;
    inverted: boolean;
    fitted: boolean;
    hidden: boolean;
    section: boolean;
    clearing: boolean;
    header: boolean;
  }

  export type DividerArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type DividerSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function run(sources: DividerSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, divider, ".divider", scope);
  }

  export function render(arg1?: DividerArgs | Partial<Props> | DOMContent, arg2?: DOMContent): VNode {
    return renderPropsAndContent(divider, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }

  function divider(args: DividerArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassName(props) } }, content);
  }

  function getClassName(props: Partial<Props>): string {
    let className = "ui";
    if (props.vertical) {
      className += " vertical";
    } else if (props.horizontal) {
      className += " horizontal";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.fitted) {
      className += " fitted";
    }
    if (props.hidden) {
      className += " hidden";
    }
    if (props.section) {
      className += " section";
    }
    if (props.clearing) {
      className += " clearing";
    }
    if (props.header) {
      className += " header";
    }
    className += " divider";
    return className;
  }
}
