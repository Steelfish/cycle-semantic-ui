import {div, VNode} from "@cycle/dom";
import {DOMContent, isDOMContent, ContentObj, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import {renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Container {
  export type ContainerArgs = StyleAndContentArgs<Object, DOMContent, ContentObj<DOMContent>>;
  export type ContainerSources = ComponentSources<Object, DOMContent, ContentObj<DOMContent>>;

  export function run(sources, scope?: string) : ComponentSinks {
    return runPropsAndContent(sources, container, ".container", scope);
  }

  export function render(arg1?: ContainerArgs | DOMContent) : VNode {
    return renderPropsAndContent(container, makeIsArgs(isDOMContent), isDOMContent, arg1);
  }

  function container(args: ContainerArgs) : VNode {
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: "ui container"}}, content);
  }
}
