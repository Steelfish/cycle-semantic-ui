import xs from "xstream";
import isolate from "@cycle/isolate";
import { VNode, input, label, div } from "@cycle/dom";
import { DOMContent, isDOMContent, ContentObj, StyleAndContentArgs, ComponentSources, ValueComponentSinks } from "../../types";
import { renderPropsAndContent, makeIsArgs } from "../../common";
import { getScope} from "../../utils";

export namespace Checkbox {
  export interface Props {
    name: string;
    readonly: boolean;
    checked: boolean;
    disabled: boolean;
    fitted: boolean;
    radio: boolean;
    toggle: boolean;
    slider: boolean;
  }

  export type CheckboxArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type CheckboxSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: CheckboxArgs|Partial<Props>|DOMContent, arg2?: DOMContent) : VNode {
    return renderPropsAndContent(checkbox, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: CheckboxSources, scope: string = getScope()) : ValueComponentSinks<boolean> {
    function main(sources: CheckboxSources) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");
      const evt = (type) => sources.DOM.select(".checkbox").events(type);
      
      const props$ = sources.props$.remember();
      const vTree$ = xs.combine(props$, sources.content$).map(
        ([props, content]) => checkbox({props, content})
      );
      const value$ = evt("click").map(evt => (evt.srcElement as any).checked);

      return {
        DOM: vTree$,
        events: evt,
        value$
      };
    }
    if (scope === null) {
      return main(sources);
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }


  function checkbox(args: CheckboxArgs) {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassName(props) } }, [
      input({
        props: {
          type: props.radio ? "radio" : "checkbox",
          name: props.name,
          checked: props.checked,
          disabled: props.readonly || props.disabled
        }
      }),
      label({ props: { for: props.name } }, props.fitted ? "" : content)
    ]);
  }
  function getClassName(props: Partial<Props>): string {
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
