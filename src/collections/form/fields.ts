import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, label, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, DOMContent, isDOMContent } from "../../types";
import { numToText } from "../../utils";

export namespace Fields {
  export interface Style {
    equalWidth?: boolean;
    grouped?: boolean;
    inline?: boolean;
    required?: boolean;
  }
  export interface ContentObj {
    main?: DOMContent;
    label?: DOMContent;
  }
  export interface Args {
    style?: Style;
    content?: DOMContent | ContentObj;
  }

  export function render(arg1?: Style | DOMContent | Args, arg2?: DOMContent, arg3?: DOMContent): VNode {
    if (isArgs(arg1)) {
      return fields(arg1);
    }
    let args: Args = {};
    if (isDOMContent(arg1)) {
      args.style = {};
      args.content = { main: arg1 };
    } else {
      args.style = arg1 || {};
      args.content = { main: arg2, label: arg3 };
    }
    return fields(args);
  }

  export function run(sources: ComponentSources<Style, ContentObj | DOMContent>, scope?: string): ComponentSinks {
    function main(sources: ComponentSources<Style, ContentObj | DOMContent>) {
      sources.style$ = sources.style$ ? sources.style$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const vTree$ = xs.combine(sources.style$, sources.content$).map(
        ([style, content]) => isDOMContent(content)
          ? render(style, content)
          : render(style, content.main, content.label)
      );
      return {
        DOM: vTree$,
        events: (type) => sources.DOM.select(".fields").events(type),
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }


  function getClassname(props: Style, content) {
    let className = "ui";
    if (props.equalWidth && content.length) {
      className += numToText(content.length);
    }
    if (props.inline) {
      className += " inline";
    }
    if (props.grouped) {
      className += " grouped";
    }
    if (props.required) {
      className += " required";
    }
    className += " fields";
    return className;
  }
  function isArgs(obj): obj is Args {
    return obj && (
      typeof (obj.style) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && (isDOMContent(obj.content) || isDOMContent(obj.content.main) || isDOMContent(obj.content.label)))
    );
  }

  function fields(args: Args) {
    let style = typeof (args.style) === "undefined" ? {} : args.style;
    let lbl = "" as DOMContent;
    let content = [] as DOMContent;
    if (typeof (args.content) !== "undefined") {
      if (isDOMContent(args.content)) {
        content = args.content;
      } else {
        lbl = args.content.label ? args.content.label : "";
        content = args.content.main ? args.content.main : [];
      }
    }
    return div({ props: { className: getClassname(style, content) } }, [].concat(lbl ? label(lbl) : "", content));
  }
}
