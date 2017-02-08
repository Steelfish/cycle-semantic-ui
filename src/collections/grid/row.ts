import {
  DOMContent, VNode, IInteractiveComponentSources,
  IInteractiveComponentSinks, isDOMContent
} from "interfaces";
import { numToText } from "utils";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace Row {
  export interface Props {
    stretched?: boolean;
    mobile?: boolean;
    tablet?: boolean;
    computer?: boolean;
    largescreen?: boolean;
    equallyDivided?: boolean;
  }

  /**
   * Creates a Row component that wraps Column content.
   * Accepts the following properties in props$:
   *   stretched?: boolean - Ensures the columns are stretched to equal height.
   *   mobile?: boolean - Makes the row visible only on mobile devices.
   *   tablet?: boolean - Makes the row visible only on tablet devices.
   *   computer?: boolean - Makes the row visible only on computer devices.
   *   largescreen?: boolean - Makes the row visible only on largescreen devices.
   *   equallyDivided?: boolean - Makes each column of the row equal in width.
   * Expects the following type of content in content$: DOMContent
   */
  export function run(sources: IInteractiveComponentSources<Props, DOMContent>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".row").events(type),
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Creates a Row component that wraps Column content.
   * Accepts the following properties:
   *   stretched?: boolean - Ensures the columns are stretched to equal height.
   *   mobile?: boolean - Makes the row visible only on mobile devices.
   *   tablet?: boolean - Makes the row visible only on tablet devices.
   *   computer?: boolean - Makes the row visible only on computer devices.
   *   largescreen?: boolean - Makes the row visible only on largescreen devices.
   *   equallyDivided?: boolean - Makes each column of the row equal in width.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props|DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: { className: getClassname(props, content) } }, content);
  }
  function getClassname(props: Props, content): string {
    let className = "ui";
    if (props.stretched) {
      className += " stretched";
    }
    if (props.mobile) {
      className += " mobile only";
    }
    if (props.tablet) {
      className += " tablet only";
    }
    if (props.computer) {
      className += " computer only";
    }
    if (props.largescreen) {
      className += " largescreen only";
    }
    if (props.equallyDivided) {
      className += numToText(content.length ? content.length : 1) + " column";
    }
    className += " row";
    return className;
  }
}
