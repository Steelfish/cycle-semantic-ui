import {
  DOMContent, VNode, IInteractiveComponentSources,
  IInteractiveComponentSinks, isDOMContent
} from "interfaces";
import { Color, Attachment, Float, TextAlignment } from "enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace Segment {
  export interface Props {
    raised?: boolean;
    stacked?: boolean;
    tallStacked?: boolean;
    piled?: boolean;
    vertical?: boolean;
    loading?: boolean;
    inverted?: boolean;
    padded?: boolean;
    veryPadded?: boolean;
    compact?: boolean;
    circular?: boolean;
    clearing?: boolean;
    basic?: boolean;
    color?: Color;
    attachment?: Attachment;
    float?: Float;
    textAlignment?: TextAlignment;
  }

  /**
   * A segment component to divide up page content into segments.
   * Accepts the following properties in props$:
   *   raised?: boolean? - Styles the segment to appear floating above nearby content.
   *   stacked?: boolean? - Styles the segment to appear like a stack of papers.
   *   tallStacked?: boolean? - Styles the segment to appear like a tall stack of papers.
   *   piled?: boolean? - Styles the segment to appear like a pile of papers.
   *   vertical?: boolean? - Styles the segment content to be aligned as part of a vertical group.
   *   loading?: boolean? - Styles the segment with a loading icon.
   *   inverted?: boolean? - Styles the segment for dark content.
   *   padded?: boolean? - Increases the padding on the segment.
   *   veryPadded?: boolean - Increases the padding on the segment by a lot.
   *   compact?: boolean - Makes the segment take up only the space needed by its content.
   *   circular?: boolean - Styles the segment to be circular.
   *   clearing?: boolean - Clears floated content.
   *   basic?: boolean - Removes any special styling.
   *   color?: Color - The color of the segment.
   *   attachment?: Attachment - The attachment of the segment.
   *   float?: Float - Where the segment should float.
   *   textAlignment?: TextAlignment - The text alignment of the segment.
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
        Events: (type) => sources.DOM.select(".segment").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A segment component to divide up page content into segments.
   * Accepts the following properties:
   *   raised?: boolean? - Styles the segment to appear floating above nearby content.
   *   stacked?: boolean? - Styles the segment to appear like a stack of papers.
   *   tallStacked?: boolean? - Styles the segment to appear like a tall stack of papers.
   *   piled?: boolean? - Styles the segment to appear like a pile of papers.
   *   vertical?: boolean? - Styles the segment content to be aligned as part of a vertical group.
   *   loading?: boolean? - Styles the segment with a loading icon.
   *   inverted?: boolean? - Styles the segment for dark content.
   *   padded?: boolean? - Increases the padding on the segment.
   *   veryPadded?: boolean - Increases the padding on the segment by a lot.
   *   compact?: boolean - Makes the segment take up only the space needed by its content.
   *   circular?: boolean - Styles the segment to be circular.
   *   clearing?: boolean - Clears floated content.
   *   basic?: boolean - Removes any special styling.
   *   color?: Color - The color of the segment.
   *   attachment?: Attachment - The attachment of the segment.
   *   float?: Float - Where the segment should float.
   *   textAlignment?: TextAlignment - The text alignment of the segment.
   * Expects the following type of content : DOMContent
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: { className: getClassname(props) } }, content);
  }

  function getClassname(props: Props): string {
    let className = "ui";
    if (props.raised) {
      className += " raised";
    }
    if (props.stacked) {
      className += " stacked";
    }
    if (props.tallStacked) {
      className += " tall stacked";
    }
    if (props.piled) {
      className += " piled";
    }
    if (props.vertical) {
      className += " vertical";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.padded) {
      className += " padded";
    }
    if (props.veryPadded) {
      className += " very padded";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.clearing) {
      className += " clearing";
    }
    if (props.basic) {
      className += " basic";
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    if (typeof (props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    className += " segment";
    return className;
  }
}
