import { div, label, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, DOMContent, isDOMContent } from "../../types";
import { numToText } from "../../utils";
import { renderStyleAndContent, runStyleAndContent } from "../../common";

export namespace Field {
  export interface Style {
    width: number;
    inline: boolean;
    centered: boolean;
    required: boolean;
    error: boolean;
    disabled: boolean;
  }
  export interface FieldContentObj {
    main: DOMContent;
    label: DOMContent;
  }

  export type FieldArgs = StyleAndContentArgs<Style, DOMContent, FieldContentObj>;
  export type FieldSources = ComponentSources<Style, DOMContent, FieldContentObj>;

  export function render(arg1?: Partial<Style> | DOMContent | FieldArgs, arg2?: DOMContent): VNode {
    return renderStyleAndContent(field, isArgs, isDOMContent, arg1, arg2);
  }

  export function run(sources: FieldSources, scope?: string): ComponentSinks {
    return runStyleAndContent(sources, field, ".field", scope);
  }

  function field(args: FieldArgs): VNode {
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
    return div({ props: { className: getClassname(style) } }, [].concat(lbl ? label(lbl) : "", content));
  }

  function getClassname(style: Partial<Style>) {
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

  function isArgs(obj): obj is FieldArgs {
    return obj && (
      typeof (obj.style) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && 
        (isDOMContent(obj.content) || isDOMContent(obj.content.main) || isDOMContent(obj.content.label))
      )
    );
  }
}
