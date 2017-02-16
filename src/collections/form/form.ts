import { Size, SizeString } from "../../enums";
import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs} from "../../common";

export namespace Form {
  export interface Props {
    equalWidth: boolean;
    inverted: boolean;
    loading: boolean;
    size: Size | SizeString;
  }
  export type FormArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type FormSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;
  export function render(arg1?: Partial<Props> | DOMContent | FormArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(form, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }

  export function run(sources: FormSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, form, ".form", scope);
  }

  function form(args: FormArgs) {
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let props = typeof(args.props) !== "undefined" ? args.props : {};
    return div({ props: { className: getClassname(props) } }, content);
  }

  function getClassname(props: Partial<Props>) {
    let className = "ui";
    if (props.loading) {
      className += " loading";
    }
    if (props.equalWidth) {
      className += " equal width";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    className += " form";
    return className;
  }
}
