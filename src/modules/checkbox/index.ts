import { DOMContent, IInteractiveComponentSources, isDOMContent} from "../../interfaces";
import xs from "xstream";
import isolate from "@cycle/isolate";
import {input, label, div, VNode} from "@cycle/dom";

export namespace Checkbox {
  export interface Props {
    readonly?: boolean;
    checked?: boolean;
    disabled?: boolean;
    fitted?: boolean;
    name?: string;
    radio?: boolean;
    toggle?: boolean;
    slider?: boolean;
  }
  /**
  * Creates a checkbox element on the page.
  * Accepts the following properties in props$:
  *   readonly?: boolean - Styles the checkbox to appear read-only.
  *   checked?: boolean - Styles the checkbox to appear checked.
  *   disabled?: boolean - Styles the checkbox to appear disabled.
  *   fitted?: boolean - Styles the checkbox for tight fits with nearby content.
  *   radio?: string - Styles the checkbox to appear like a radio button belonging to the group.
  *   toggle?: boolean - Styles the checkbox to appear like a toggle.
  * Expects the following type of content in content$: DOMContent
  * @param {ComponentSources} sources The default component sources.
  */
  export function run(sources: IInteractiveComponentSources<Props, DOMContent>) {
    function main(sources: IInteractiveComponentSources<Props, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const evt = (type) => sources.DOM.select("input").events(type);
      const clicked$ = evt("click");
      const props$ = sources.props$.remember();
      const checked$ = props$.map(props =>
        clicked$.fold((acc, evt) => (evt.srcElement as any).checked, props.checked ? true : false)
      ).flatten().remember();
      // const renderProps$ =  xs.combine(props$, checked$).map(
      //   ([props, checked]) => Object.assign({}, props, {checked})
      // );
      const vTree$ = xs.combine(props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );

      return {
        DOM: vTree$,
        Events: evt,
        value$: checked$
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
  * Creates a checkbox element on the page.
  * Accepts the following properties in props$:
  *   readonly?: boolean - Styles the checkbox to appear read-only.
  *   checked?: boolean - Styles the checkbox to appear checked.
  *   disabled?: boolean - Styles the checkbox to appear disabled.
  *   fitted?: boolean - Styles the checkbox for tight fits with nearby content.
  *   radio?: string - Styles the checkbox to appear like a radio button belonging to the group.
  *   toggle?: boolean - Styles the checkbox to appear like a toggle.
  * Expects the following type of content in content$: DOMContent
  * @param {ComponentSources} sources The default component sources.
  */
  export function render(pOrC: Props|DOMContent = {}, c: DOMContent = "") {
    let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: {className: getClassName(props) }}, [
      input({props: {
        type: props.radio ? "radio" : "checkbox",
        name:props.name, 
        checked:props.checked, 
        disabled:props.readonly||props.disabled
      }}),
      label({props: {for:props.name}}, props.fitted ? "" : content)
    ]);
  }
  function getClassName(props: Props) : string {
    let className = "ui";
    if (props.readonly) {
      className += " read-only";
    }
    if (props.checked) {
      className += " checked";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.fitted) {
      className += " fitted";
    }
    if (props.radio) {
      className += " radio";
    }
    if (props.toggle) {
      className += " toggle";
    }
    if (props.slider) {
      className += " slider";
    }
    return className + " checkbox";
  }
}
