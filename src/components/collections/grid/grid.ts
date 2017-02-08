import {
  DOMContent, VNode, IInteractiveComponentSources,
  IInteractiveComponentSinks, isDOMContent
} from "../../interfaces";
import { VerticalAlignment, TextAlignment } from "../../enums";
import { numToText } from "../../utils";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace Grid {
  export interface Props {
    equallyDivided?: boolean;
    divided?: boolean;
    container?: boolean;
    celled?: boolean;
    intCelled?: boolean;
    padded?: boolean;
    relaxed?: boolean;
    centered?: boolean;
    alignment?: VerticalAlignment;
    textAlignment?: TextAlignment;
  }

  /**
   * Wraps content in a column suitable for the Grid component.
   * Accepts the following properties in props$:
   *   equallyDivided?: boolean - Styles grid content to take up equal amounts of space.
   *   divided?: boolean - Use dividers to seperate content in the Grid.
   *   container? : boolean - Wraps the grid in a container.
   *   celled?: boolean - Divides the grid into cells.
   *   intCelled?: boolean - Divides the grid into cells with only internal dividers.
   *   padded?: boolean - Adds vertical and horizontal gutters to the grid.
   *   relaxed?: boolean - Increases the amount of negative space.
   *   centered?: boolean - Centers the content of the Grid.
   *   alignment?: VerticalAlignment: Determines the alignment of content in the Grid.
   *   textAlignment?: TextAlignment: Determines the text alignment of content in the Grid.
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
        Events: (type) => sources.DOM.select(".grid").events(type),
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Wraps content in a column suitable for the Grid component.
   * Accepts the following properties:
   *   equallyDivided?: boolean - Styles grid content to take up equal amounts of space.
   *   divided?: boolean - Use dividers to seperate content in the Grid.
   *   container? : boolean - Wraps the grid in a container.
   *   celled?: boolean - Divides the grid into cells.
   *   intCelled?: boolean - Divides the grid into cells with only internal dividers.
   *   padded?: boolean - Adds vertical and horizontal gutters to the grid.
   *   relaxed?: boolean - Increases the amount of negative space.
   *   centered?: boolean - Centers the content of the Grid.
   *   alignment?: VerticalAlignment: Determines the alignment of content in the Grid.
   *   textAlignment?: TextAlignment: Determines the text alignment of content in the Grid.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: { className: getClassname(props, content) } }, content);
  }
  export function getClassname(props: Props, content): string {
    let className = "ui";
    if (props.equallyDivided) {
      className += numToText(content.length ? content.length : 1) + " column";
    }
    if (props.divided) {
      className += " divided";
    }
    if (props.container) {
      className += " container";
    }
    if (props.celled) {
      className += " celled";
    }
    if (props.intCelled) {
      className += " internally celled";
    }
    if (props.padded) {
      className += " padded";
    }
    if (props.relaxed) {
      className += " relaxed";
    }
    if (props.centered) {
      className += " centered";
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    if (typeof (props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    className += " grid";
    return className;
  }
}
