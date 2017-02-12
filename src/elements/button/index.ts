import { DOMContent, VNode, IInteractiveExtraComponentSources, IInteractiveComponentSinks, isDOMContent } from "../../interfaces";
import { Color, Size, Attachment, Float } from "../../enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, a } from "@cycle/dom";

export namespace Button {
  export interface Props {
    animated?: boolean;
    verticalAnimated?: boolean;
    labeled?: boolean;
    rightlabeled?: boolean;
    icon?: boolean;
    basic?: boolean;
    inverted?: boolean;
    active?: boolean;
    disabled?: boolean;
    loading?: boolean;
    compact?: boolean;
    circular?: boolean;
    fluid?: boolean;
    href?: string;
    attachment?: Attachment;
    size?: Size;
    float?: Float;
    color?: Color;
  }
  /**
   * An interactive button component for user interaction through clicking.
   * Accepts the following type of properties in props$:
   *   animated? : boolean - Allows for an animation in the button to show hidden content.
   *   verticalAnimated?: boolean - See animated. This animation is vertical.
   *   labeled?: boolean - Adds styling for labeled buttons.
   *   icon?: boolean - Adds styling for buttons with an icon.
   *   basic?: boolean - Styles the button to appear simpler.
   *   inverted?: boolean - Styles the button to appear on dark backgrounds.
   *   active?: boolean - Sets the button to the active state.
   *   disabled?: boolean - Styles the button to appear disabled.
   *   loading?: boolean - Styles the button show that it is loading / working.
   *   compact?: boolean - Styles the button for a tight fit.
   *   circular?: boolean - Styles the button to appear circular.
   *   fluid?: boolean - Styles the button to be as wide as possible.
   *   href?: string - Outputs the button as a link to to the href.
   *   attachment?: Attachment - Where the button should be attached to.
   *   size?: Size - The size of the button.
   *   float?: Float - The left or right float of the button.
   *   color?: Color - The color of the button.
   * Expects the following type of content in content$: {} of
   *   body?: DOMContent - The body content to display on the button.
   *   hidden?: DOMContent - The hidden content to display for animated buttons.
   */
  export function run(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>) : IInteractiveComponentSinks {
    function main(sources: IInteractiveExtraComponentSources<Props, DOMContent, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");
      sources.extras$ = sources.extras$ ? sources.extras$ : xs.of("");

      const vtree$ = xs.combine(sources.props$, sources.content$, sources.extras$).map(
        ([props, content, extras]) => render(props, content, extras)
      );
      return {
        DOM: vtree$,
        Events: (type) => sources.DOM.select(".ui.button").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A static button component for user interaction through clicking.
   * Accepts the following type of properties:
   *   animated? : boolean - Allows for an animation in the button to show hidden content.
   *   verticalAnimated?: boolean - See animated. This animation is vertical.
   *   labeled?: boolean - Adds styling for labeled buttons.
   *   icon?: boolean - Adds styling for buttons with an icon.
   *   basic?: boolean - Styles the button to appear simpler.
   *   inverted?: boolean - Styles the button to appear on dark backgrounds.
   *   active?: boolean - Sets the button to the active state.
   *   disabled?: boolean - Styles the button to appear disabled.
   *   loading?: boolean - Styles the button show that it is loading / working.
   *   compact?: boolean - Styles the button for a tight fit.
   *   circular?: boolean - Styles the button to appear circular.
   *   fluid?: boolean - Styles the button to be as wide as possible.
   *   href?: string - Outputs the button as a link to to the href.
   *   attachment?: Attachment - Where the button should be attached to.
   *   size?: Size - The size of the button.
   *   float?: Float - The left or right float of the button.
   *   color?: Color - The color of the button.
   * Expects the following type of content: {} of
   *   body?: DOMContent - The body content to display on the button.
   *   hidden?: DOMContent - The hidden content to display for animated buttons.
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = "", e: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    let extra = isDOMContent(pOrC) ? (c !== "") ? c : e : e;
    let children = extra
      ? [div({ props: { className: "visible content" } }, content),
      div({ props: { className: "hidden content" } }, extra)]
      : content;
    return props.href
      ? a({ props: { href: props.href, className: getClassname(props) } }, children)
      : div({ props: { className: getClassname(props) } }, children);
  }

  function getClassname(props: Props): string {
    let className = "ui";
    if (props.animated) {
      className += " animated";
    }
    if (props.verticalAnimated) {
      className += " vertical.animated";
    }
    if (props.labeled) {
      className += " labeled";
    }
    if (props.rightlabeled) {
      className += " right labeled";
    }
    if (props.icon) {
      className += " icon";
    }
    if (props.basic) {
      className += " basic";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.active) {
      className += " active";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.fluid) {
      className += " fluid";
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " button";
    return className;
  }
}
