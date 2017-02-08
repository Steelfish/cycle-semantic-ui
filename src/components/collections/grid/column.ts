import {
  DOMContent, VNode, IInteractiveComponentSources,
  IInteractiveComponentSinks, isDOMContent
} from "../../interfaces";
import { VerticalAlignment, TextAlignment, Size, Float } from "../../enums";
import { numToText } from "../../utils";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace Column {
  export interface Props {
    width?: number;
    mobile?: number;
    tablet?: number;
    computer?: number;
    largescreen?: number;
    size?: Size;
    alignment?: VerticalAlignment;
    textAlignment?: TextAlignment;
    float?: Float;
  }
  /**
   * Wraps content in a column suitable for the Grid component.
   * Accepts the following properties in props$:
   *   float?: Float - Wether the column should be left or right floated.
   *   width?: int - The default width of the column.
   *   mobile?: int - The width of the column on mobile devices.
   *   tablet?: int - The width of the column on tablet devices.
   *   computer?: int - The width of the column on computer devices.
   *   largescreen?: int - The width of the column on large screen devices.
   *   size?: Size - The size of the column.
   *   alignment?: VerticalAlignment - The vertical alignment of the column.
   *   textAlignment?: TextAlignment - The text alignment of the column.
   * Expects the following type of content in Content$: DOMContent
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
        Events: (type) => sources.DOM.select(".column").events(type),
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Wraps content in a column suitable for the Grid component.
   * Accepts the following properties:
   *   float?: Float - Wether the column should be left or right floated.
   *   width?: int - The default width of the column.
   *   mobile?: int - The width of the column on mobile devices.
   *   tablet?: int - The width of the column on tablet devices.
   *   computer?: int - The width of the column on computer devices.
   *   largescreen?: int - The width of the column on large screen devices.
   *   size?: Size - The size of the column.
   *   alignment?: VerticalAlignment - The vertical alignment of the column.
   *   textAlignment?: TextAlignment - The text alignment of the column.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: { className: getClassname(props) } }, content);
  }
  function getClassname(props: Props): string {
    let className = "ui";
    if (props.float && props.float === Float.Right) {
      className += " right floated";
    }
    if (props.float && props.float === Float.Left) {
      className += " left floated";
    }
    if (props.mobile) {
      className += numToText(props.mobile) + " wide mobile";
    }
    if (props.tablet) {
      className += numToText(props.tablet) + " wide tablet";
    }
    if (props.computer) {
      className += numToText(props.computer) + " wide computer";
    }
    if (props.largescreen) {
      className += numToText(props.largescreen) + " wide largescreen";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    if (typeof (props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    if (props.width) {
      className += numToText(props.width) + " wide";
    }
    className += " column";
    return className;
  }
}
