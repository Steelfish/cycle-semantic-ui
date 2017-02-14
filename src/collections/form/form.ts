import { Size, SizeString } from "../../enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, ContentObj, DOMContent, isDOMContent } from "../../types";

export namespace Form {
  export interface Style {
    equalWidth?: boolean;
    inverted?: boolean;
    loading?: boolean;
    size?: Size | SizeString;
  }
  export interface Args {
    style?: Style;
    content?: ContentObj<DOMContent> | DOMContent;
  }

  export function render(arg1?: Style | DOMContent | Args, arg2?: DOMContent): VNode {
    if (isArgs(arg1)) {
      return form(arg1);
    }
    let args: Args = {};
    if (isDOMContent(arg1)) {
      args.style = {};
      args.content = { main: arg1 };
    } else {
      args.style = arg1 || {};
      args.content = { main: arg2 || [] };
    }
    return form(args);
  }

  export function run(sources: ComponentSources<Style, ContentObj<DOMContent> | DOMContent>, scope?: string): ComponentSinks {
    function main(sources: ComponentSources<Style, ContentObj<DOMContent> | DOMContent>) {
      sources.style$ = sources.style$ ? sources.style$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const vTree$ = xs.combine(sources.style$, sources.content$)
        .map(([props, content]) => render(props, isDOMContent(content) ? content : content.main)
        );
      return {
        DOM: vTree$,
        events: (type) => sources.DOM.select(".form").events(type)
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function form(args: Args) {
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let style = typeof(args.style) !== "undefined" ? args.style : {};
    return div({ props: { className: getClassname(style) } }, content);
  }

  function getClassname(style: Style) {
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

  function isArgs(obj): obj is Args {
    return obj && (
      typeof (obj.style) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && (isDOMContent(obj.content) || isDOMContent(obj.content.main)))
    );
  }
}
