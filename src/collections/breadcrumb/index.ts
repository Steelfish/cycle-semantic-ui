import { div, a, span, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, ContentObj, StyleAndContentArgs, DOMContent } from "../../types";
import { Size, SizeString } from "../../enums";
import { renderStyleAndContent, runStyleAndContent, makeIsArgs } from "../../common";

export namespace Breadcrumb {
  export interface Style {
    divider: VNode | string;
    size: Size | SizeString;
  }
  export type Content = Array<Partial<BreadCrumbItem>>;
  export interface BreadCrumbItem {
    active: boolean;
    text: DOMContent;
    href: string;
  }
  export type BreadcrumbArgs = StyleAndContentArgs<Style,Content, ContentObj<Content>>;
  export type BreadcrumbSources = ComponentSources<Style, Content, ContentObj<Content>>;
  
  export function render(arg1?: Partial<Style> | Content | BreadcrumbArgs, arg2?: Content): VNode {
    return renderStyleAndContent(breadcrumb, makeIsArgs(isContent),isContent, arg1, arg2);
  }
  export function run(sources: BreadcrumbSources, scope?: string) : ComponentSinks {
    return runStyleAndContent(sources, breadcrumb, ".breadcrumb", scope);
  }

  function breadcrumb(args: BreadcrumbArgs) : VNode {
    let style = args.style ? args.style : {divider: "/"};
    let content = [];
    if(args.content) {
      if (isContent(args.content)) {
        content = args.content;
      } else if (isContent(args.content.main)) {
        content = args.content.main;
      }
    }
    if (!style.divider) {
      style.divider = "/";
    }
    let children = content.map(c => [
      section(c), divider(style)
    ]).reduce((a, n) => a.concat(n), []);
    children.splice(-1, 1);
    return div({ props: { className: getClassName(style) } }, children);
  }

  function getClassName(style: Partial<Style>): string {
    let className = "ui";
    if (typeof (style.size) !== "undefined") {
      className += Size.ToClassname(style.size);
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
  function divider(style: Partial<Style>): VNode {
    if (typeof (style.divider) === "string") {
      return span({ props: { className: "divider" } }, style.divider);
    }
    if (style.divider.data.props.className.indexOf("ui") !== -1) {
      style.divider.data.props.className = style.divider.data.props.className.substring(3);
    }
    if (style.divider.data.props.className.indexOf("divider") === -1) {
      style.divider.data.props.className += " divider";
    }
    return style.divider;
  }

  function isContent(obj): obj is Content {
    return obj instanceof Array;
  }
}
