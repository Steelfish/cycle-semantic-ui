import { DOMContent, VNode, IInteractiveExtraComponentSources, IInteractiveComponentSinks, isDOMContent} from "../../interfaces";
import { Color, Float, Size} from "../../enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import {div} from "@cycle/dom";


export namespace Statistic {
  export interface Props {
    text?: boolean;
    horizontal?: boolean;
    inverted?: boolean;
    color?: Color;
    size?: Size;
    float?: Float;
  }

  /**
   * A statistic component to show statistics.
   * Accepts the following properties in props$:
   *   horizontal?: boolean - Styles the statistic to display horizontally.
   *   inverted?: boolean - Styles the statistic for a dark background.
   *   color?: Color - The color of the statistic.
   *   size?: Size - The size of the statistic.
   *   float?: Float - Where to float the statistic.
   * Expects the following type of content in content$: {} of
   *   value: String|VNode - The value for the statistic.
   *   label: String|VNode - The label for the statistic.
   *   isText?: boolean - Formats the statistic value for text based values.
   */
  export function run(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>) : IInteractiveComponentSinks {
    function main(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");
      sources.extras$ = sources.extras$ ? sources.extras$ : xs.of("");

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props,content]) => render(props, content)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".statistic").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A statistic component to show statistics.
   * Accepts the following properties:
   *   horizontal?: boolean - Styles the statistic to display horizontally.
   *   inverted?: boolean - Styles the statistic for a dark background.
   *   color?: Color - The color of the statistic.
   *   size?: Size - The size of the statistic.
   *   float?: Float - Where to float the statistic.
   * Expects the following type of content: {} of
   *   value: String|VNode - The value for the statistic.
   *   label: String|VNode - The label for the statistic.
   *   isText?: boolean - Formats the statistic value for text based values.
   */
  export function render(pOrC: Props|DOMContent = {}, c:DOMContent = "", e:DOMContent = "") : VNode {
    let props = isDOMContent(pOrC) ? {} :pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    let label = isDOMContent(pOrC) ? c : e;
    return div({ props: { className: getClassname(props) }}, [
      div({ props: { className: props.text ? "text value" : "value"}}, content),
      div({ props: { className: "label" }}, label)
    ]);
  }

  function getClassname(props: Props) : string {
    let className = "ui ";
    if (props.horizontal) { 
       className += " horizontal";
}
    if (props.inverted) { 
       className += " inverted";
}
    if (typeof(props.color) !== "undefined") { 
       className += Color.ToClassname(props.color);
}
    if (typeof(props.size) !== "undefined") { 
       className += Size.ToClassname(props.size);
}
    if (typeof(props.float) !== "undefined") { 
       className += Float.ToClassname(props.float);
}
    className += " statistic";
    return className;
  }
}
