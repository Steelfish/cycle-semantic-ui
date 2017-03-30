import { VNode, div, input, textarea } from "@cycle/dom";
import isolate from "@cycle/isolate";
import xs from "xstream";
import { DOMContent, isDOMContent, ContentObj, StyleAndContentArgs, ComponentSources, ValueComponentSinks } from "../../types";
import { Color, Size } from "../../enums";
import { renderPropsAndContent, makeIsArgs } from "../../common";
import { getScope} from "../../utils";

export namespace Textbox {
  export interface Props {
    value: string;
    placeholder: string;
    icon: boolean;
    labeled: boolean;
    action: boolean;
    leftContent: boolean;
    rightContent: boolean;
    transparent: boolean;
    inverted: boolean;
    focus: boolean;
    loading: boolean;
    disabled: boolean;
    readonly: boolean;
    rows: number;
    type: string;
    color: Color | string;
    size: Size | string;
  }

  export type TextboxArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type TextboxSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: TextboxArgs | Partial<Props> | DOMContent, arg2?: DOMContent): VNode {
    return renderPropsAndContent(textbox, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }

  export function run(sources: TextboxSources, scope: string = getScope()): ValueComponentSinks<string> {
    function main(sources: TextboxSources) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);

      const evt = (type) => sources.DOM.select(".input").events(type);
      const props$ = sources.props$.remember();
      const value$ = evt("input").map(ev => (ev.target as HTMLInputElement).value);
      const vtree$ = xs.combine(props$, sources.content$).map(
        ([props, content]) => textbox({ props, content })
      );

      return {
        DOM: vtree$,
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

  function textbox(args: TextboxArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let textbox = props.rows
      ? textarea({ attrs: { rows: props.rows, readonly: props.readonly, placeholder: props.placeholder }, props: { value: props.value } })
      : input({ attrs: { readonly: props.readonly, type: props.type ? props.type : "text", placeholder: props.placeholder }, props: { value: props.value } });
    return props.rightContent
      ? div({ props: { className: getClassname(props) } }, [].concat(textbox, content))
      : div({ props: { className: getClassname(props) } }, [].concat(content, textbox));
  }

  function getClassname(props: Partial<Props>): string {
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
