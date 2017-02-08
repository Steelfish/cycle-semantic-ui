import { VNode, IInteractiveComponentSources, IInteractiveComponentSinks } from "interfaces";
import { Color, Size, IconType } from "enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { i } from "@cycle/dom";

export namespace Icon {
  export interface Props {
    button?: boolean;
    bordered?: boolean;
    circular?: boolean;
    disabled?: boolean;
    loading?: boolean;
    fitted?: boolean;
    link?: boolean;
    flipped?: boolean;
    rotated?: boolean;
    inverted?: boolean;
    color?: Color;
    size?: Size;
  }
  /**
   * An icon component for displaying icons.
   * Accepts the following properties in props$:
   *  button?: boolean - Styles the icon to display well on buttons
   * 	bordered?: boolean - Adds a border around the icon.
   * 	circular?: boolean - Styles the icon to appear circular.
   * 	disabled?: boolean - Styles the icon to appear disabled.
   * 	loading?: boolean - Rotates the icon to allow it to be used for loaders.
   * 	fitted?: boolean - Styles the icon for tight fits.
   * 	link?: boolean - Styles the icon to appear clickable.
   * 	flipped?: boolean - Flips the icon.
   * 	rotated?: boolean - Rotates the icon.
   * 	inverted?: boolean - Styles the icon to appear on dark background.
   * 	color?: Color - The color of the icon.
   * 	size?: Size - The size of the icon.
   * Accepts the following type of content in content$: IconType
   * @param  {ComponentSources} sources - The component's sources.
   * @return {ComponentSinks} The Icon component.
   */
  export function run(sources: IInteractiveComponentSources<Props, IconType>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, IconType>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({ type: "" });
      sources.content$ = sources.content$ ? sources.content$ : xs.of(0);

      return {
        DOM: xs.combine(sources.props$, sources.content$)
          .map(([props, content]) => render(props, content)),
        Events: (type) => sources.DOM.select(".icon").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * An icon component for displaying icons.
   * Accepts the following properties:
   *  button?: boolean - Styles the icon to display well on buttons
   * 	bordered?: boolean - Adds a border around the icon.
   * 	circular?: boolean - Styles the icon to appear circular.
   * 	disabled?: boolean - Styles the icon to appear disabled.
   * 	loading?: boolean - Rotates the icon to allow it to be used for loaders.
   * 	fitted?: boolean - Styles the icon for tight fits.
   * 	link?: boolean - Styles the icon to appear clickable.
   * 	flipped?: boolean - Flips the icon.
   * 	rotated?: boolean - Rotates the icon.
   * 	inverted?: boolean - Styles the icon to appear on dark background.
   * 	color?: Color - The color of the icon.
   * 	size?: Size - The size of the icon.
   * Accepts the following type of content: IconType
   * @param  {ComponentSources} sources - The component's sources.
   * @return {ComponentSinks} The Icon component.
   */
  export function render(pOrC: Props | IconType = {}, c: IconType = -1): VNode {
    let props = isProps(pOrC) ? pOrC : {};
    let content = isProps(pOrC) ? c : pOrC;
    const className = getClassname(props, content);
    return className !== "ui icon" ? i({ props: { className: className } }) : "";
  }
  function getClassname(props: Props, content: IconType): string {
    let className = "ui";
    if (props.button) {
      className += " button";
    }
    if (props.bordered) {
      className += " bordered";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.fitted) {
      className += " fitted";
    }
    if (props.link) {
      className += " link";
    }
    if (props.flipped) {
      className += " flipped";
    }
    if (props.rotated) {
      className += " rotated";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += IconType.ToClassname(content);
    return className + " icon";
  }

  function isProps(props): props is Props {
    return typeof (props) === "object";
  }
}
