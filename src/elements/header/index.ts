import {DOMContent, VNode, IInteractiveExtraComponentSources,IInteractiveComponentSinks, isDOMContent} from "interfaces";
import { Size, Attachment, Float, TextAlignment, Color } from "enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace Header {
  export interface Props {
    icon?: boolean;
    divider?: boolean;
    block?: boolean;
    disabled?: boolean;
    inverted?: boolean;
    attachment?: Attachment;
    float?: Float;
    textAlignment?: TextAlignment;
    size?: Size;
    color?: Color;
  }
  export interface Extras {
    subtext?: DOMContent;
    icon?: DOMContent;
  }

  /**
   * Creates a header for important text.
   * Accepts the following properties in props$:
   *   icon?: boolean - Adds styling for icon headers.
   *   divider?: boolean - Adds styling for headers to seperate content.
   *   block?: boolean - Wraps header in a block.
   *   disabled?: boolean - Styling for disabled content.
   *   inverted?: boolean - Styling for dark backgrounds.
   *   attachment?: Attachment - Styling for headers attached to other content.
   *   float?: Float - Floats the header to the left or right.
   *   textAlignment?: TextAlignment - Text alignment of the header text.
   *   size?: Size - Determines the size of the header.
   *   color?: Color - The color of the header.
   * Expects the following type of content in content$: {} of
   *   text: DOMContent - The header text.
   *   subtext?: DOMContent- An optional sub-header to accompany the header.
   *   icon?: DOMContent - Optional image/icon content for the header.
   */
  export function run(sources: IInteractiveExtraComponentSources<Props, DOMContent, Extras>): IInteractiveComponentSinks {
    function main(sources: IInteractiveExtraComponentSources<Props, DOMContent, Extras>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");
      sources.extras$ = sources.extras$ ? sources.extras$ : xs.of({});

      const vTree$ = xs.combine(sources.props$, sources.content$, sources.extras$).map(
        ([props, content, extras]) => render(props, content, extras)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".header").events(type),
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Creates a header for important text.
   * Accepts the following properties:
   *   icon?: boolean - Adds styling for icon headers.
   *   divider?: boolean - Adds styling for headers to seperate content.
   *   block?: boolean - Wraps header in a block.
   *   disabled?: boolean - Styling for disabled content.
   *   inverted?: boolean - Styling for dark backgrounds.
   *   attachment?: Attachment - Styling for headers attached to other content.
   *   float?: Float - Floats the header to the left or right.
   *   textAlignment?: TextAlignment - Text alignment of the header text.
   *   size?: Size - Determines the size of the header.
   *   color?: Color - The color of the header.
   * Expects the following type of content: {} of
   *   text: DOMContent - The header text.
   *   subtext?: DOMContent- An optional sub-header to accompany the header.
   *   icon?: DOMContent - Optional image/icon content for the header.
   */
  export function render(pOrCorE: Props | DOMContent | Extras = {}, cOrE: DOMContent | Extras = {}, e: Extras = {}): VNode {
    let props = isDOMContent(pOrCorE) ? {} : isExtras(pOrCorE) ? {} : pOrCorE;
    let content = isDOMContent(pOrCorE) ? pOrCorE : isDOMContent(cOrE) ? cOrE : "";
    let extras = isExtras(pOrCorE) ? pOrCorE : isExtras(cOrE) ? cOrE : e;
    return div({ props: { className: getClassname(props) } }, [
      extras.icon ? extras.icon : "",
      div({ props: { className: "content" } }, [].concat(
        content,
        extras.subtext ? div({ props: { className: "sub header" } }, extras.subtext) : ""
      ))
    ]);
  }
  function getClassname(props: Props): string {
    let className = "ui";
    if (props.icon) {
      className += " icon";
    }
    if (props.divider) {
      className += " divider";
    }
    if (props.block) {
      className += " block";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
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
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " header";
    return className;
  }

  function isExtras(extra): extra is Extras {
    return extra !== undefined && ((<Extras>extra).subtext !== undefined
      || ((<Extras>extra).icon !== undefined && typeof ((<Extras>extra).icon) !== "boolean"));
  }
}
