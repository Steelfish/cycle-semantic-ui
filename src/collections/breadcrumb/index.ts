import { div, a, span, VNode } from "@cycle/dom";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { ComponentSources, ComponentSinks, ContentObj, DOMContent } from "../../types";
import { Size, SizeString } from "../../enums";

export namespace Breadcrumb {
  export interface Style {
    divider?: VNode | string;
    size?: Size | SizeString;
  }
  export type Content = Array<BreadCrumbItem>;
  export interface BreadCrumbItem {
    active?: boolean;
    text?: DOMContent;
    href?: string;
  }
  export interface BreadCrumbArgs {
    style?: Style;
    content?: ContentObj<Content> | Content;
  }

  export function render(arg1?: Style | Content | BreadCrumbArgs, arg2?: Content): VNode {
    if (isArgs(arg1)) {
      return breadcrumb(arg1);
    }
    let args: BreadCrumbArgs = {};
    if (isContent(arg1)) {
      args.style = { divider: "/" };
      args.content = { main: arg1 };
    } else {
      args.style = arg1 || { divider: "/" };
      args.content = { main: arg2 || [] };
    }
    return breadcrumb(args);
  }

  export function run(sources: ComponentSources<Style, ContentObj<Content> | Content>, scope?: string) : ComponentSinks {
    function main(sources: ComponentSources<Style, ContentObj<Content> | Content>) {
      sources.style$ = sources.style$ ? sources.style$ : xs.of({ divider: "/" });
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);
      const breadcrumb$ = xs.combine(sources.style$, sources.content$).map(
        ([style, content]) => render({
          style: style,
          content: isContent(content) ? { main: content } : content
        })
      );
      return {
        DOM: breadcrumb$,
        events: type => sources.DOM.select(".breadcrumb").events(type),
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }
  function breadcrumb(args: BreadCrumbArgs) {
    let content = args.content ? isContent(args.content) ? args.content : args.content.main : [];
    let style = typeof(args.style) !== "undefined" ? args.style : {divider: "/"};
    let children = content.map(c => [
      section(c), divider(style)
    ]).reduce((a, n) => a.concat(n), []);
    children.splice(-1, 1);
    return div({ props: { className: getClassName(style) } }, children);
  }

  function getClassName(style: Style): string {
    let className = "ui";
    if (typeof (style.size) !== "undefined") {
      className += Size.ToClassname(style.size);
    }
    return className + " breadcrumb";
  }

  function section(section: BreadCrumbItem): VNode {
    return section.active
      ? div({ props: { className: "active section" } }, section.text)
      : section.href 
        ? a({ props: { className: "section", href: section.href } }, section.text)
        : div({ props: { className: "section" } }, section.text);
  }
  function divider(style: Style): VNode {
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
  function isArgs(obj): obj is BreadCrumbArgs {
    return obj && (
      typeof (obj.style) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && (isContent(obj.content) || isContent(obj.content.main)))
    );
  }
}
