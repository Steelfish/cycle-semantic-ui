import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import { VNode, div } from "@cycle/dom";
import { Dimmer } from "../../modules/dimmer";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSources, ComponentSinks, ContentObj } from "../../types";
import { Size, SizeString } from "../../enums";
import { renderPropsAndContent, makeIsArgs } from "../../common";
import { capitalize } from "../../utils";


export namespace Loader {
  export interface Props {
    type: LoaderType | LoaderTypeString;
    centered: boolean;
    active: boolean;
    disabled: boolean;
    indeterminate: boolean;
    inverted: boolean;
    text: boolean;
    size: Size | SizeString;
  }

  export type LoaderArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;

  export interface LoaderSources extends ComponentSources<Props, DOMContent, ContentObj<DOMContent>> {
    args?: {
      element$?: Stream<VNode>;
      on$?: Stream<boolean>;
    };
  }

  export function render(arg1?: LoaderArgs | Partial<Props> | DOMContent, arg2?: DOMContent) {
    return renderPropsAndContent(loader, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }

  export function run(sources: LoaderSources, scope?: string): ComponentSinks {
    function main(sources: LoaderSources) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({ type: LoaderType.Page });
      sources.content$ = sources.content$ ? sources.content$ : xs.of(undefined);

      const on$ = sources.args && sources.args.on$ ? sources.args.on$ : xs.of(true);
      const props$ = sources.props$.remember();
      const vTree$ = xs.combine(props$, sources.content$)
        .map(([props, content]) => [loader({ props, content })]
      );
      const target$ = props$.map(props => props.type === LoaderType.Page ? xs.of("page") : sources.args.element$).flatten();
      const dimmer = Dimmer.run({ DOM: sources.DOM, args$: on$, target$, content$: vTree$ }, props$.map(props => props.inverted));
      const result$ = props$.map(
        props => props.type === LoaderType.Inline ? vTree$ : dimmer.DOM
      ).flatten();
      return {
        DOM: result$,
        events: (type) => sources.DOM.select(".loader").events(type)
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function loader(args: LoaderArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(props) } }, content);
  }
  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.active) {
      className += " active";
    }
    if (props.centered) {
      className += " centered";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.indeterminate) {
      className += " indeterminate";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.text) {
      className += " text";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    className += LoaderType.ToClassname(typeof(props.type) !== "undefined" ? props.type : LoaderType.Page);
    return className;
  }

  export type LoaderTypeString = "inline" | "page" | "content";
  export enum LoaderType {
    Inline, Page, Content
  }
  export namespace LoaderType {
    export function ToEnum(attachmentOrString: LoaderType | LoaderTypeString): LoaderType {
      return typeof (attachmentOrString) === "number"
        ? attachmentOrString
        : LoaderType[capitalize(attachmentOrString)];
    }
    export function ToClassname(type: LoaderType | LoaderTypeString) {
      type = LoaderType.ToEnum(type);
      switch (type) {
        case LoaderType.Inline: return " inline loader";
        case LoaderType.Page: return " loader";
        case LoaderType.Content: return " loader";
      }
    }
  }
}
