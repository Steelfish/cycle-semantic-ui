import { DOMContent, VNode, IInteractiveExtraComponentSources, IInteractiveComponentSinks, isDOMContent } from "../../interfaces";
import { Size, Attachment, Color } from "../../enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace Label {
  export interface Props {
    circular?: boolean;
    empty?: boolean;
    pointing?: boolean;
    basic?: boolean;
    leftCorner?: boolean;
    rightCorner?: boolean;
    tag?: boolean;
    ribbon?: boolean;
    invRibbon?: boolean;
    horizontal?: boolean;
    floating?: boolean;
    attachment?: Attachment;
    size?: Size;
    color?: Color;
  }

  /**
   * Creates a Label component to add information to certain content.
   * Accepts the following properties in props$:
   *   circular?: boolean - Styles the label to be circular.
   *   empty?: boolean - Styles the label for empty content.
   *   pointing?: boolean - Styles the label to be pointing towards nearby content.
   *   basic?: boolean - Styles the label to be minimalistic.
   *   leftCorner?: boolean - Attaches the label to the top-left corner of nearby content.
   *   rightCorner?: boolean - Attaches the label to the top-right corner of nearby content.
   *   tag?: boolean - Styles the label to look like a tag.
   *   ribbon?: boolean - Styles the label to look like a ribbon over the left side of content.
   *   invRibbon?: boolean - Styles the label to look like a ribbon over the right side of content.
   *   horizontal?: boolean - Styles the label for horizontal content.
   *   floating?: boolean - Styles the label to be floating over nearby content.
   *   attachment?: Attachment - Where the label should be attached to.
   *   size?: Size - The size of the label.
   *   color?: Color - The color of the label.
   * Expects the following type of content and extras: DOMContent
   */
  export function run(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>): IInteractiveComponentSinks {
    function main(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);
      sources.extras$ = sources.extras$ ? sources.extras$ : xs.of([]);

      const vTree$ = xs.combine(sources.props$, sources.content$, sources.extras$).map(
        ([props, content, extras]) => render(props, content, extras)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".label").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Creates a Label component to add information to certain content.
   * Accepts the following properties:
   *   circular?: boolean - Styles the label to be circular.
   *   empty?: boolean - Styles the label for empty content.
   *   pointing?: boolean - Styles the label to be pointing towards nearby content.
   *   basic?: boolean - Styles the label to be minimalistic.
   *   leftCorner?: boolean - Attaches the label to the top-left corner of nearby content.
   *   rightCorner?: boolean - Attaches the label to the top-right corner of nearby content.
   *   tag?: boolean - Styles the label to look like a tag.
   *   ribbon?: boolean - Styles the label to look like a ribbon over the left side of content.
   *   invRibbon?: boolean - Styles the label to look like a ribbon over the right side of content.
   *   horizontal?: boolean - Styles the label for horizontal content.
   *   floating?: boolean - Styles the label to be floating over nearby content.
   *   attachment?: Attachment - Where the label should be attached to.
   *   size?: Size - The size of the label.
   *   color?: Color - The color of the label.
   * Expects the following type of content and extras: DOMContent
   */
export function render(pOrC: Props | DOMContent = {}, c: DOMContent = "", e: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    let detail = isDOMContent(pOrC) ? c : e;
    return div({ props: { className: getClassname(props) } }, [
      content,
      detail ? div({ props: { className: "detail" } }, detail) : ""
    ]);
  }

  function getClassname(props: Props): string {
    let className = "ui";
    if (props.circular) {
      className += " circular";
    }
    if (props.empty) {
      className += " empty";
    }
    if (props.pointing) {
      className += " pointing";
    }
    if (props.basic) {
      className += " basic";
    }
    if (props.leftCorner) {
      className += " left corner";
    }
    if (props.rightCorner) {
      className += " right corner";
    }
    if (props.tag) {
      className += " tag";
    }
    if (props.ribbon) {
      className += " ribbon";
    }
    if (props.invRibbon) {
      className += " right ribbon";
    }
    if (props.horizontal) {
      className += " horizontal";
    }
    if (props.floating) {
      className += " floating ";
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " label";
    return className;
  }
}
