import { Size, SizeString } from "../../enums";
import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderStyleAndContent, runStyleAndContent, makeIsArgs} from "../../common";

export namespace Form {
  export interface Style {
    equalWidth: boolean;
    inverted: boolean;
    loading: boolean;
    size: Size | SizeString;
  }
  export type FormArgs = StyleAndContentArgs<Style, DOMContent, ContentObj<DOMContent>>;
  export type FormSources = ComponentSources<Style, DOMContent, ContentObj<DOMContent>>;
  export function render(arg1?: Partial<Style> | DOMContent | FormArgs, arg2?: DOMContent): VNode {
    return renderStyleAndContent(form, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }

  export function run(sources: FormSources, scope?: string): ComponentSinks {
    return runStyleAndContent(sources, form, ".form", scope);
  }

  function form(args: FormArgs) {
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let style = typeof(args.style) !== "undefined" ? args.style : {};
    return div({ props: { className: getClassname(style) } }, content);
  }

  function getClassname(style: Partial<Style>) {
    let className = "ui";
    if (style.loading) {
      className += " loading";
    }
    if (style.equalWidth) {
      className += " equal width";
    }
    if (style.inverted) {
      className += " inverted";
    }
    if (typeof (style.size) !== "undefined") {
      className += Size.ToClassname(style.size);
    }
    className += " form";
    return className;
  }
}
