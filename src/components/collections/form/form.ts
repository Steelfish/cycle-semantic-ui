import {
  DOMContent, VNode, IInteractiveComponentSources,
  IInteractiveComponentSinks, isDOMContent
} from "../../interfaces";
import { Size } from "../../enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace Form {
  export interface Props {
    loading?: boolean;
    equalWidth?: boolean;
    inverted?: boolean;
    size?: Size;
  }

  /**
   * A form component for capturing groups of user input.
   * Accepts the following properties in props$:
   *   loading?: boolean - Styles the form with a loader.
   *   equalWidth?: boolean - Styles the form content to have equal widths per row.
   *   inverted?: boolean - Styles the form for dark backgrounds.
   *   size?: Size - The size of the form's content.
   * Expects the following type of content in content$: DOMContent
   */
  export function run(sources: IInteractiveComponentSources<Props, DOMContent>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const vTree$ = xs.combine(sources.props$, sources.content$)
        .map(([props, content]) => render(props, content)
        );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".form").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A form component for capturing groups of user input.
   * Accepts the following properties:
   *   loading?: boolean - Styles the form with a loader.
   *   equalWidth?: boolean - Styles the form content to have equal widths per row.
   *   inverted?: boolean - Styles the form for dark backgrounds.
   *   size?: Size - The size of the form's content.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: { className: getClassname(props) } }, content);
  }
  function getClassname(props: Props) {
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
