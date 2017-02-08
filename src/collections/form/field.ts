import {
  DOMContent, IInteractiveExtraComponentSources,
  IInteractiveComponentSinks, isDOMContent
} from "interfaces";
import { numToText } from "utils";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, label } from "@cycle/dom";

export namespace Field {
  export interface Props {
    width?: number;
    inline?: boolean;
    centered?: boolean;
    required?: boolean;
  }
  /**
   * Wraps content in a Field suitable for the Form component.
   * Accepts the following properties in props$:
   *   width?: number - The width of the field in grid columns.
   *   inline?: boolean - Styles the label to be next to the field instead of above it.
   *   centered?: boolean - Styles the content of the field to be centered.
   *   required?: boolean - Styles the field to show it is mandatory.
   * Expects the following type of content in content$: {} of
   *   label?: DOMContent - The label for the field.
   *   body: DOMContent - The field input.
   */
  export function run(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>): IInteractiveComponentSinks {
    function main(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");
      sources.extras$ = sources.extras$ ? sources.extras$ : xs.of("");

      const vTree$ = xs.combine(sources.props$, sources.content$, sources.extras$).map(
        ([props, content, extra]) => render(props, content, extra)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".field").events(type),
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Wraps content in a Field suitable for the Form component.
   * Accepts the following properties:
   *   width?: number - The width of the field in grid columns.
   *   inline?: boolean - Styles the label to be next to the field instead of above it.
   *   centered?: boolean - Styles the content of the field to be centered.
   *   required?: boolean - Styles the field to show it is mandatory.
   * Expects the following type of content: {} of
   *   label?: DOMContent - The label for the field.
   *   body: DOMContent - The field input.
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = "", e: DOMContent = "") {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    let extra = isDOMContent(pOrC) ? (c === "") ? e : c : e;
    return div({ props: { className: getClassname(props) } }, [].concat(extra ? label(extra) : "", content));
  }

  function getClassname(props: Props) {
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
    if (props.required) {
      className += " required";
    }
    className += " field";
    return className;
  }
}
