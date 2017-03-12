import { div, a, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, ContentObj, StyleAndContentArgs, DOMContent, isDOMContent } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace BreadcrumbItem {
  export interface Props {
    active: boolean;
    href: string;
  }
  export type BreadcrumbItemArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type BreadcrumbItemSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;
  
  export function render(arg1?: Partial<Props> | DOMContent | BreadcrumbItemArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(breadcrumbItem, makeIsArgs(isDOMContent),isDOMContent, arg1, arg2);
  }
  export function run(sources: BreadcrumbItemSources, scope?: string) : ComponentSinks {
    return runPropsAndContent(sources, breadcrumbItem, ".section", scope);
  }

  function breadcrumbItem(args: BreadcrumbItemArgs) : VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return props.active
      ? div({ props: { className: "active section" } }, content)
      : props.href 
        ? a({ props: { className: "section", href: props.href } }, content)
        : div({ props: { className: "section" } }, content);
  }
}
