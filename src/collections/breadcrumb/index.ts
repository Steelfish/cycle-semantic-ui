import { div, a, span, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, ContentObj, StyleAndContentArgs, DOMContent } from "../../types";
import { Size } from "../../enums";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Breadcrumb {
  export interface Props {
    divider: VNode | string;
    size: Size | string;
  }
  export type Content = Array<Partial<BreadCrumbItem>>;
  export interface BreadCrumbItem {
    active: boolean;
    text: DOMContent;
    href: string;
  }
  export type BreadcrumbArgs = StyleAndContentArgs<Props,Content, ContentObj<Content>>;
  export type BreadcrumbSources = ComponentSources<Props, Content, ContentObj<Content>>;
  
  export function render(arg1?: Partial<Props> | Content | BreadcrumbArgs, arg2?: Content): VNode {
    return renderPropsAndContent(breadcrumb, makeIsArgs(isContent),isContent, arg1, arg2);
  }
  export function run(sources: BreadcrumbSources, scope?: string) : ComponentSinks {
    return runPropsAndContent(sources, breadcrumb, ".breadcrumb", scope);
  }

  function breadcrumb(args: BreadcrumbArgs) : VNode {
    let props = args.props ? args.props : {divider: "/"};
    let content = [];
    if(args.content) {
      if (isContent(args.content)) {
        content = args.content;
      } else if (isContent(args.content.main)) {
        content = args.content.main;
      }
    }
    if (!props.divider) {
      props.divider = "/";
    }
    let children = content.map(c => [
      section(c), divider(props)
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

  function section(section: Partial<BreadCrumbItem>): VNode {
    return section.active
      ? div({ props: { className: "active section" } }, section.text)
      : section.href 
        ? a({ props: { className: "section", href: section.href } }, section.text)
        : div({ props: { className: "section" } }, section.text);
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

  function isContent(obj): obj is Content {
    return obj instanceof Array;
  }
}
