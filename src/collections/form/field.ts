import { div, label, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, DOMContent, isDOMContent } from "../../types";
import { numToText, getScope } from "../../utils";
import { renderPropsAndContent, runPropsAndContent } from "../../common";

export namespace Field {
  export interface Props {
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

  export type FieldArgs = StyleAndContentArgs<Props, DOMContent, FieldContentObj>;
  export type FieldSources = ComponentSources<Props, DOMContent, FieldContentObj>;

  export function render(arg1?: Partial<Props> | DOMContent | FieldArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(field, isArgs, isDOMContent, arg1, arg2);
  }

  export function run(sources: FieldSources, scope: string = getScope()): ComponentSinks {
    return runPropsAndContent(sources, field, ".field", scope);
  }

  function field(args: FieldArgs): VNode {
    let props = typeof (args.props) === "undefined" ? {} : args.props;
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
    return div({ props: { className: getClassname(props) } }, [].concat(lbl ? label(lbl) : [], content));
  }

  function getClassname(props: Partial<Props>) {
    let className = "ui";
    if (props.width) {
      className += numToText(props.width) + " wide";
    }
    if (props.inline) {
      className += " inline";
    }
    if (props.centered) {
      className += " centered";
    }
    if (props.error) {
      className += " error";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.required) {
      className += " required";
    }
    className += " field";
    return className;
  }

  function isArgs(obj): obj is FieldArgs {
    return obj && (
      typeof (obj.props) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && 
        (isDOMContent(obj.content) || isDOMContent(obj.content.main) || isDOMContent(obj.content.label))
      )
    );
  }
}
