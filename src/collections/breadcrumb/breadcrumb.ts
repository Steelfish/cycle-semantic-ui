import { div, span, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, ContentObj, StyleAndContentArgs, isDOMContent, DOMContent } from "../../types";
import { Size } from "../../enums";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Breadcrumb {
  export interface Props {
    divider: VNode | string;
    size: Size | string;
  }
  export type BreadcrumbArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type BreadcrumbSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: Partial<Props> | DOMContent | BreadcrumbArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(breadcrumb, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: BreadcrumbSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, breadcrumb, ".breadcrumb", scope);
  }

  function breadcrumb(args: BreadcrumbArgs): VNode {
    let props = args.props ? args.props : { divider: "/" };
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    if (!(content instanceof Array)) {
      content = [content];
    }
    if (!props.divider) {
      props.divider = "/";
    }
    let children = content.map(c => [
      c, divider(props)
    ]).reduce((a, n) => a.concat(n), []);
    children.splice(-1, 1);
    return div({ props: { className: getClassName(props) } }, children);
  }

  function getClassName(props: Partial<Props>): string {
    let className = "ui";
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    return className + " breadcrumb";
  }

  function divider(props: Partial<Props>): VNode {
    if (typeof (props.divider) === "string") {
      return span({ props: { className: "divider" } }, props.divider);
    }
    if (props.divider.data.props.className.indexOf("ui") !== -1) {
      props.divider.data.props.className = props.divider.data.props.className.substring(3);
    }
    if (props.divider.data.props.className.indexOf("divider") === -1) {
      props.divider.data.props.className += " divider";
    }
    return props.divider;
  }
}
