import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, label, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, DOMContent, isDOMContent } from "../../types";
import { numToText } from "../../utils";

export namespace Field {
  export interface Style {
    width?: number;
    inline?: boolean;
    centered?: boolean;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
  }
  export interface ContentObj {
    main?: DOMContent;
    label?: DOMContent;
  }
  export interface Args {
    style?: Style;
    content?: ContentObj | DOMContent;
  }

  export function render(arg1?: Style | DOMContent | Args, arg2?: DOMContent, arg3?: DOMContent): VNode {
    if (isArgs(arg1)) {
      return field(arg1);
    }
    let args: Args = {};
    if (isDOMContent(arg1)) {
      args.style = {};
      args.content = { main: arg1 };
    } else {
      args.style = arg1 || {};
      args.content = { main: arg2, label: arg3};
    }
    return field(args);
  }
  
  export function run(sources: ComponentSources<Style, ContentObj|DOMContent>, scope?: string): ComponentSinks {
    function main(sources: ComponentSources<Style, ContentObj|DOMContent>) {
      sources.style$ = sources.style$ ? sources.style$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const vTree$ = xs.combine(sources.style$, sources.content$).map(
        ([style, content]) => isDOMContent(content) 
          ? render(style, content) 
          : render(style, content.main, content.label)
      );
      return {
        DOM: vTree$,
        events: (type) => sources.DOM.select(".field").events(type),
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function field(args: Args) : VNode {
    let style = typeof(args.style) === "undefined" ? {} : args.style;
    let lbl = "" as DOMContent;
    let content = [] as DOMContent;
    if (typeof(args.content) !== "undefined") {
      if (isDOMContent(args.content)) {
        content = args.content;
      } else {
        lbl = args.content.label ? args.content.label : "";
        content = args.content.main ? args.content.main : [];
      }
    }
    return div({ props: { className: getClassname(style) } }, [].concat(lbl ? label(lbl) : "", content));
  }

  function getClassname(style: Style) {
    let className = "ui";
    if (style.width) {
      className += numToText(style.width) + " wide";
    }
    if (style.inline) {
      className += " inline";
    }
    if (style.centered) {
      className += " centered";
    }
    if (style.error) {
      className += " error";
    }
    if (style.disabled) {
      className += " disabled";
    }
    if (style.required) {
      className += " required";
    }
    className += " field";
    return className;
  }

  function isArgs(obj) : obj is Args {
    return obj && (
      typeof (obj.style) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && (isDOMContent(obj.content) || isDOMContent(obj.content.main) || isDOMContent(obj.content.label)))
    );
  }
}
