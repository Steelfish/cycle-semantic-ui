import { VNode, div } from "@cycle/dom";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import { Color,  Float,  Size } from "../../enums";
import { renderPropsAndContent, runPropsAndContent} from "../../common";
import { getScope} from "../../utils";

export namespace Statistic {
  export interface Props {
    text: boolean;
    horizontal: boolean;
    inverted: boolean;
    color: Color | string;
    size: Size | string;
    float: Float | string;
  }

  export interface ContentObj {
    main: DOMContent;
    label: DOMContent;
  }

  export type StatisticArgs = StyleAndContentArgs<Props, DOMContent, ContentObj>;
  export type StatisticSources = ComponentSources<Props, DOMContent, ContentObj>;

  export function render(arg1?: StatisticArgs|Partial<Props>|DOMContent, arg2?: DOMContent) {
    return renderPropsAndContent(statistic, isArgs, isDOMContent, arg1, arg2);
  }

  export function run(sources: StatisticSources, scope: string = getScope()): ComponentSinks {
    return runPropsAndContent(sources, statistic, ".statistic", scope);
  }

  function statistic(args: StatisticArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? {main: args.content} : args.content : {main: []};
    return div({ props: { className: getClassname(props) } }, [].concat(
      div({ props: { className: props.text ? "text value" : "value" } }, content.main),
      content.label ? div({ props: { className: "label" } }, content.label) : []
    ));
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.horizontal) {
      className += " horizontal";
    }
    if (props.text) {
      className += " text";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    className += " statistic";
    return className;
  }

  function isArgs(obj): obj is StatisticArgs {
    return typeof(obj) !== "undefined" && (
      typeof(obj.props) !== "undefined" ||
      typeof(obj.content) !== "undefined" && (
        isDOMContent(obj.content) ||
        isDOMContent(obj.content.main) || isDOMContent(obj.content.label)
      )
    );
  }
}
