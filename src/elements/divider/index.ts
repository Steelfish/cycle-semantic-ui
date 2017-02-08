import { DOMContent, VNode, IInteractiveComponentSources,IInteractiveComponentSinks, isDOMContent} from "interfaces";
import xs from "xstream";
import isolate from "@cycle/isolate";
import {div} from "@cycle/dom";

export namespace Divider {
  export interface Props {
    horizontal?: boolean;
    vertical?: boolean;
    inverted?: boolean;
    fitted?: boolean;
    hidden?: boolean;
    section?: boolean;
    clearing?: boolean;
    header?: boolean;
  }
  /**
   * Creates a divider element to seperate content on page.
   * Accepts the following properties in props$:
   * 	content?: VNode - The content to add to the divider.
   * 	horizontal?: boolean - Needed to render text horizontally in the divider.
   * 	vertical?: boolean - Determines vertical/horizontal orientation of the divider.
   * 	inverted?: boolean - For dark backgrounds.
   * 	fitted?: boolean - Minimizes the space between divided content.
   * 	hidden?: boolean - Creates an invisible divider that divides the content.
   * 	section?: boolean - Provides greater margins for between divided content.
   * 	clearing?: boolean - Clears floated content.
   * Expects the following type of content in content$: DOMContent
   */
  export function run(sources: IInteractiveComponentSources<Props, DOMContent>) : IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$: xs.of("");

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".divider").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Creates a divider element to seperate content on page.
   * Accepts the following properties:
   * 	content?: VNode - The content to add to the divider.
   * 	horizontal?: boolean - Needed to render text horizontally in the divider.
   * 	vertical?: boolean - Determines vertical/horizontal orientation of the divider.
   * 	inverted?: boolean - For dark backgrounds.
   * 	fitted?: boolean - Minimizes the space between divided content.
   * 	hidden?: boolean - Creates an invisible divider that divides the content.
   * 	section?: boolean - Provides greater margins for between divided content.
   * 	clearing?: boolean - Clears floated content.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props|DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: {className: getClassName(props, content) }}, content);
  }
  function getClassName(props: Props, content?) : string {
    let className = "ui";
    if (props.vertical) {
      className += " vertical";
    } else if (props.horizontal) {
      className += " horizontal";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.fitted) {
      className += " fitted";
    }
    if (props.hidden) {
      className += " hidden";
    }
    if (props.section) {
      className += " section";
    }
    if (props.clearing) {
      className += " clearing";
    }
    if (props.header) {
      className += " header";
    }
    className += " divider";
    return className;
  }
}
