import {
  DOMContent, VNode, IInteractiveComponentSources,
  IInteractiveComponentSinks, isDOMContent
} from "interfaces";
import { numToText } from "utils";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, label } from "@cycle/dom";

export namespace Fields {
  export interface Props {
    label?: DOMContent;
    equalWidth?: boolean;
    grouped?: boolean;
    inline?: boolean;
    required?: boolean;
  }

  /**
   * Wraps multiple related Field components together.
   * Accepts the following properties in props$:
   *   label?: DOMContent - A label for the fields.
   *   equalWidth?: boolean - Divides fields in equal width.
   *   grouped?: boolean - Groups fields together for related choices.
   *   inline?: boolean - Styles the labels to be next to the fields instead of above them.
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
        Events: (type) => sources.DOM.select(".fields").events(type),
        value$: xs.never()
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Wraps multiple related Field components together.
   * Accepts the following properties:
   *   label?: DOMContent - A label for the fields.
   *   equalWidth?: boolean - Divides fields in equal width.
   *   grouped?: boolean - Groups fields together for related choices.
   *   inline?: boolean - Styles the labels to be next to the fields instead of above them.
   *   required?: boolean - Styles the the fields to make them appear mandetory.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    let lbl = props.label ? label(props.label) : "";
    let children = (<Array<any>>content).length ? [lbl].concat(content) : [lbl, content];
    return div({ props: { className: getClassname(props, content) } }, children);
  }

  function getClassname(props: Props, content) {
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
}
