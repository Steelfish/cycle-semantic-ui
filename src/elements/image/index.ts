import { VNode, IInteractiveComponentSources, IInteractiveComponentSinks } from "interfaces";
import { Size, VerticalAlignment, Float } from "enums";
import isolate from "@cycle/isolate";
import { a, img } from "@cycle/dom";
import xs from "xstream";

export namespace Image {
  export interface Props {
    href?: string;
    hidden?: boolean;
    disabled?: boolean;
    avatar?: boolean;
    bordered?: boolean;
    spaced?: boolean;
    circular?: boolean;
    rounded?: boolean;
    float?: Float;
    size?: Size;
    verticalAlignment?: VerticalAlignment;
  }

  /**
   * An image component for displaying images.
   * Accepts the following properties in props$:
   *   href?: string - Styles the image as a link towards the location.
   *   hidden?: boolean - Hides the image.
   *   disabled?: boolean - Styles the image to appear disabled.
   *   avatar?: boolean - Styles the image for usage as an avatar.
   *   bordered?: boolean - Styles the image with a border.
   *   spaced?: boolean - Styles the image with extra spacing to seperate it from nearby content.
   *   circular?: boolean - Styles the image to be circular.
   *   rounded?: boolean - Styles the image to have rounded edges.
   *   float?: Float - The float orientation of the image.
   *   size?: Size - The size of the image.
   *   verticalAlignment?: VerticalAlignment - The vertical alignment of text nearby the image.
   * Expects the following type of content in content$: string - The src url.
   */
  export function run(sources: IInteractiveComponentSources<Props, string>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, string>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".image").events(type),
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * An image component for displaying images.
   * Accepts the following properties:
   *   link?: boolean - Styles the image as a link.
   *   hidden?: boolean - Hides the image.
   *   disabled?: boolean - Styles the image to appear disabled.
   *   avatar?: boolean - Styles the image for usage as an avatar.
   *   bordered?: boolean - Styles the image with a border.
   *   spaced?: boolean - Styles the image with extra spacing to seperate it from nearby content.
   *   circular?: boolean - Styles the image to be circular.
   *   rounded?: boolean - Styles the image to have rounded edges.
   *   float?: Float - The float orientation of the image.
   *   size?: Size - The size of the image.
   *   verticalAlignment?: VerticalAlignment - The vertical alignment of text nearby the image.
   * Expects the following type of content: string - The src url.
   */
  export function render(pOrC: Props | string = {}, c: string = ""): VNode {
    let props = typeof (pOrC) === "string" ? {} : pOrC;
    let content = typeof (pOrC) === "string" ? pOrC : c;
    let image = img({ props: { className: getClassname(props), src: content } });
    return props.href ? a({ props: { href: props.href } }, image) : image;
  }
  function getClassname(props: Props): string {
    let className = "ui";
    if (props.href) {
      className += " link";
    }
    if (props.hidden) {
      className += " hidden";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.avatar) {
      className += " avatar";
    }
    if (props.bordered) {
      className += " bordered";
    }
    if (props.spaced) {
      className += " spaced";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.rounded) {
      className += " rounded";
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.verticalAlignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.verticalAlignment);
    }
    return className + " image";
  }
}
