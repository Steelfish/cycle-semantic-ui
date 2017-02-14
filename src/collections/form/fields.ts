import { div, label, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, DOMContent, isDOMContent } from "../../types";
import { numToText } from "../../utils";
import { renderStyleAndContent, runStyleAndContent } from "../../common";

export namespace Fields {
  export interface Style {
    equalWidth: boolean;
    grouped: boolean;
    inline: boolean;
    required: boolean;
  }
  export interface FieldsContentObj {
    main: DOMContent;
    label: DOMContent;
  }
  export type FieldsArgs = StyleAndContentArgs<Style, DOMContent, FieldsContentObj>;
  export type FieldsSources = ComponentSources<Style, DOMContent, FieldsContentObj>;

  export function render(arg1?: Partial<Style> | DOMContent | FieldsArgs, arg2?: DOMContent): VNode {
    return renderStyleAndContent(fields, isArgs, isDOMContent, arg1, arg2);
  }

  export function run(sources: FieldsSources, scope?: string): ComponentSinks {
    return runStyleAndContent(sources, fields, ".fields", scope);
  }

  function fields(args: FieldsArgs) {
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


  function getClassname(props: Partial<Style>, content) {
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
  function isArgs(obj): obj is FieldsArgs {
    return obj && (
      typeof (obj.style) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && 
        (isDOMContent(obj.content) || isDOMContent(obj.content.main) || isDOMContent(obj.content.label))
      )
    );
  }
}
