import { DOMContent, VNode, IInteractiveComponentSources, IValueComponentSinks, isDOMContent } from "interfaces";
import { Color, Size } from "enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, input, textarea } from "@cycle/dom";

export namespace Textbox {
  export interface Props {
    initial?: string;
    placeholder?: string;
    icon?: boolean;
    labeled?: boolean;
    action?: boolean;
    leftContent?: boolean;
    rightContent?: boolean;
    transparent?: boolean;
    inverted?: boolean;
    focus?: boolean;
    loading?: boolean;
    disabled?: boolean;
    large?: boolean;
    type?: string;
    color?: Color;
    size?: Size;
  }

  /**
   * A textbox component for capturing user input.
   * Accepts the following properties in props$:
   *   initial?: string - The initial value of the textbox.
   *   placeholder?: string - The placeholder text of the textbox.
   *   icon?: boolean - Styles the textbox for displaying an icon in the textbox.
   *   labeled?: boolean - Styles the textbox for displaying a label in the textbox.
   *   action?: boolean - Styles the textbox for displaying an action component in the textbox.
   *   leftContent?: boolean - Adds content to the left side of the textbox.
   *   rightContent?: boolean - Adds content to the right side of the textbox.
   *   transparent?: boolean - Styles the textbox to appear transparent.
   *   inverted?: boolean - Styles the textbox for darker backgrounds.
   *   focus?: boolean - Styles the textbox to show it has focus.
   *   loading?: boolean - Styles the textbox with a loading icon.
   *   disabled?: boolean - Styles the textbox to appear disabled.
   *   color?: Color - The color of the textbox.
   *   size?: Size - The size of the textbox.
   * Expects the following type of content in content$: DOMContent
   */
  export function run(sources: IInteractiveComponentSources<Props, DOMContent>): IValueComponentSinks<string> {
    function main(sources: IInteractiveComponentSources<Props, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const evt = (type) => sources.DOM.select(".input").events(type);
      const props$ = sources.props$.remember();
      // const initialValue$ = props$.map(props => props.initial);
      const newValue$ = evt("input").map(ev => (ev.target as HTMLInputElement).value).remember();
      // const value$ = xs.merge(initialValue$, newValue$);
      const vtree$ = xs.combine(props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );

      return {
        DOM: vtree$,
        Events: evt,
        value$: newValue$
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A textbox component for capturing user input.
   * Accepts the following properties:
   *   initial?: string - The initial value of the textbox.
   *   placeholder?: string - The placeholder text of the textbox.
   *   icon?: boolean - Styles the textbox for displaying an icon in the textbox.
   *   labeled?: boolean - Styles the textbox for displaying a label in the textbox.
   *   action?: boolean - Styles the textbox for displaying an action component in the textbox.
   *   leftContent?: boolean - Adds content to the left side of the textbox.
   *   rightContent?: boolean - Adds content to the right side of the textbox.
   *   transparent?: boolean - Styles the textbox to appear transparent.
   *   inverted?: boolean - Styles the textbox for darker backgrounds.
   *   focus?: boolean - Styles the textbox to show it has focus.
   *   loading?: boolean - Styles the textbox with a loading icon.
   *   disabled?: boolean - Styles the textbox to appear disabled.
   *   color?: Color - The color of the textbox.
   *   size?: Size - The size of the textbox.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props | DOMContent = {}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    let textbox = props.large
      ? textarea({ props: { value: props.initial, placeholder: props.placeholder } })
      : input({ props: { type: props.type ? props.type : "text", value: props.initial, placeholder: props.placeholder } });
    return props.rightContent
      ? div({ props: { className: getClassname(props) } }, [
        textbox,
        content
      ])
      : div({ props: { className: getClassname(props) } }, [
        content,
        textbox
      ]);
  }

  function getClassname(props: Props): string {
    let className = "ui";
    if (props.leftContent) {
      className += " left";
    }
    if (props.rightContent) {
      className += " right";
    }
    if (props.icon) {
      className += " icon";
    }
    if (props.labeled) {
      className += " labeled";
    }
    if (props.action) {
      className += " action";
    }
    if (props.transparent) {
      className += " transparent";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.focus) {
      className += " focus";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    className += " input";
    return className;
  }
}
